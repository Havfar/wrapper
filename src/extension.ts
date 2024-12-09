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

  context.subscriptions.push(
    vscode.languages.registerCodeActionsProvider(
      { scheme: "file", language: "typescriptreact" },
      new WrapperCodeActionProvider(),
      {
        providedCodeActionKinds:
          WrapperCodeActionProvider.providedCodeActionKinds,
      }
    )
  );
}

class WrapperCodeActionProvider implements vscode.CodeActionProvider {
  static readonly providedCodeActionKinds = [vscode.CodeActionKind.QuickFix];

  provideCodeActions(
    document: vscode.TextDocument,
    range: vscode.Range | vscode.Selection,
    context: vscode.CodeActionContext,
    token: vscode.CancellationToken
  ): vscode.CodeAction[] {
    const wrapInDivAction = this.createCommandCodeAction(
      "Wrap with <div>",
      "wrapInDiv"
    );
    const removeWrapperAction = this.createCommandCodeAction(
      "Remove wrapper",
      "removeWrapper"
    );
    return [wrapInDivAction, removeWrapperAction];
  }

  private createCommandCodeAction(
    title: string,
    command: string
  ): vscode.CodeAction {
    const action = new vscode.CodeAction(title, vscode.CodeActionKind.QuickFix);
    action.command = { command, title };
    return action;
  }
}
