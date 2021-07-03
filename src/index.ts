import { Selector } from './types';

function domsiFind(domsiSelector: Selector, element: any) {
    return domsiFindAll(domsiSelector, element)[0];
}

function domsiFindAll(domsiSelector: any, element: any) {
    // Deep clone to leave the original selector unmodified
    domsiSelector = JSON.parse(JSON.stringify(domsiSelector));

    if (!element) { element = document; }

    // Flatten DomsiSelector + assign internal IDs to each nested selector
    const domsiSelectors = [domsiSelector];
    let i = 0;
    while (i < domsiSelectors.length) {
        const curSelector = domsiSelectors[i];
        curSelector.__original = JSON.parse(JSON.stringify(curSelector));

        curSelector.__iid = i;
        if (i == 0) {
            curSelector.__name = 'root';
        }

        if (curSelector.children) {
            for (const childName of Object.keys(curSelector.children)) {
                const childSelectorData = curSelector.children[childName];
                if (!childSelectorData.selector) {
                    childSelectorData.selector = {};
                }
                childSelectorData.selector.__name = curSelector.__name + '.' + childName;
                domsiSelectors.push(childSelectorData.selector);
            }
        }

        i++;
    }

    const selectorCount = domsiSelectors.length;

    // Build HTML tree
    const domsiTree = buildDomsiTree(element);

    // Flatten HTML nodes with BFS
    const domsiNodes = [domsiTree];
    i = 0;
    while (i < domsiNodes.length) {
        const curNode = domsiNodes[i];
        curNode.__isDomsiMatch = [...new Array(selectorCount)].map(() => false);
        curNode.__domsiMatchChildren = [...new Array(selectorCount)].map(() => []);
        
        domsiNodes.push(...curNode.children);
        i++;
    }

    // The algorithm brain
    reversed(domsiSelectors).forEach(curSelector => {
        reversed(domsiNodes).forEach(curNode => {
            if (!isDomsiMatch(curNode, curSelector)) {
                return;
            }
            updateDomsiNodeMatch(curSelector, curNode);
        });
    });

    // Debug
    // domsiNodes.forEach(domsiNode => {
    //     domsiNode.element.domsiNode = domsiNode;

    //     if (domsiNode.element.setAttribute) {
    //         const matchedSelectorNames = [];
    //         domsiNode.__isDomsiMatch.forEach((isMatch, selectorIID) => {
    //             if (!isMatch) { return; }
    //             matchedSelectorNames.push(domsiSelectors[selectorIID].__name);
    //         });
    //         const matchedSelectorsStr = matchedSelectorNames.join(',');
    //         domsiNode.element.setAttribute('data-domsi-match', matchedSelectorsStr);

    //         const childrenMatchedSelectorNames = [];
    //         domsiNode.__domsiMatchChildren.forEach((matchedChildren, selectorIID) => {
    //             if (matchedChildren.length == 0) { return; }
    //             childrenMatchedSelectorNames.push(domsiSelectors[selectorIID].__name);
    //         });
    //         const childrenMatchedSelectorsStr = childrenMatchedSelectorNames.join(',');
    //         domsiNode.element.setAttribute('data-domsi-child-match', childrenMatchedSelectorsStr);
    //     }
    // });

    // Fetch all nodes
    const firstSelectorIID = domsiSelectors[0].__iid;
    const matchedNodes = domsiNodes[0].__domsiMatchChildren[firstSelectorIID];

    // Turn nodes into result
    const domsiElements = matchedNodes.map((matchedNode: any) => domsiNodeToDomsiElement(matchedNode, domsiSelector));
    domsiElements.reverse();
    return domsiElements;
}

function domsiNodeToDomsiElement(domsiNode: any, domsiSelector: any) {
    let children = {};
    if (domsiSelector.children) {
        for (const [identifier, childSelectorData] of Object.entries(domsiSelector.children) as any) {
            const childSelectorType = childSelectorData.type;
            const childIsTransparent = !!childSelectorData.transparent;
            const childSelector = childSelectorData.selector;
            const childSelectorIID = childSelector.__iid;

            let childrenResult;
            if (childSelectorType == 'single') {
                // First matched child node would be the last matched child in the list (due to the array reversals)
                const matchedChildren = domsiNode.__domsiMatchChildren[childSelectorIID];
                const childNode = matchedChildren[matchedChildren.length - 1];
                childrenResult = domsiNodeToDomsiElement(childNode, childSelector);
            } else if (childSelectorType == 'multiple') {
                const matchedChildren = domsiNode.__domsiMatchChildren[childSelectorIID];
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
                children = Object.assign({}, childrenResult.children, children);
            }
        }
    }

    const domsiElement = {
        htmlElement: domsiNode.element,
        children: children
    };
    return domsiElement;
}

function isDomsiMatch(domsiNode: any, domsiSelector: any) {
    const selectorIID = domsiSelector.__iid;

    // A selected item cannot contain a child that also matches the selector
    // We only select the lowest level object
    if (domsiNode.__domsiMatchChildren[selectorIID].length > 0) {
        return false;
    }

    if (!isDomsiChildrenMatch(domsiNode, domsiSelector)) {
        return false;
    }

    // Make sure attributes/props/css style/text matches the selector
    if (!isDomsiElemMatch(domsiNode.element, domsiSelector)) {
        return false;
    }

    return true;
}

function buildDomsiTree(element: any, parent?: any) {
    const treeNode = {
        element: element,
        parent: parent
    } as any;
    const children = [];
    for (const childElem of element.childNodes) {
        children.push(buildDomsiTree(childElem, treeNode));
    }
    treeNode.children = children;
    return treeNode;
}

function updateDomsiNodeMatch(selector: any, node: any) {
    // Remember that the current node matches
    node.__isDomsiMatch[selector.__iid] = true;

    let curParent = node.parent;
    while (curParent) {
        // Update all ancestors of child match
        curParent.__domsiMatchChildren[selector.__iid].push(node);

        // // Update all ancestors not to use the node's sub-matches
        // curParent.__domsiMatchChildren = subtractDomsiMatchChildren(
        //     curParent.__domsiMatchChildren,
        //     node.__domsiMatchChildren,
        // )
        
        // Next parent
        curParent = curParent.parent;
    }
}

function isDomsiChildrenMatch(domsiNode: any, domsiSelector: any) {
    if (!domsiSelector.children) {
        return true;
    }
    for (const childSelector of Object.values(domsiSelector.children) as any[]) {
        const childSelectorType = childSelector.type;
        const childSelectorIID = childSelector.selector.__iid;

        const childCount = domsiNode.__domsiMatchChildren[childSelectorIID].length;
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

function isDomsiElemMatch(elem: any, domsiSelector: any) {
    if (domsiSelector.tagName && !isTagNameMatch(elem, domsiSelector.tagName)) {
        return false;
    } else if (domsiSelector.attribute && !isAttributeMatch(elem, domsiSelector.attribute)) {
        return false;
    } else if (domsiSelector.computedAttribute && !isComputedAttributeMatch(elem, domsiSelector.computedAttribute)) {
        return false;
    } else if (domsiSelector.property && !isPropertyMatch(elem, domsiSelector.property)) {
        return false;
    } else if (domsiSelector.css && !isCssMatch(elem, domsiSelector.css)) {
        return false;
    } else if (domsiSelector.text && !isTextMatch(elem, domsiSelector.text)) {
        return false;
    }
    return true;
}

function isTagNameMatch(elem: any, tagNameSelector: any) {
    return isValueMatch((elem.tagName || '').toLowerCase(), tagNameSelector);
}

function isAttributeMatch(elem: any, attributeSelector: any) {
    if (!elem.getAttribute) {
        return false;
    }
    for (const [attributeName, valueSelector] of Object.entries(attributeSelector)) {
        if (!isValueMatch(elem.getAttribute(attributeName), valueSelector)) {
            return false;
        }
    }
    return true;
}

function isComputedAttributeMatch(elem: any, attributeSelector: any) {
    for (const [attributeName, valueSelector] of Object.entries(attributeSelector)) {
        if (!isValueMatch(elem[attributeName], valueSelector)) {
            return false;
        }
    }
    return true;
}

function isPropertyMatch(elem: any, propertySelector: any) {
    for (const [propertyName, valueSelector] of Object.entries(propertySelector)) {
        if (!isValueMatch(elem[propertyName], valueSelector)) {
            return false;
        }
    }
    return true;
}

function isCssMatch(elem: any, cssSelector: any) {
    if (elem.nodeType != Node.ELEMENT_NODE) {
        return false;
    }
    const elemStyles = getComputedStyle(elem);
    for (const [cssName, valueSelector] of Object.entries(cssSelector)) {
        if (cssName == 'color' || cssName.endsWith('-color')) {
            if (!isColorValueSelectorMatch(elemStyles[cssName], valueSelector)) {
                return false;
            }
        } else if (!isValueMatch(elemStyles[cssName], valueSelector)) {
            return false;
        }
    }
    return true;
}

function isTextMatch(elem: any, textSelector: any) {
    return isValueMatch(elem.innerText, textSelector);
}

function isValueMatch(value: any, valueSelector: any): boolean {
    if (typeof valueSelector == 'number' || typeof valueSelector == 'string') {
        return value == valueSelector;
    }
    if (valueSelector.type == 'undefined') {
        return value == undefined;
    }
    if (valueSelector.type == 'null') {
        return value == null;
    }
    if (valueSelector.type == 'regex') {
        // valueSelector.flags can be left as undefined
        return new RegExp(valueSelector.regex, valueSelector.flags).test(value);
    }
    if (valueSelector.type == 'compare') {
        const operator = valueSelector.operator;
        const comparedValue = valueSelector.value;
        if (operator == '==') {
            return value = comparedValue;
        } else if (operator == '!=') {
            return value != comparedValue;
        } else if (operator == '===') {
            return value === comparedValue;
        } else if (operator == '!==') {
            return value !== comparedValue;
        } else if (operator == '>') {
            return value > comparedValue;
        } else if (operator == '>=') {
            return value >= comparedValue;
        } else if (operator == '<') {
            return value < comparedValue;
        } else if (operator == '<=') {
            return value <= comparedValue;
        }
        return false;
    }
    if (valueSelector.type == 'and') {
        for (const operand of valueSelector.operands) {
            if (!isValueMatch(value, operand)) {
                return false;
            }
        }
        return true;
    }
    if (valueSelector.type == 'or') {
        for (const operand of valueSelector.operands) {
            if (isValueMatch(value, operand)) {
                return true;
            }
        }
        return false;
    }
    if (valueSelector.type == 'not') {
        return !isValueMatch(value, valueSelector.operand);
    }
    return false;
}

function isColorValueSelectorMatch(value: any, valueSelector: any) {
    if (typeof valueSelector == 'number' || typeof valueSelector == 'string') {
        return isColorValueMatch(value, valueSelector);
    }
    if (valueSelector.type == 'undefined') {
        return value == undefined;
    }
    if (valueSelector.type == 'null') {
        return value == null;
    }
    if (valueSelector.type == 'regex') {
        // valueSelector.flags can be left as undefined
        return new RegExp(valueSelector.regex, valueSelector.flags).test(value);
    }
    if (valueSelector.type == 'and') {
        for (const operand of valueSelector.operands) {
            if (!isColorValueMatch(value, operand)) {
                return false;
            }
        }
        return true;
    }
    if (valueSelector.type == 'or') {
        for (const operand of valueSelector.operands) {
            if (isColorValueMatch(value, operand)) {
                return true;
            }
        }
        return false;
    }
    if (valueSelector.type == 'not') {
        return !isColorValueMatch(value, valueSelector.operand);
    }
    return false;
}

function isColorValueMatch(value1: any, value2: any) {
    value1 = colorValues(value1);
    value2 = colorValues(value2);
    return value1[0] == value2[0]
        && value1[1] == value2[1]
        && value1[2] == value2[2]
        && Math.abs(value1[3] - value2[3]) < 0.01;
}

// Color compare script from: https://gist.github.com/oriadam/396a4beaaad465ca921618f2f2444d49
// return array of [r,g,b,a] from any valid color. if failed returns undefined
const colorValuesCache = {};
function colorValues(color: any) {
    if (!color) {
        return;
    }
    if (color.toLowerCase() === 'transparent') {
        return [0, 0, 0, 0];
    }
    if (colorValuesCache[color]) {
        return colorValuesCache[color];
    }
    const initialColor = color;
    let result = undefined;
    if (color[0] === '#') {
        if (color.length < 7) {
            // convert #RGB and #RGBA to #RRGGBB and #RRGGBBAA
            color = '#' + color[1] + color[1] + color[2] + color[2] + color[3] + color[3] + (color.length > 4 ? color[4] + color[4] : '');
        }
        result = [
            parseInt(color.substr(1, 2), 16),
            parseInt(color.substr(3, 2), 16),
            parseInt(color.substr(5, 2), 16),
            color.length > 7 ? parseInt(color.substr(7, 2), 16) / 255 : 1
        ];
    }
    if (!result) {
        if (color.indexOf('rgb') === -1) {
            // convert named colors
            const temp_elem = document.body.appendChild(document.createElement('akflkwqhfelaksfkahsdfhaofihxqwomfhqowih')); // intentionally use unknown tag to lower chances of css rule override with !important
            const flag = 'rgb(1, 2, 3)'; // this flag tested on chrome 59, ff 53, ie9, ie10, ie11, edge 14
            temp_elem.style.color = flag;
            if (temp_elem.style.color !== flag) {
                return; // color set failed - some monstrous css rule is probably taking over the color of our object
            }
            temp_elem.style.color = color;
            if (temp_elem.style.color === flag || temp_elem.style.color === '') {
                return; // color parse failed
            }
            color = getComputedStyle(temp_elem).color;
            document.body.removeChild(temp_elem);
        }
        if (color.indexOf('rgb') === 0) {
            if (color.indexOf('rgba') === -1) {
                color += ',1'; // convert 'rgb(R,G,B)' to 'rgb(R,G,B)A' which looks awful but will pass the regxep below
            }
            result = color.match(/[.\d]+/g).map(function(a: any) {
                return +a;
            });
        }
    }
    colorValuesCache[initialColor] = result;
    return result;
}

function reversed(arr: any) {
    return [...arr].reverse();
}

module.exports.find = domsiFind;
module.exports.findAll = domsiFindAll;