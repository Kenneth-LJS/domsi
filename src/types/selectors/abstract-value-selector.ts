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

export interface DomsiCompareValueSelector<T> {
    type: 'compare';
    operator: '==' | '!=' | '===' | '!==' | '>' | '>=' | '<' | '<=';
    value: T;
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