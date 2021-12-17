import * as vscode from 'vscode';
import { pasteAsMock } from './lib/json2mock';
enum Command {
	pasteJSONAsMock = "quickmock.pasteJSONAsMock",
}
export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerTextEditorCommand(Command.pasteJSONAsMock, editor =>
			pasteAsMock(editor)
		),
	);
}



// this method is called when your extension is deactivated
export function deactivate() { }
