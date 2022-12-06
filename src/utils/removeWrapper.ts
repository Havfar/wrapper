import { toHtmlSection } from "./toHtmlSecetion";
import * as vscode from "vscode";
import { Position, Selection, SnippetString } from "vscode";

export function removeWrapper() {
  const editor = vscode.window.activeTextEditor;
  if (editor === undefined) {
    return;
  }
  var htmlSection = toHtmlSection(editor);
  htmlSection.removeLayer();
  var selection = new Selection(
    new Position(htmlSection.start, 0),
    new Position(htmlSection.end, 0)
  );
  editor.insertSnippet(new SnippetString(htmlSection.toString()), selection);
  editor.selection = new Selection(
    new Position(htmlSection.start, 100),
    new Position(htmlSection.start, 100)
  );
}
