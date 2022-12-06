import { HtmlLine } from "./HtmlLine";
import { HtmlTag } from "./HtmlTag";

export class HtmlSection {
  public lines!: HtmlLine[];
  public start!: number;
  public end!: number;

  constructor(lines: HtmlLine[]) {
    this.lines = lines;
    this.start = lines[0].lineStart;

    const lastLine = lines[lines.length - 1];
    this.end = lastLine.lineEnd ?? lastLine.lineStart + 1;
  }

  addTabAndLine() {
    this.lines.forEach((line) => {
      line.addTab();
      line.addLine();
    });
  }

  removeTabs() {
    this.lines.forEach((line) => {
      line.removeTab();
    });
  }

  addTag(beforeTag: HtmlTag, afterTag: HtmlTag) {
    const numberOfTabs = this.lines[0].numberOfTabs;

    this.addTabAndLine();

    this.lines.unshift(
      HtmlLine.createHtmlLine2(this.start, beforeTag, numberOfTabs)
    );
    this.lines.push(HtmlLine.createHtmlLine2(this.end, afterTag, numberOfTabs));
  }

  removeLayer() {
    this.lines = this.lines.slice(1, this.lines.length - 1);
    this.removeTabs();
  }

  toString(): string {
    var output = "";
    this.lines.forEach((line) => {
      output += line.toString();
    });
    return output;
  }
}
