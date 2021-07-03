import { DomsiHTMLNode } from '../types/public';
import { DomsiPropertySelector } from '../types/selectors/property-selector';
import { isValueMatch } from './value-matcher';

export function isPropertyMatch(elem: DomsiHTMLNode, propertySelector: DomsiPropertySelector): boolean {
    for (const [propertyName, valueSelector] of Object.entries(propertySelector)) {
        if (!isValueMatch(elem[propertyName], valueSelector)) {
            return false;
        }
    }
    return true;
}