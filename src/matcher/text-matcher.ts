import { DomsiHTMLNode } from '../types/public';
import { DomsiTextSelector } from '../types/selectors/text-selector';
import { isValueMatch } from './value-matcher';

export function isTextMatch(elem: DomsiHTMLNode, textSelector: DomsiTextSelector): boolean {
    const innerText = elem instanceof HTMLElement ? elem.innerText : undefined;
    return isValueMatch(innerText, textSelector);
}