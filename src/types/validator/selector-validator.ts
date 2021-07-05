import { BaseValidatorError, ValidatorError } from "./validator-errors";

export type SelectorValidator<T>
    = undefined
    | string
    | number
    | ComplexSelectorValidator<T>;

export interface ComplexSelectorValidator<T> {
    selectorName: string;
    validate: Validator<T>;
}

export type Validator<T> = (
    selector: T,
    getValidate: ValidateFunctionGetter<any>,
    emitError: (error: BaseValidatorError) => void,
) => void;

export type ValidateFunctionGetter<T> = (field?: string) => ValidateFunction<T>;

export type ValidateFunction<T> = (
    selector: T,
    validator: SelectorValidator<T>,
) => void;
