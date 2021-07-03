import { DomsiNode, IDomsiSelector as DomsiSelector } from '../types/domsi';
import { isDomsiChildrenMatch } from './children-matcher';
import { isDomsiElemMatch } from './element-matcher';

export function isDomsiNodeMatch(node: DomsiNode, selector: DomsiSelector): boolean {
    const selectorID = selector.id;

    // A selected item cannot contain a child that also matches the selector
    // We only select the lowest level object
    if (node.domsiChildrenMatch[selectorID].length > 0) {
        return false;
    }

    if (!isDomsiChildrenMatch(node, selector)) {
        return false;
    }

    // Make sure attributes/props/css style/text matches the selector
    if (!isDomsiElemMatch(node.htmlNode, selector)) {
        return false;
    }

    return true;
}