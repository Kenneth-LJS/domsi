import { DomsiValueSelector } from './value-selector';

export type DomsiAttributeValue = null | string;

export type DomsiAttributeSelector = undefined | DomsiComplexAttributeSelector;

export interface DomsiComplexAttributeSelector {
    [attributeName: string]: DomsiValueSelector;
}

export type DomsiAttributeValueSelector = DomsiValueSelector;