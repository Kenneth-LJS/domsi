import { DomsiAttributeSelector } from "./attribute-selector";
import { DomsiChildrenSelector } from "./children-selector";
import { DomsiCssSelector } from "./css-selector";
import { DomsiPropertySelector } from "./property-selector";
import { DomsiTagNameSelector } from "./tag-name-selector";
import { DomsiTextSelector } from "./text-selector";

export interface AbstractDomsiNodeSelector {
    tagName?: DomsiTagNameSelector;
    attribute?: DomsiAttributeSelector;
    property?: DomsiPropertySelector;
    css?: DomsiCssSelector;
    text?: DomsiTextSelector;

    children?: DomsiChildrenSelector<this>;
}