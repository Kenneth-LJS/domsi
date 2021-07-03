import { DomsiCssColorValue, DomsiCssColorValueSelector, DomsiCssSelector } from '../types/selectors/css-selector';
import { isValueMatch } from './value-matcher';
import { CssColorPropertyNames, CssShorthandExpanders } from '../constants/css-selector';

import rgba from 'color-rgba';
import { DomsiHTMLNode } from '../types/public';
import { hasOwnProperty } from '../utils/object';

export function isCssMatch(nodeElem: DomsiHTMLNode, cssSelector: DomsiCssSelector): boolean {
    if (typeof cssSelector === 'undefined') {
        return true;
    }
    if (!(nodeElem instanceof Element)) {
        return false;
    }
    const elemStyles = getComputedStyle(nodeElem);
    for (const [cssPropertyName, valueSelector] of Object.entries(cssSelector)) {
        if ((<any>Object).values(CssColorPropertyNames).includes(cssPropertyName)) {
            // Color property
            if (!isColorValueSelectorMatch(elemStyles[cssPropertyName], valueSelector)) {
                return false;
            }
        } else if (!isValueMatch(elemStyles[cssPropertyName], valueSelector)) {
            return false;
        }
    }
    return true;
}

function isColorValueSelectorMatch(value: string, valueSelector: DomsiCssColorValueSelector): boolean {
    if (typeof valueSelector == 'number') {
        return false;
    }
    if (typeof valueSelector == 'string') {
        return isColorValueMatch(value, valueSelector);
    }
    if (valueSelector.type == 'undefined') {
        return value == undefined;
    }
    if (valueSelector.type == 'null') {
        return value == null;
    }
    if (valueSelector.type == 'regex') {
        return new RegExp(valueSelector.regex, valueSelector.flags).test(value);
    }
    if (valueSelector.type == 'and') {
        for (const operand of valueSelector.operands) {
            if (!isColorValueSelectorMatch(value, operand)) {
                return false;
            }
        }
        return true;
    }
    if (valueSelector.type == 'or') {
        for (const operand of valueSelector.operands) {
            if (isColorValueSelectorMatch(value, operand)) {
                return true;
            }
        }
        return false;
    }
    if (valueSelector.type == 'not') {
        return !isColorValueSelectorMatch(value, valueSelector.operand);
    }
    return false;
}

function isColorValueMatch(value1: DomsiCssColorValue, value2: DomsiCssColorValue) {
    const value1Arr = rgba(value1);
    const value2Arr = rgba(value2);
    return value1Arr[0] == value2Arr[0]
        && value1Arr[1] == value2Arr[1]
        && value1Arr[2] == value2Arr[2]
        && Math.abs(value1Arr[3] - value2Arr[3]) < 0.01;
}

export function expandCssSelector(cssSelector: DomsiCssSelector) {
    if (typeof cssSelector === 'undefined') { 
        return cssSelector;
    }

    const expandedCssSelector = {};
    Object.values(CssShorthandExpanders).forEach(expander => {
        expander.supportedProperties.forEach(propertyName => {
            if (!hasOwnProperty(cssSelector, propertyName)) {
                return;
            }
            const expanded = expander.expand(propertyName, cssSelector[propertyName]);
            const normalizedExpanded = normalizeCssPropertyMapNames(expanded);
            Object.assign(expandedCssSelector, normalizedExpanded);
        });
    });

    return Object.assign({}, expandCssSelector, cssSelector);
}

function normalizeCssPropertyMapNames(cssPropertyMap: { [name: string]: any }): { [name: string]: any } {
    const output = {};
    Object.keys(cssPropertyMap).forEach(property => {
        const normalizedProperty = cssPropertyNameToCamelCase(property);
        output[normalizedProperty] = cssPropertyMap[property];
    });
    return output;1;
}

function cssPropertyNameToCamelCase(cssPropertyName: string): string {
    return cssPropertyName
    .toLowerCase()
    .split('-')
    .map((segment, i) => i === 0
        ? segment
        : segment.slice(0, 1).toUpperCase() + segment.slice(1)
    )
    .join('');
}