import { DomsiHTMLNode } from '../types/public';
import { DomsiAttributeSelector } from '../types/selectors/attribute-selector';
import { isValueMatch } from './value-matcher';

export function isAttributeMatch(elem: DomsiHTMLNode, attributeSelector: DomsiAttributeSelector): boolean {
    if (typeof attributeSelector === 'undefined') {
        return true;
    }
    if (!(elem instanceof Element)) {
        return false;
    }
    for (const [attributeName, valueSelector] of Object.entries(attributeSelector)) {
        if (!isValueMatch(elem.getAttribute(attributeName), valueSelector)) {
            return false;
        }
    }
    return true;
}