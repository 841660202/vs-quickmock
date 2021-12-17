
import * as mockjs from 'mockjs';
const json2mockType = (json: any, result: any) => {
  for (const key in json) {
    // is array
    if (Array.isArray(json[key])) {
      result[key] = [{}];
      json2mockType(json[key][0], result[key][0]);
      // is obj
    } else if (typeof json[key] === 'object') {
      result[key] = {};
      json2mockType(json[key], result[key]);
      // is base type
    } else {
      mockEnum(key, json, result);
    }
  }
};





function mockEnum(i: string, json: any, mJson: any): any {
  const _lowcase = i.toLowerCase();
  const type = typeof json[i];
  switch (type) {
    case 'string':
      if (_lowcase.includes('name') && i === 'name') {
        mJson[i] = "@cname";
      } else if (_lowcase.includes('name') && _lowcase.includes('py')) {
        mJson[i] = "@first";
      } else if (i === 'avatar' || _lowcase.includes('url')) {
        mJson[i] = "@image('200x100', '#4A7BF7', 'Hello')";
      } else if (_lowcase.includes('day') || _lowcase.includes('date') || _lowcase.includes('time')) {
        mJson[i] = "@now";
      } else if (i.includes('Id')) {
        mJson[i] = "@word(8)";
      } else {
        mJson[i] = "@csentence(5)";
      }

      break;
    case 'number':
      if (_lowcase.includes('year') || _lowcase.includes('date') || _lowcase.includes('time')) {
        mJson[i] = "@now";
      } else {
        mJson[i] = "@natural(0, 10)";
      }
      break;
    case 'boolean':
      mJson[i] = '@boolean';
      break;
    default:
      break;
  }
}

const json2mockjs = (json: any, result: any={}) => {
  json2mockType(json, result);
  return mockjs.mock(result);
};
export default json2mockjs;