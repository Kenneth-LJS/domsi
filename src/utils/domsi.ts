import { DomsiElementChild, DomsiElement, DomsiSelector as InputDomsiSelector, DomsiHTMLNode } from '../types/public';
import { DomsiNode, IDomsiSelector as DomsiSelector } from '../types/domsi';

export function cloneDomsiSelector(inputDomsiSelector: InputDomsiSelector): DomsiSelector {
    return JSON.parse(JSON.stringify(inputDomsiSelector)) as DomsiSelector;
}

export function initDomsiSelectors(rootDomsiSelector: DomsiSelector): DomsiSelector[] {
    const domsiSelectors = [rootDomsiSelector];
    let i = 0;
    while (i < domsiSelectors.length) {
        const curSelector = domsiSelectors[i];
        curSelector.originalSelector = JSON.parse(JSON.stringify(curSelector));

        curSelector.id = i;
        if (i == 0) {
            curSelector.name = 'root';
        }

        if (curSelector.children) {
            for (const childName of Object.keys(curSelector.children)) {
                const childSelectorData = curSelector.children[childName];
                if (!childSelectorData.selector) {
                    childSelectorData.selector = {} as DomsiSelector;
                }
                childSelectorData.selector.name = curSelector.name + '.' + childName;
                domsiSelectors.push(childSelectorData.selector);
            }
        }

        i++;
    }
    return domsiSelectors;
}

export function buildDomsiNodes(element: DomsiHTMLNode, domsiSelectorCount: number): DomsiNode[] {
    // Build HTML tree
    const domsiTree = buildDomsiTree(element as DomsiHTMLNode); // root node

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

export function buildDomsiTree(elem: DomsiHTMLNode, parentNode?: DomsiNode) {
    const treeNode = {
        htmlNode: elem,
        parent: parentNode
    } as DomsiNode;
    const children: DomsiNode[] = [];
    elem.childNodes.forEach(childNode => {
        children.push(buildDomsiTree(childNode, treeNode));
    });
    treeNode.children = children;
    return treeNode;
}

export function getDomsiMatchedElements(rootDomsiNode: DomsiNode, rootDomsiSelector: DomsiSelector): DomsiElement[] {
    // Matched nodes are in reverse order of HTML elements, due to the way the algorithm works
    const matchedNodes = rootDomsiNode.domsiChildrenMatch[rootDomsiSelector.id];

    // Turn nodes into result
    const domsiElements = matchedNodes.map(matchedNode => domsiNodeToDomsiElement(matchedNode, rootDomsiSelector));
    
    // Reverse the list to put it in the right order from top-down
    domsiElements.reverse();
    return domsiElements;
}

export function domsiNodeToDomsiElement(node: DomsiNode, selector: DomsiSelector) {
    let children = {};
    if (selector.children) {
        for (const [identifier, childSelectorData] of Object.entries(selector.children) as any) {
            const childSelectorType = childSelectorData.type;
            const childIsTransparent = !!childSelectorData.transparent;
            const childSelector = childSelectorData.selector;
            const childSelectorID = childSelector.__id;

            let childrenResult: DomsiElementChild;
            if (childSelectorType == 'single') {
                // First matched child node would be the last matched child in the list (due to the array reversals)
                const matchedChildren = node.domsiChildrenMatch[childSelectorID];
                const childNode = matchedChildren[matchedChildren.length - 1];
                childrenResult = domsiNodeToDomsiElement(childNode, childSelector);
            } else if (childSelectorType == 'multiple') {
                const matchedChildren = node.domsiChildrenMatch[childSelectorID];
                childrenResult = matchedChildren.map((childNode: any) => domsiNodeToDomsiElement(childNode, childSelector));
                childrenResult.reverse();
            } else {
                // todo: raise Exception
                continue;
            }

            children[identifier] = childrenResult;

            // todo: check if childIsTransparent when childSelector type is not single
            // todo: check if child overrides parent name property
            if (childIsTransparent && childSelectorType == 'single') {
                // console.log('transparent', childrenResult.children, children)
                children = Object.assign(
                    {},
                    (childrenResult as DomsiElement).children,
                    children
                );
            }
        }
    }

    const domsiElement = {
        htmlNode: node.htmlNode,
        children: children
    } as DomsiElement;
    return domsiElement;
}