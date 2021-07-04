import { DomsiNodeSelector } from '../types/public';
import { HTMLNode } from '../types/html-node';
import { isAttributeMatch } from './attribute-matcher';
import { isCssMatch } from './css-matcher';
import { isPropertyMatch } from './property-matcher';
import { isTagNameMatch } from './tag-name-matcher';
import { isTextMatch } from './text-matcher';

export function isNodeMatch(elem: HTMLNode, selector: DomsiNodeSelector): boolean {
    if (selector.tagName && !isTagNameMatch(elem, selector.tagName)) {
        return false;
    } else if (selector.attribute && !isAttributeMatch(elem, selector.attribute)) {
        return false;
    } else if (selector.property && !isPropertyMatch(elem, selector.property)) {
        return false;
    } else if (selector.css && !isCssMatch(elem, selector.css)) {
        return false;
    } else if (selector.text && !isTextMatch(elem, selector.text)) {
        return false;
    }
    return true;
}