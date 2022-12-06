"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HtmlSection = void 0;
const HtmlLine_1 = require("./HtmlLine");
class HtmlSection {
    constructor(lines) {
        this.lines = lines;
        this.start = lines[0].line;
        this.end = lines[lines.length - 1].line + 1;
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
    addTag(beforeTag, afterTag) {
        const numberOfTabs = this.lines[0].numberOfTabs;
        this.addTabAndLine();
        this.lines.unshift(HtmlLine_1.HtmlLine.createHtmlLine2(this.start, beforeTag, numberOfTabs));
        this.lines.push(HtmlLine_1.HtmlLine.createHtmlLine2(this.end, afterTag, numberOfTabs));
    }
    removeLayer() {
        this.lines = this.lines.slice(1, this.lines.length - 1);
        this.removeTabs();
    }
    toString() {
        var output = "";
        this.lines.forEach((line) => {
            output += line.toString();
        });
        return output;
    }
}
exports.HtmlSection = HtmlSection;
//# sourceMappingURL=HtmlSection.js.map