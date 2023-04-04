import { DomsiObjectChild, DomsiObject, DomsiNodeSelector as InputDomsiSelector, DomsiObjectChildren } from '../../types/public';
import { IDomsiNodeSelector as DomsiNodeSelector } from '../../types/selectors/node-selector';
import { DomsiNode } from '../../types/domsi';
import { ROOT_NODE_NAME } from '../constants/domsi';
import { HTMLNode } from '../../types/html-node';

export function cloneDomsiSelector(inputDomsiSelector: InputDomsiSelector): DomsiNodeSelector {
    return JSON.parse(JSON.stringify(inputDomsiSelector)) as DomsiNodeSelector;
}

export function initDomsiSelectors(rootDomsiSelector: DomsiNodeSelector): DomsiNodeSelector[] {
    const domsiSelectors = [rootDomsiSelector];
    let i = 0;  
    while (i < domsiSelectors.length) {
        const curSelector = domsiSelectors[i];
        curSelector.originalSelector = JSON.parse(JSON.stringify(curSelector));

        curSelector.id = i;
        if (i == 0) {
            curSelector.name = ROOT_NODE_NAME;
        }

        if (curSelector.children) {
            for (const childName of Object.keys(curSelector.children)) {
                const childSelectorData = curSelector.children[childName];
                if (!childSelectorData.selector) {
                    childSelectorData.selector = {} as DomsiNodeSelector;
                }
                childSelectorData.selector.name = curSelector.name + '.' + childName;
                domsiSelectors.push(childSelectorData.selector);
            }
        }

        i++;
    }
    return domsiSelectors;
}

export function buildDomsiNodes(element: HTMLNode, domsiSelectorCount: number): DomsiNode[] {
    // Build HTML tree
    const domsiTree = buildDomsiTree(element as HTMLNode); // root node

    // Flatten HTML nodes with BFS
    const domsiNodes = [domsiTree];
    let i = 0;
    while (i < domsiNodes.length) {
        const curNode = domsiNodes[i];
        curNode.domsiMatch = [...new Array(domsiSelectorCount)].map(() => false);
        curNode.domsiChildrenMatch = [...new Array(domsiSelectorCount)].map(() => []);
        
        domsiNodes.push(...curNode.children);
        i++;
    }
    return domsiNodes;
}

export function buildDomsiTree(elem: HTMLNode, parentNode?: DomsiNode) {
    const treeNode = {
        htmlNode: elem,
        parent: parentNode
    } as DomsiNode;
    const children: DomsiNode[] = [];
    elem.childNodes.forEach(childNode => {
        children.push(buildDomsiTree(childNode, treeNode));
    });
    treeNode.children = children;

    // @ts-ignore
    treeNode.htmlNode.domsiNode = treeNode; // debug

    return treeNode;
}

export function getDomsiMatchedElements(rootDomsiNode: DomsiNode, rootDomsiSelector: DomsiNodeSelector): DomsiObject[] {
    // Matched nodes are in reverse order of HTML elements, due to the way the algorithm works
    const matchedNodes = rootDomsiNode.domsiChildrenMatch[rootDomsiSelector.id];

    // Turn nodes into result
    const domsiElements = matchedNodes.map(matchedNode => domsiNodeToDomsiElement(matchedNode, rootDomsiSelector));
    
    // Reverse the list to put it in the right order from top-down
    domsiElements.reverse();
    return domsiElements;
}

export function domsiNodeToDomsiElement(node: DomsiNode, selector: DomsiNodeSelector) {
    let children = {} as DomsiObjectChildren;
    if (selector.children) {
        for (const [identifier, childSelectorData] of Object.entries(selector.children)) {
            const childSelectorType = childSelectorData.type;
            const childIsTransparent = childSelectorData.transparent;
            const childSelector = childSelectorData.selector;
            const childSelectorID = childSelector.id;

            let childrenResult: DomsiObjectChild | undefined;
            if (childSelectorType == 'single') {
                // First matched child node would be the last matched child in the list (due to the array reversals)
                const matchedChildren = node.domsiChildrenMatch[childSelectorID];
                const childNode = matchedChildren[matchedChildren.length - 1];
                childrenResult = domsiNodeToDomsiElement(childNode, childSelector);
            } else if (childSelectorType == 'multiple') {
                const matchedChildren = node.domsiChildrenMatch[childSelectorID];
                childrenResult = matchedChildren.map((childNode: any) => domsiNodeToDomsiElement(childNode, childSelector));
                childrenResult.reverse();
            } else if (childSelectorType == 'optional') {
                const matchedChildren = node.domsiChildrenMatch[childSelectorID];
                if (matchedChildren.length > 0) {
                    childrenResult = domsiNodeToDomsiElement(matchedChildren[0], childSelector);
                } else {
                    childrenResult = undefined;
                }
            } else if (childSelectorType == 'none') {
                continue;
            } else {
                // todo: raise Exception
                continue;
            }

            if (childrenResult) {
                children[identifier] = childrenResult;
            }

            // todo: check if childIsTransparent when childSelector type is not single
            // todo: check if child overrides parent name property
            if (childIsTransparent && childSelectorType == 'single') {
                // console.log('transparent', childrenResult.children, children)
                children = Object.assign(
                    {},
                    (childrenResult as DomsiObject).children,
                    children
                );
            }
        }
    }

    const domsiElement = {
        node: node.htmlNode,
        children: children
    } as DomsiObject;
    return domsiElement;
}