import { isDomsiNodeMatch } from '../matcher/domsi-node-matcher';
import { DomsiNode, IDomsiNodeSelector as DomsiNodeSelector } from '../types/domsi';
import { HTMLNode } from '../types/html-node';
import { DomsiNodeSelector as InputDomsiNodeSelector } from '../types/public';
import { reversed } from '../utils/array';
import { buildDomsiNodes, cloneDomsiSelector, getDomsiMatchedElements, initDomsiSelectors } from '../utils/domsi';

export function domsiFind(inputDomsiSelector: InputDomsiNodeSelector, element?: Node) {
    return domsiFindAll(inputDomsiSelector, element)[0];
}

export function domsiFindAll(inputDomsiSelector: InputDomsiNodeSelector, element?: Node) {
    // Deep clone to leave the original selector unmodified
    const rootDomsiSelector = cloneDomsiSelector(inputDomsiSelector);

    const rootElement = (element || document) as HTMLNode;

    // Flatten DomsiSelector + assign internal IDs to each nested selector

    const domsiSelectors = initDomsiSelectors(rootDomsiSelector);
    const selectorCount = domsiSelectors.length;

    const domsiNodes = buildDomsiNodes(rootElement, selectorCount);

    // ** MAGIC **
    buildDomsiMatches(domsiSelectors, domsiNodes);

    // Turn nodes into result
    const rootDomsiNode = domsiNodes[0];
    const domsiElements = getDomsiMatchedElements(rootDomsiNode, rootDomsiSelector);
    return domsiElements;
}

function buildDomsiMatches(domsiSelectors: DomsiNodeSelector[], domsiNodes: DomsiNode[]) {
    // The algorithm brain
    reversed(domsiSelectors).forEach(curSelector => {
        reversed(domsiNodes).forEach(curNode => {
            if (!isDomsiNodeMatch(curNode, curSelector)) {
                return;
            }
            updateDomsiNodeMatch(curNode, curSelector);
        });
    });
}

function updateDomsiNodeMatch(node: DomsiNode, selector: DomsiNodeSelector) {
    // Track that the current node matches
    node.domsiMatch[selector.id] = true;

    let curParent = node.parent;
    while (curParent) {
        // Update all ancestors of child match
        curParent.domsiChildrenMatch[selector.id].push(node);
        
        // Next parent
        curParent = curParent.parent;
    }
}












