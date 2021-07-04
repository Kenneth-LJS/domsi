export type DomsiAbstractValueSelector<T>
    = T
    | DomsiUndefinedValueSelector
    | DomsiNullValueSelector
    | DomsiCompareValueSelector<T>
    | DomsiRegexValueSelector
    | DomsiBinaryBooleanValueSelector<T>
    | DomsiNotValueSelector<T>;

export interface DomsiUndefinedValueSelector {
    type: 'undefined';
}

export interface DomsiNullValueSelector {
    type: 'null';
}

export type DomsiCompareValueSelector<T>
    = DomsiCompareValueEqualitySelector<T>
    | DomsiCompareValueOrderingSelector<T>;

export interface DomsiCompareValueEqualitySelector<T> {
    type: 'compare';
    operator: '==' | '!=' | '===' | '!==';
    value: T;
}

export interface DomsiCompareValueOrderingSelector<T> {
    type: 'compare';
    operator: '>' | '>=' | '<' | '<=';
    value: Exclude<T, undefined>;
}

export interface DomsiRegexValueSelector {
    type: 'regex',
    regex: string | RegExp;
    flags?: string; // works even if undefined
}

export interface DomsiBinaryBooleanValueSelector<T> {
    type: 'and' | 'or';
    operands: DomsiAbstractValueSelector<T>[];
}

export interface DomsiNotValueSelector<T> {
    type: 'not';
    operand: DomsiAbstractValueSelector<T>;
}