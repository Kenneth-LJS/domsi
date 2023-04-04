import { HTMLNode } from '../types/html-node';
import { DomsiTextSelector } from '../types/selectors/text-selector';
import { isValueMatch } from './value-matcher';

export function isTextMatch(elem: HTMLNode, textSelector: DomsiTextSelector): boolean {
    const innerText = elem instanceof HTMLElement ? elem.innerText : undefined;
    return isValueMatch(innerText, textSelector);
}