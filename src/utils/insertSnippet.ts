"use strict";
import * as vscode from "vscode";
import { HtmlTag } from "../models/HtmlTag";
import { toHtmlSection, toHtmlSectionFromSelection } from "./toHtmlSecetion";

export const insertSnippet = (tag: string) => {
  const editor = vscode.window.activeTextEditor;
  const editorSelection = editor?.selection;
  if (editor) {
    if (editorSelection?.isSingleLine) {
      convertSnippet(tag, editor, toHtmlSection);
    } else {
      convertSnippet(tag, editor, toHtmlSectionFromSelection);
    }
  }
};

const convertSnippet = (
  tag: string,
  editor: vscode.TextEditor,
  htmlSectionFunc: (editor: vscode.TextEditor) => any
) => {
  var htmlSection = htmlSectionFunc(editor);
  const before = HtmlTag.createHtmlTag(tag, false);
  const after = HtmlTag.createHtmlTag(tag, true);
  htmlSection.addTag(before, after);
  var selection = new vscode.Selection(
    new vscode.Position(htmlSection.start, 0),
    new vscode.Position(htmlSection.end, 0)
  );
  editor.edit((editBuilder) => {
    editBuilder.replace(selection, htmlSection.toString());
  });
  editor.selection = new vscode.Selection(
    new vscode.Position(htmlSection.start, 100),
    new vscode.Position(htmlSection.start, 100)
  );
  vscode.commands.executeCommand("editor.action.formatDocument");
};
