import { DomsiAttributeSelector } from './selectors/attribute-selector';
import { DomsiChildrenSelector } from './selectors/children-selector';
import { DomsiCssSelector } from './selectors/css-selector';
import { DomsiPropertySelector } from './selectors/property-selector';
import { DomsiTagNameSelector } from './selectors/tag-name-selector';
import { DomsiTextSelector } from './selectors/text-selector';

export interface DomsiSelector {
    tagName?: DomsiTagNameSelector;
    attribute?: DomsiAttributeSelector;
    property?: DomsiPropertySelector;
    css?: DomsiCssSelector;
    text?: DomsiTextSelector;

    children?: DomsiChildrenSelector;
}

// This gets returned to the user
export interface DomsiElement {
    htmlNode: DomsiHTMLNode;
    children: DomsiElementChildren;
}

export type DomsiHTMLNode = Node;

export interface DomsiElementChildren {
    [name: string]: DomsiElementChild;
}

export type DomsiElementChild = DomsiElement | DomsiElement[];