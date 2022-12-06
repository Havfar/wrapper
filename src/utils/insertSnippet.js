"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertSnippet = void 0;
const vscode = require("vscode");
const HtmlTag_1 = require("../models/HtmlTag");
const toHtmlSecetion_1 = require("./toHtmlSecetion");
const insertSnippet = (tag) => {
    const editor = vscode.window.activeTextEditor;
    const editorSelection = editor?.selection;
    if (editor) {
        if (editorSelection?.isSingleLine) {
            singleLineConverter(tag, editor);
        }
        else {
            selectionConverter(tag, editor);
        }
    }
};
exports.insertSnippet = insertSnippet;
const singleLineConverter = (tag, editor) => {
    var htmlSection = (0, toHtmlSecetion_1.toHtmlSection)(editor);
    const before = HtmlTag_1.HtmlTag.createHtmlTag(tag, false);
    const after = HtmlTag_1.HtmlTag.createHtmlTag(tag, true);
    htmlSection.addTag(before, after);
    var selection = new vscode.Selection(new vscode.Position(htmlSection.start, 0), new vscode.Position(htmlSection.end, 0));
    editor.insertSnippet(new vscode.SnippetString(htmlSection.toString()), selection);
    editor.selection = new vscode.Selection(new vscode.Position(htmlSection.start, 100), new vscode.Position(htmlSection.start, 100));
};
const selectionConverter = (tag, editor) => {
    var htmlSection = (0, toHtmlSecetion_1.toHtmlSectionFromSelection)();
    const before = HtmlTag_1.HtmlTag.createHtmlTag(tag, false);
    const after = HtmlTag_1.HtmlTag.createHtmlTag(tag, true);
    htmlSection.addTag(before, after);
    var selection = new vscode.Selection(new vscode.Position(htmlSection.start, 0), new vscode.Position(htmlSection.end, 0));
    editor.insertSnippet(new vscode.SnippetString(htmlSection.toString()), selection);
    editor.selection = new vscode.Selection(new vscode.Position(htmlSection.start, 100), new vscode.Position(htmlSection.start, 100));
};
//# sourceMappingURL=insertSnippet.js.map