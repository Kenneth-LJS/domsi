import { DomsiNode, IDomsiSelector as DomsiSelector } from '../types/domsi';
import { isValueMatch } from './value-matcher';

export function isDomsiChildrenMatch(node: DomsiNode, selector: DomsiSelector): boolean {
    if (!selector.children) {
        return true;
    }
    for (const childSelector of Object.values(selector.children) as any[]) {
        const childSelectorType = childSelector.type;
        const childSelectorID = childSelector.selector.__id;

        const childCount = node.domsiChildrenMatch[childSelectorID].length;
        if (childSelectorType == 'single' && childCount == 0) {
            return false;
        } else if (childSelectorType == 'multiple') {
            if (typeof childSelector.count !== 'undefined' && !isValueMatch(childCount, childSelector.count)) {
                return false;
            }
        } else if (childSelectorType == 'none' && childCount > 0) {
            return false;
        }
    }
    return true;
}