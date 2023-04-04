import { DomsiNode } from '../types/domsi';
import { IDomsiNodeSelector as DomsiNodeSelector } from '../types/selectors/node-selector';
import { isValueMatch } from './value-matcher';

export function isDomsiChildrenMatch(domsiNode: DomsiNode, selector: DomsiNodeSelector): boolean {
    if (!selector.children) {
        return true;
    }

    for (const childSelector of Object.values(selector.children)) {
        const childSelectorType = childSelector.type;
        const childSelectorID = childSelector.selector.id;

        const childCount = domsiNode.domsiChildrenMatch[childSelectorID].length;
        if (childSelectorType == 'single' && childCount == 0) {
            return false;
        } else if (childSelectorType == 'multiple') {
            if (typeof childSelector.count !== 'undefined' && !isValueMatch(childCount, childSelector.count)) {
                return false;
            }
        } else if (childSelectorType == 'optional') {
            return true;
        } else if (childSelectorType == 'none' && childCount > 0) {
            return false;
        }
    }
    return true;
}