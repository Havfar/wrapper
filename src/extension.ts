import * as vscode from "vscode";
import { insertSnippet } from "./utils/insertSnippet";
import { removeWrapper } from "./utils/removeWrapper";

export function deactivate() {}

export type Tag = "div" | "span" | "Container" | "Row" | "Column" | "";

const wrapWithTag = (tag: Tag) => {
  insertSnippet(tag);
};

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("wrapInDiv", () => wrapWithTag("div"))
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("wrapInSpan", () => wrapWithTag("span"))
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("wrapInFragment", () => wrapWithTag(""))
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("wrapInRow", () => wrapWithTag("Row"))
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("removeWrapper", () => removeWrapper())
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("wrapInColumn", () => wrapWithTag("Column"))
  );
}
