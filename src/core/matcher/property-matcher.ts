import { HTMLNode } from '../types/html-node';
import { DomsiPropertySelector } from '../types/selectors/property-selector';
import { DomsiValue } from '../types/selectors/value-selector';
import { isValueMatch } from './value-matcher';

export function isPropertyMatch(elem: HTMLNode, propertySelector: DomsiPropertySelector): boolean {
    if (typeof propertySelector === 'undefined') {
        return true;
    }
    for (const [propertyName, valueSelector] of Object.entries(propertySelector)) {
        const elemPropertyValue = elem[propertyName as keyof DomsiPropertySelector] as DomsiValue;
        if (!isValueMatch(elemPropertyValue, valueSelector)) {
            return false;
        }
    }
    return true;
}