"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HtmlTag = void 0;
class HtmlTag {
    toString() {
        return this.isClosing ? `<${this.type}>` : `</${this.type}>`;
    }
    static createHtmlTag(type, isClosing) {
        const htmlTag = new HtmlTag();
        htmlTag.type = type;
        htmlTag.isClosing = isClosing;
        return htmlTag;
    }
    static parseHtmlString(input) {
        const htmlTag = new HtmlTag();
        return htmlTag;
    }
}
exports.HtmlTag = HtmlTag;
//# sourceMappingURL=HtmlTag.js.map