import { DomsiHTMLNode } from '../types/public';
import { DomsiTagNameSelector } from '../types/selectors/tag-name-selector';
import { isValueMatch } from './value-matcher';

export function isTagNameMatch(elem: DomsiHTMLNode, tagNameSelector: DomsiTagNameSelector): boolean {
    const tagName = elem instanceof Element ? elem.tagName : '';
    return isValueMatch(tagName.toLowerCase(), tagNameSelector);
}