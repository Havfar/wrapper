import { TextLine } from "vscode";
import { HtmlTag } from "./HtmlTag";

export class HtmlLine {
  public lineStart!: number;
  public lineEnd!: number;
  public content!: string;
  public numberOfTabs!: number;
  public htmlTag: HtmlTag | undefined;

  addTab() {
    this.numberOfTabs++;
  }

  removeTab() {
    this.numberOfTabs--;
  }

  addLine() {
    this.lineStart++;
    this.lineEnd++;
  }

  removeTabAndLine() {
    this.lineStart--;
    this.lineEnd--;
    this.numberOfTabs--;
  }

  _getTabs(): string {
    var output = "";
    for (let index = 0; index < this.numberOfTabs; index++) {
      output += "\t";
    }
    return output;
  }

  toString(): string {
    return "" + this._getTabs() + this.content + "\n";
  }

  getHtmlTag(tag: string): string {
    var content = tag.replace("<", "").replace("/", "").replace(">", "");
    var tag = content.split(" ")[0];
    return tag;
  }

  isHtmlTagWithMultipleLines(): boolean {
    return this.content.includes("<") && !this.content.includes(">");
  }

  isClosingTag(): boolean {
    return this.content.includes("</") || this.content.includes("/>");
  }

  analyseContent() {
    var htmlTag =
      this.content.match("<[^<>]+>") ?? this.content.match("<[^<>]+");
    if (htmlTag) {
      const isClosing = htmlTag[0].includes("</") || htmlTag[0].includes("/>");
      this.htmlTag = HtmlTag.createHtmlTag(
        this.getHtmlTag(htmlTag[0]),
        isClosing
      );
    }
  }

  static createHtmlLine(line: number, content: TextLine): HtmlLine {
    const htmlLine = new HtmlLine();
    htmlLine.lineStart = line;
    var whitespace = content.text.slice(
      0,
      content.firstNonWhitespaceCharacterIndex
    );
    var lineContent = content.text.slice(
      content.firstNonWhitespaceCharacterIndex
    );
    htmlLine.numberOfTabs = whitespace.split("\t").length - 1;
    htmlLine.content = lineContent;
    htmlLine.analyseContent();
    return htmlLine;
  }

  static createHtmlLineStartEnd(
    startLineNo: number,
    endLineNo: number,
    content: string
  ): HtmlLine {
    const htmlLine = new HtmlLine();
    htmlLine.lineStart = startLineNo;
    htmlLine.lineEnd = endLineNo;

    var whitespace = content.slice(0, content.indexOf(content.trim()));
    htmlLine.numberOfTabs = whitespace.split("\t").length - 1;
    htmlLine.content = content;
    htmlLine.analyseContent();
    return htmlLine;
  }

  static createEmptyHtmlLines(line: number): HtmlLine {
    const htmlLine = new HtmlLine();
    htmlLine.lineStart = line;
    htmlLine.content = "";
    return htmlLine;
  }

  static createHtmlLine2(
    line: number,
    htmlTag: HtmlTag,
    numberOfTabs: number
  ): HtmlLine {
    const htmlLine = new HtmlLine();
    htmlLine.lineStart = line;

    htmlLine.numberOfTabs = numberOfTabs;
    htmlLine.htmlTag = htmlTag;
    htmlLine.content = htmlTag.isClosing
      ? `</${htmlTag.type}>`
      : `<${htmlTag.type}>`;
    return htmlLine;
  }
}
