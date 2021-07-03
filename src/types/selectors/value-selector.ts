import { DomsiAbstractValueSelector } from './abstract-value-selector';

export type DomsiValue
    = undefined
    | number
    | string;

export type DomsiValueSelector = DomsiAbstractValueSelector<DomsiValue>;
