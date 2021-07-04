import { PrimitiveName, NonPrimitive } from "../primitive";

export type SelectorValidator<T> = undefined | ComplexSelectorValidator<T>;

export interface ComplexSelectorValidator<T> {
    name: string;
    selectorName: string;
    validPrimitives?: PrimitiveName<T>[];
    validFields?: SelectorFieldValidator<T>;
}

export type SelectorFieldValidator<T> = {
    [Property in keyof NonPrimitive<T>]: SelectorValidator<NonPrimitive<T>[Property]>;
}

export interface SelectorValidatorContext {
    [field: string]: any;
}