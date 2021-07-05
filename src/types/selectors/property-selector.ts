import { DomsiValueSelector } from './value-selector';

export type DomsiPropertySelector = undefined | DomsiComplexPropertySelector;

export type DomsiPropertyNames = 

export interface DomsiComplexPropertySelector {
    [propertyName: string]: DomsiPropertyValueSelector;
}

export type DomsiPropertyValueSelector = DomsiValueSelector;