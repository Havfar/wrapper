import * as vscode from "vscode";
import { insertSnippet } from "./utils/insertSnippet";
import { removeWrapper } from "./utils/removeWrapper";

export function deactivate() {}

export type Tag = "div" | "span" | "Container" | "FlexRow" | "FlexColumn" | "";

const wrapWithTag = (tag: Tag) => {
  insertSnippet(tag);
};

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("lisa.wrapInDiv", () => wrapWithTag("div"))
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("lisa.wrapInContainer", () =>
      wrapWithTag("Container")
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("lisa.wrapInSpan", () =>
      wrapWithTag("span")
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("lisa.wrapInFragment", () =>
      wrapWithTag("")
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("lisa.wrapInFlexRow", () =>
      wrapWithTag("FlexRow")
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("lisa.removeWrapper", () => removeWrapper())
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("lisa.wrapInFlexColumn", () =>
      wrapWithTag("FlexColumn")
    )
  );
}
