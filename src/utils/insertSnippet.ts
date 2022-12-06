import * as vscode from "vscode";
import { Tag } from "../extension";
import { HtmlTag } from "../models/HtmlTag";
import { toHtmlSection, toHtmlSectionFromSelection } from "./toHtmlSecetion";

export const insertSnippet = (tag: Tag) => {
  const editor = vscode.window.activeTextEditor;
  const editorSelection = editor?.selection;

  if (editor) {
    if (editorSelection?.isSingleLine) {
      singleLineConverter(tag, editor);
    } else {
      selectionConverter(tag, editor);
    }
  }
};

const singleLineConverter = (tag: Tag, editor: vscode.TextEditor) => {
  var htmlSection = toHtmlSection(editor);
  const before = HtmlTag.createHtmlTag(tag, false);
  const after = HtmlTag.createHtmlTag(tag, true);
  htmlSection.addTag(before, after);
  var selection = new vscode.Selection(
    new vscode.Position(htmlSection.start, 0),
    new vscode.Position(htmlSection.end, 0)
  );
  editor.insertSnippet(
    new vscode.SnippetString(htmlSection.toString()),
    selection
  );
  editor.selection = new vscode.Selection(
    new vscode.Position(htmlSection.start, 100),
    new vscode.Position(htmlSection.start, 100)
  );
};

const selectionConverter = (tag: Tag, editor: vscode.TextEditor) => {
  var htmlSection = toHtmlSectionFromSelection();
  const before = HtmlTag.createHtmlTag(tag, false);
  const after = HtmlTag.createHtmlTag(tag, true);
  htmlSection.addTag(before, after);
  var selection = new vscode.Selection(
    new vscode.Position(htmlSection.start, 0),
    new vscode.Position(htmlSection.end, 0)
  );
  editor.insertSnippet(
    new vscode.SnippetString(htmlSection.toString()),
    selection
  );
  editor.selection = new vscode.Selection(
    new vscode.Position(htmlSection.start, 100),
    new vscode.Position(htmlSection.start, 100)
  );
};
