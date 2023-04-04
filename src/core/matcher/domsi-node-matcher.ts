import { DomsiNode } from '../types/domsi';
import { IDomsiNodeSelector as DomsiNodeSelector } from '../types/selectors/node-selector';
import { isDomsiChildrenMatch } from './children-matcher';
import { isNodeMatch } from './node-matcher';

export function isDomsiNodeMatch(domsiNode: DomsiNode, selector: DomsiNodeSelector): boolean {
    const selectorID = selector.id;

    // A selected item cannot contain a child that also matches the selector
    // We only select the lowest level object
    if (domsiNode.domsiChildrenMatch[selectorID].length > 0) {
        return false;
    }

    if (!isDomsiChildrenMatch(domsiNode, selector)) {
        return false;
    }

    // Make sure attributes/props/css/text/etc matches the selector
    if (!isNodeMatch(domsiNode.htmlNode, selector)) {
        return false;
    }

    return true;
}