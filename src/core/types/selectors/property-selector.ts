import { DomsiValueSelector } from './value-selector';

export type DomsiPropertySelector = undefined | DomsiComplexPropertySelector;

// export type DomsiPropertyNames = // todo: what is this? seems like some missing code from years ago

export interface DomsiComplexPropertySelector {
    [propertyName: string]: DomsiPropertyValueSelector;
}

export type DomsiPropertyValueSelector = DomsiValueSelector;