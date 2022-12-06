"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = exports.deactivate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const vscode_1 = require("vscode");
const toHtmlSecetion_1 = require("./utils/toHtmlSecetion");
const insertSnippet_1 = require("./utils/insertSnippet");
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
const wrapWithTag = (tag) => {
    (0, insertSnippet_1.insertSnippet)(tag);
};
function removeLayer() {
    const editor = vscode.window.activeTextEditor;
    if (editor === undefined) {
        return;
    }
    var htmlSection = (0, toHtmlSecetion_1.toHtmlSection)(editor);
    htmlSection.removeLayer();
    var selection = new vscode_1.Selection(new vscode_1.Position(htmlSection.start, 0), new vscode_1.Position(htmlSection.end, 0));
    editor.insertSnippet(new vscode.SnippetString(htmlSection.toString()), selection);
    editor.selection = new vscode_1.Selection(new vscode_1.Position(htmlSection.start, 100), new vscode_1.Position(htmlSection.start, 100));
}
function activate(context) {
    debugger;
    context.subscriptions.push(vscode.commands.registerCommand("lisa.wrapInDiv", () => wrapWithTag("div")));
    context.subscriptions.push(vscode.commands.registerCommand("lisa.wrapInContainer", () => wrapWithTag("Container")));
    context.subscriptions.push(vscode.commands.registerCommand("lisa.wrapInSpan", () => wrapWithTag("span")));
    context.subscriptions.push(vscode.commands.registerCommand("lisa.wrapInFragment", () => wrapWithTag("")));
    context.subscriptions.push(vscode.commands.registerCommand("lisa.wrapInFlexRow", () => wrapWithTag("FlexRow")));
    context.subscriptions.push(vscode.commands.registerCommand("lisa.removeWrapper", () => removeLayer()));
    context.subscriptions.push(vscode.commands.registerCommand("lisa.wrapInFlexColumn", () => wrapWithTag("FlexColumn")));
    let disposable = vscode.commands.registerCommand("lisa.helloWorld", () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        vscode.window.showInformationMessage("Hello VS code from lisa-wrapper!");
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map