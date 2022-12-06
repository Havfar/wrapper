import * as vscode from "vscode";
import { Position } from "vscode";
import { HtmlLine } from "../models/HtmlLine";
import { HtmlSection } from "../models/HtmlSection";

export const toHtmlSection = (editor: vscode.TextEditor): HtmlSection => {
  var listOfHtmlLines = new Array<HtmlLine>();
  let startPosition = new Position(0, 0);

  let startLine = editor.selection.start.line;
  startPosition = new Position(startLine, 0);

  let counter = 1;
  let tagCounter = 0;
  const start = editor.document.lineAt(startLine);

  if (start.text.includes("/>") || start.text.includes(">")) {
    var firstLine = HtmlLine.createHtmlLine(startLine, start);
    listOfHtmlLines.push(firstLine);
  } else {
    const { line, text } = findEndChevronRecursive(startPosition, editor);
    const htmlLine = HtmlLine.createHtmlLineStartEnd(
      startPosition.line,
      line.lineNumber + 1,
      text
    );

    listOfHtmlLines.push(htmlLine);
    return new HtmlSection(listOfHtmlLines);
  }

  while (!listOfHtmlLines[0].isClosingTag()) {
    var lineNo = startLine + counter;
    var line = editor.document.lineAt(startLine + counter);
    var htmlLine = HtmlLine.createHtmlLine(lineNo, line);
    listOfHtmlLines.push(htmlLine);
    counter++;

    if (htmlLine.htmlTag?.type === listOfHtmlLines[0].htmlTag?.type) {
      if (htmlLine.isClosingTag()) {
        if (tagCounter === 0) {
          break;
        }
        tagCounter--;
      } else {
        tagCounter++;
      }
    }
  }

  return new HtmlSection(listOfHtmlLines);
};

const findEndChevronRecursive = (
  startPosition: Position,
  editor: vscode.TextEditor
): { line: vscode.TextLine; text: string } => {
  var line = editor.document.lineAt(startPosition.line);
  var text = line.text;
  if (text.includes(">") && !text.includes("=>")) {
    return { line, text };
  } else {
    const result = findEndChevronRecursive(
      new Position(startPosition.line + 1, 0),
      editor
    );
    text += result.text;
    line = result.line;
    return { line, text };
  }
};

export function toHtmlSectionFromSelection(): HtmlSection {
  const editor = vscode.window.activeTextEditor;
  var listOfHtmlLines = new Array<HtmlLine>();

  if (editor) {
    const startLine = editor.selection.start.line;
    const numberOfLines =
      editor.selection.end.line - editor.selection.start.line;
    for (let counter = 0; counter <= numberOfLines; counter++) {
      var lineNo = startLine + counter;
      var line = editor.document.lineAt(lineNo);
      var htmlLine = HtmlLine.createHtmlLine(lineNo, line);
      listOfHtmlLines.push(htmlLine);
    }
  }

  var section = new HtmlSection(listOfHtmlLines);

  return section;
}
