import { ROOT_NODE_NAME } from '../constants/domsi';
import { SelectorValidator, ComplexSelectorValidator } from '../types/validator/selector-validator';
import { BaseValidatorError } from '../types/validator/validator-errors';

export function validate<T>(selector: any, validator: SelectorValidator<T>): BaseValidatorError[] {
    const errors = [] as BaseValidatorError[];
    validateHelper(selector, validator, errors, [ROOT_NODE_NAME]);
    return errors;
}

export function validateHelper<T extends any>(selector: any, validator: SelectorValidator<T> | undefined, errors: BaseValidatorError[], path: (string | number)[]): void {
    if (typeof validator === 'undefined') {
        return;
    } else if (typeof validator === 'number' || typeof validator === 'string') {
        if (selector !== validator) {
            errors.push({
                type: 'Invalid constant',
                provided: selector,
                expected: validator,
            });
        }
        return;
    }
    function getValidator(field?: string | number) {
        const nextPath = field ? [...path, field] : path;
        function innerValidate<U>(selector: U, validator: SelectorValidator<U> | undefined) {
            return validateHelper(selector, validator, errors, nextPath);
        };
        return innerValidate;
    }
    function emitError(error: BaseValidatorError) {
        const errorWithPath = Object.assign(
            {},
            error,
            {
                selectorName: (validator as ComplexSelectorValidator<T>).selectorName,
                path: path,
            }
        );
        errors.push(errorWithPath);
    }
    validator.validate(selector, getValidator, emitError);
}