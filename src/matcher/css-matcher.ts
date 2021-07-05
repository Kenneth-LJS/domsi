import { LOAD_RGB_CONVERTER } from '@env';

import { CssPropertyNames, CSSStyleLike, DomsiCssColorValue, DomsiCssColorValueSelector, DomsiCssSelector } from '../types/selectors/css-selector';
import { isValueMatch } from './value-matcher';
import { CssColorPropertyNames, CssShorthandExpanders } from '../constants/css-selector';
import { HTMLNode } from '../types/html-node';
import { hasOwnProperty } from '../utils/object';
import { DomsiValue } from '../types/selectors/value-selector';
import rgba from 'color-rgba';

export function isCssMatch(node: HTMLNode, cssSelector: DomsiCssSelector): boolean {
    if (typeof cssSelector === 'undefined') {
        return true;
    }
    if (!(node instanceof Element)) {
        return false;
    }
    const elemStyles = getComputedStyle(node);
    for (const [cssPropertyName, valueSelector] of Object.entries(cssSelector)) {
        if ((<any>Object).values(CssColorPropertyNames).includes(cssPropertyName)) {
            // Color property
            if (!isColorValueSelectorMatch(elemStyles[cssPropertyName as CssPropertyNames] as DomsiCssColorValue, valueSelector)) {
                return false;
            }
        } else if (!isValueMatch(elemStyles[cssPropertyName as CssPropertyNames] as DomsiValue, valueSelector)) {
            return false;
        }
    }
    return true;
}

function isColorValueSelectorMatch(value: DomsiCssColorValue, valueSelector: DomsiCssColorValueSelector): boolean {
    if (typeof valueSelector == 'undefined') {
        return true;
    }
    if (typeof value == 'undefined') {
        return false;
    }
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

export function isColorValueMatch(value1: Exclude<DomsiCssColorValue, undefined>, value2: Exclude<DomsiCssColorValue, undefined>): boolean {
    if (LOAD_RGB_CONVERTER) {
        const value1Arr = rgba(value1);
        const value2Arr = rgba(value2);
        if (typeof value1Arr === 'undefined') {
            return typeof value2Arr === 'undefined';
        } else if (typeof value2Arr === 'undefined') {
            return false;
        }
        return value1Arr[0] == value2Arr[0]
            && value1Arr[1] == value2Arr[1]
            && value1Arr[2] == value2Arr[2]
            && Math.abs(value1Arr[3] - value2Arr[3]) < 0.01;
    } else {
        const colorTestElem = document.createElement('div');
        colorTestElem.style.color = value1;
        const parsedValue1 = colorTestElem.style.color;
        colorTestElem.style.color = value2;
        const parsedValue2 = colorTestElem.style.color;
        return parsedValue1 == parsedValue2;
    }
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
            const expanded = expander.expand(propertyName, cssSelector[propertyName as keyof DomsiCssSelector] as string);
            const normalizedExpanded = normalizeCssPropertyMapNames(expanded);
            Object.assign(expandedCssSelector, normalizedExpanded);
        });
    });

    return Object.assign({}, expandCssSelector, cssSelector);
}

function normalizeCssPropertyMapNames(cssPropertyMap: {}): CSSStyleLike {
    const output = {} as CSSStyleLike;
    Object.keys(cssPropertyMap).forEach(property => {
        const normalizedProperty = cssPropertyNameToCamelCase(property) as keyof CssPropertyNames;
        // @ts-expect-error
        output[normalizedProperty] = cssPropertyMap[property];
    });
    return output;
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