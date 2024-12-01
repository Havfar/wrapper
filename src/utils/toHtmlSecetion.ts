import * as vscode from "vscode";
import { Position } from "vscode";
import { HtmlLine } from "../models/HtmlLine";
import { HtmlSection } from "../models/HtmlSection";

/**
 * Converts the selected text in the editor to an HtmlSection.
 *
 * @param editor - The VSCode TextEditor instance containing the selection.
 * @returns An HtmlSection object representing the selected HTML content.
 *
 * The function processes the selected text in the editor and converts it into an HtmlSection object.
 * It starts by determining the starting line of the selection and checks if the line contains a self-closing tag or a closing chevron.
 * If it does, it creates an HtmlLine for that line and adds it to the htmlLines array.
 * Otherwise, it finds the end chevron of the tag and creates an HtmlLine for the start and end lines.
 *
 * The function then iterates through the lines, adding them to the htmlLines array until it finds the closing tag of the initial HTML tag.
 */
export const toHtmlSection = (editor: vscode.TextEditor): HtmlSection => {
  const htmlLines: HtmlLine[] = [];
  const startLineNumber = editor.selection.start.line;
  const startPosition = new Position(startLineNumber, 0);
  const startLine = editor.document.lineAt(startLineNumber);

  if (startLine.text.includes("/>") || startLine.text.includes(">")) {
    htmlLines.push(HtmlLine.createHtmlLine(startLineNumber, startLine));
  } else {
    const { line: endLine, text } = findEndChevron(startPosition, editor);
    htmlLines.push(
      HtmlLine.createHtmlLineStartEnd(
        startPosition.line,
        endLine.lineNumber + 1,
        text
      )
    );
    return new HtmlSection(htmlLines);
  }

  let lineOffset = 1;
  let nestedTagCount = 0;

  while (!htmlLines[0].isClosingTag()) {
    const currentLineNumber = startLineNumber + lineOffset;
    const currentLine = editor.document.lineAt(currentLineNumber);
    const htmlLine = HtmlLine.createHtmlLine(currentLineNumber, currentLine);
    htmlLines.push(htmlLine);
    lineOffset++;

    if (htmlLine.htmlTag?.type === htmlLines[0].htmlTag?.type) {
      if (htmlLine.isClosingTag()) {
        if (nestedTagCount === 0) {
          break;
        }
        nestedTagCount--;
      } else {
        nestedTagCount++;
      }
    }
  }

  return new HtmlSection(htmlLines);
};

/**
 * Finds the end chevron (">") in the text starting from a given position in the editor.
 * It concatenates lines until it finds a ">" that is not part of an arrow function (=>).
 *
 * @param startPosition - The starting position to begin the search.
 * @param editor - The text editor instance where the search is performed.
 * @returns An object containing the line where the end chevron is found and the combined text up to that point.
 */
const findEndChevron = (
  startPosition: Position,
  editor: vscode.TextEditor
): { line: vscode.TextLine; text: string } => {
  let currentLine = editor.document.lineAt(startPosition.line);
  let combinedText = currentLine.text;
  while (!combinedText.includes(">") || combinedText.includes("=>")) {
    startPosition = new Position(startPosition.line + 1, 0);
    currentLine = editor.document.lineAt(startPosition.line);
    combinedText += currentLine.text;
  }
  return { line: currentLine, text: combinedText };
};

/**
 * Converts the currently selected lines in the active text editor to an HtmlSection.
 *
 * @returns {HtmlSection} The HtmlSection created from the selected lines.
 * @throws {Error} If no active editor is found.
 */
export function toHtmlSectionFromSelection(): HtmlSection {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    throw new Error("No active editor found");
  }

  const htmlLines: HtmlLine[] = [];
  const startLineNumber = editor.selection.start.line;
  const endLineNumber = editor.selection.end.line;

  for (
    let lineNumber = startLineNumber;
    lineNumber <= endLineNumber;
    lineNumber++
  ) {
    const line = editor.document.lineAt(lineNumber);
    const htmlLine = HtmlLine.createHtmlLine(lineNumber, line);
    htmlLines.push(htmlLine);
  }

  return new HtmlSection(htmlLines);
}
