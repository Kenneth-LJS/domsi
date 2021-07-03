import { isDomsiNodeMatch } from '../matcher/node-matcher';
import { DomsiNode, IDomsiSelector as DomsiSelector } from '../types/domsi';
import { DomsiSelector as InputDomsiSelector, DomsiHTMLNode } from '../types/public';
import { reversed } from '../utils/array';
import { buildDomsiNodes, cloneDomsiSelector, getDomsiMatchedElements, initDomsiSelectors } from '../utils/domsi';

export function domsiFind(inputDomsiSelector: InputDomsiSelector, element: Node) {
    return domsiFindAll(inputDomsiSelector, element)[0];
}

export function domsiFindAll(inputDomsiSelector: InputDomsiSelector, element?: Node) {
    // Deep clone to leave the original selector unmodified
    const rootDomsiSelector = cloneDomsiSelector(inputDomsiSelector);

    const rootElement = (element || document) as DomsiHTMLNode;

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

function buildDomsiMatches(domsiSelectors: DomsiSelector[], domsiNodes: DomsiNode[]) {
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

function updateDomsiNodeMatch(node: DomsiNode, selector: DomsiSelector) {
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












