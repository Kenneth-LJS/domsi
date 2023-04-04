import { HTMLNode } from '../types/html-node';
import { DomsiAttributeSelector } from '../types/selectors/attribute-selector';
import { isValueMatch } from './value-matcher';

export function isAttributeMatch(elem: HTMLNode, attributeSelector: DomsiAttributeSelector): boolean {
    if (typeof attributeSelector === 'undefined') {
        return true;
    }
    if (!(elem instanceof Element)) {
        return false;
    }
    for (const [attributeName, valueSelector] of Object.entries(attributeSelector)) {
        if (!isValueMatch(elem.getAttribute(attributeName) || undefined, valueSelector)) {
            return false;
        }
    }
    return true;
}