export class HtmlTag {
  public type!: string;
  public class!: string;
  public attribute!: string;
  public isClosing!: boolean;

  public toString(): string {
    return this.isClosing ? `<${this.type}>` : `</${this.type}>`;
  }

  static createHtmlTag(type: string, isClosing: boolean): HtmlTag {
    const htmlTag = new HtmlTag();
    htmlTag.type = type;
    htmlTag.isClosing = isClosing;
    return htmlTag;
  }

  static parseHtmlString(input: string): HtmlTag {
    const htmlTag = new HtmlTag();
    return htmlTag;
  }
}
