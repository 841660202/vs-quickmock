import json2mockjs from "./utils";
import jsonIsValid from "./utils/json-check";
import * as vscode from 'vscode';
import { Range } from "vscode";
export async function pasteAsMock(editor: vscode.TextEditor) {
	let indentation: string;
	if (editor.options.insertSpaces) {
			const tabSize = editor.options.tabSize as number;
			indentation = " ".repeat(tabSize);
	} else {
			indentation = "\t";
	}

	let content: string;
	try {
			content = await vscode.env.clipboard.readText();
	} catch (e) {
			vscode.window.showErrorMessage("Could not get clipboard contents");
			return;
	}
	// TODO: 这里是调试的结果 Clipboard does not contain valid JSON.
	if (!jsonIsValid(content)) {
			vscode.window.showErrorMessage("Clipboard does not contain valid JSON.");
			return;
	}
	let result:any;
	try {
			result = await json2mockjs(JSON.parse(content));
	} catch (e) {
			// TODO Invalid JSON produces an uncatchable exception from quicktype
			// Fix this so we can catch and show an error message.
			vscode.window.showErrorMessage(e);
			return;
	}

	const text = JSON.stringify(result, null,2);
	const selection = editor.selection;
	editor.edit(builder => {
			if (selection.isEmpty) {
					builder.insert(selection.start, text); // 插入代码
			} else {
					builder.replace(new Range(selection.start, selection.end), text); // 替换代码
			}
	});
}