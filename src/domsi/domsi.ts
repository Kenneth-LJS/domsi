import { NO_VALIDATION } from '@env';

import { isDomsiNodeMatch } from '../matcher/domsi-node-matcher';
import { DomsiNode } from '../types/domsi';
import { HTMLNode } from '../types/html-node';
import { DomsiNodeSelector as InputDomsiNodeSelector, DomsiObject } from '../types/public';
import { reversed } from '../utils/array';
import { IDomsiNodeSelector as DomsiNodeSelector } from '../types/selectors/node-selector';
import { buildDomsiNodes, cloneDomsiSelector, getDomsiMatchedElements as getDomsiMatchedObjects, initDomsiSelectors } from '../utils/domsi';
import { DomsiNodeSelectorValidator } from '../validator/selector-validator';
import { validate } from './validate';

export function domsiFind(inputDomsiSelector: InputDomsiNodeSelector, element?: Node): DomsiObject | undefined {
    return domsiFindAll(inputDomsiSelector, element)[0];
}

export function domsiFindAll(inputDomsiSelector: InputDomsiNodeSelector, element?: Node): DomsiObject[] {

    if (!NO_VALIDATION) { 
        const validationErrors = validateDomsiSelector(inputDomsiSelector);
        // console.log('Validation errors', validationErrors);
    }

    return internalDomsiFindAll(inputDomsiSelector);
}

export function validateDomsiSelector(selector: any) {
    return validate(
        selector,
        DomsiNodeSelectorValidator
    );
}

export function internalDomsiFindAll(inputDomsiSelector: InputDomsiNodeSelector, element?: Node): DomsiObject[] {
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
    const domsiElements = getDomsiMatchedObjects(rootDomsiNode, rootDomsiSelector);
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