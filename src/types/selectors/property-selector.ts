import { DomsiValueSelector } from './value-selector';

export type DomsiPropertySelector = undefined | DomsiComplexPropertySelector;

export interface DomsiComplexPropertySelector {
    [propertyName: string]: DomsiPropertyValueSelector;
}

export type DomsiPropertyValueSelector = DomsiValueSelector;