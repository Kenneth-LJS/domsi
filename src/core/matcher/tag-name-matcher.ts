import { HTMLNode } from '../types/html-node';
import { DomsiTagNameSelector } from '../types/selectors/tag-name-selector';
import { isValueMatch } from './value-matcher';

export function isTagNameMatch(elem: HTMLNode, tagNameSelector: DomsiTagNameSelector): boolean {
    const tagName = elem instanceof Element ? elem.tagName : '';
    return isValueMatch(tagName.toLowerCase(), tagNameSelector);
}