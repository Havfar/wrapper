"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HtmlLine = void 0;
const HtmlTag_1 = require("./HtmlTag");
class HtmlLine {
    addTab() {
        this.numberOfTabs++;
    }
    removeTab() {
        this.numberOfTabs--;
    }
    addLine() {
        this.line++;
    }
    removeTabAndLine() {
        this.line--;
        this.numberOfTabs--;
    }
    _getTabs() {
        var output = "";
        for (let index = 0; index < this.numberOfTabs; index++) {
            output += "\t";
        }
        return output;
    }
    toString() {
        return "" + this._getTabs() + this.content + "\n";
    }
    getHtmlTag(tag) {
        var content = tag.replace("<", "").replace("/", "").replace(">", "");
        var tag = content.split(" ")[0];
        return tag;
    }
    isHtmlTagWithMultipleLines() {
        return this.content.includes("<") && !this.content.includes(">");
    }
    isClosingTag() {
        return this.content.includes("</") || this.content.includes("/>");
    }
    analyseContent() {
        var htmlTag = this.content.match("<[^<>]+>") ?? this.content.match("<[^<>]+");
        var semiOpenHtmlTag = this.content.match("<[^<>]+");
        if (htmlTag) {
            const isClosing = htmlTag[0].includes("</") || htmlTag[0].includes("/>");
            this.htmlTag = HtmlTag_1.HtmlTag.createHtmlTag(this.getHtmlTag(htmlTag[0]), isClosing);
            // this.htmlTag = HtmlTag.parseHtmlString(this.getHtmlTag(htmlTag[0]));
        }
        //   this.content.startsWith("</") || this.content.endsWith("/>");
    }
    static createHtmlLine(line, content) {
        const htmlLine = new HtmlLine();
        htmlLine.line = line;
        var whitespace = content.text.slice(0, content.firstNonWhitespaceCharacterIndex);
        var lineContent = content.text.slice(content.firstNonWhitespaceCharacterIndex);
        htmlLine.numberOfTabs = whitespace.split("\t").length - 1;
        htmlLine.content = lineContent;
        htmlLine.analyseContent();
        return htmlLine;
    }
    static createEmptyHtmlLines(line) {
        const htmlLine = new HtmlLine();
        htmlLine.line = line;
        htmlLine.content = "";
        return htmlLine;
    }
    static createHtmlLine2(line, htmlTag, numberOfTabs) {
        const htmlLine = new HtmlLine();
        htmlLine.line = line;
        htmlLine.numberOfTabs = numberOfTabs;
        htmlLine.htmlTag = htmlTag;
        htmlLine.content = htmlTag.isClosing
            ? `</${htmlTag.type}>`
            : `<${htmlTag.type}>`;
        return htmlLine;
    }
}
exports.HtmlLine = HtmlLine;
//# sourceMappingURL=HtmlLine.js.map