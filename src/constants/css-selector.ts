import { LOAD_CSS_EXPANDER } from '@env';
import cssShorthandExpand from 'css-shorthand-expand';

export enum UnwantedCssPropertyNames {
    length = 'length',
    getPropertyPriority = 'getPropertyPriority',
    getPropertyValue = 'getPropertyValue',
    item = 'item',
    removeProperty = 'removeProperty',
    setProperty = 'setProperty',
    parentRule = 'parentRule',
}

export enum CssColorPropertyNames {
    backgroundColor = 'backgroundColor',
    borderBlockEndColor = 'borderBlockEndColor',
    borderBlockStartColor = 'borderBlockStartColor',
    borderBottomColor = 'borderBottomColor',
    borderColor = 'borderColor',
    borderInlineEndColor = 'borderInlineEndColor',
    borderInlineStartColor = 'borderInlineStartColor',
    borderLeftColor = 'borderLeftColor',
    borderRightColor = 'borderRightColor',
    borderTopColor = 'borderTopColor',
    caretColor = 'caretColor',
    color = 'color',
    columnRuleColor = 'columnRuleColor',
    floodColor = 'floodColor',
    lightingColor = 'lightingColor',
    outlineColor = 'outlineColor',
    stopColor = 'stopColor',
    textDecorationColor = 'textDecorationColor',
    textEmphasisColor = 'textEmphasisColor',
    webkitTapHighlightColor = 'webkitTapHighlightColor',
    webkitTextFillColor = 'webkitTextFillColor',
    webkitTextStrokeColor = 'webkitTextStrokeColor',
}

export const CssShorthandExpanders = (
    LOAD_CSS_EXPANDER
        ? {
            'css-shorthand-expand': {
                expand: cssShorthandExpand,
                supportedProperties: [
                    'background',
                    'font',
                    'padding',
                    'margin',
                    'border',
                    'borderWidth',
                    'borderStyle',
                    'borderColor',
                    'borderTop',
                    'borderRight',
                    'borderBottom',
                    'borderLeft',
                    'borderRadius',
                    'outline',
                ],
            },
        }
        : {}
) as { [expanderName: string]: { expand: any, supportedProperties: string[] } };