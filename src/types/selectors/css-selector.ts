import { CssColorPropertyNames, UnwantedCssPropertyNames } from '../../constants/css-selector';
import { DomsiAbstractValueSelector } from './abstract-value-selector';
import { DomsiValueSelector } from './value-selector';

export type DomsiCssRegularValue = undefined | string;
export type DomsiCssColorValue = undefined | string; // if you're gungho, you can define a color-only string TypeScript selector

export type CssPropertyNames = Exclude<keyof CSSStyleDeclaration, number| keyof UnwantedCssPropertyNames>;
export type CSSRegularPropertyNames = Exclude<CssPropertyNames, CssColorPropertyNames>;

export type DomsiCssSelector = undefined | DomsiComplexCssSelector;
export type DomsiComplexCssSelector = {
    [name in keyof CSSRegularPropertyNames]?: DomsiCssValueSelector; } & {
    [name in keyof CssColorPropertyNames]?: DomsiCssColorValueSelector;
};

export type DomsiCssValueSelector = DomsiValueSelector;
export type DomsiCssColorValueSelector = DomsiAbstractValueSelector<DomsiCssColorValue> | {
    type: 'color';
    color: DomsiCssColorValue;
};

