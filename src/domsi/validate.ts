import { DomsiAbstractValueSelector, DomsiNullValueSelector, DomsiRegexValueSelector, DomsiUndefinedValueSelector } from 'src/types/selectors/abstract-value-selector';
import { makeFieldValidatorFunction, makeValidator } from 'src/utils/validator';
import { ROOT_NODE_NAME } from '../constants/domsi';
import { AllPrimitiveNames, NonPrimitive } from '../types/primitive';
import { DomsiNodeSelector } from '../types/public';
import { SelectorValidator, ComplexSelectorValidator } from '../types/validator/selector-validator';
import { BaseValidatorError } from '../types/validator/validator-errors';
import { toOrSeparatedString } from '../utils/array';

export function validate<T>(selector: T, validator: SelectorValidator<T>): BaseValidatorError[] {
    const errors = [] as BaseValidatorError[];
    validateHelper(selector, validator, errors, [ROOT_NODE_NAME]);
    return errors;
}

export function validateHelper<T extends any>(selector: T, validator: SelectorValidator<T> | undefined, errors: BaseValidatorError[], path: string[]): void {
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
    function getValidator(field?: string) {
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

// export function validateSelectorPrimitives<T>(selector: T, validator: SelectorValidator<T>, path?: string[]): ValidatorError[] {
//     if (typeof validator === 'undefined') {
//         return [];
//     }
//     const selectorType = typeof selector;
//     if (!AllPrimitiveNames.has(selectorType)) {
//         return [];
//     }
//     if (!path) {
//         path = [ROOT_NODE_NAME];
//     }

//     const validPrimitives = validator.validPrimitives || [];
//     const allowComplexSelector = typeof validator.validFields !== 'undefined';

//     for (let i = 0; i < validPrimitives.length; i++) {
//         if (selectorType === validPrimitives[i]) {
//             return [];
//         }
//     }
//     const allValidTypes = [...validPrimitives, ...(allowComplexSelector ? [validator.selectorName] : [])];
//     return [
//         {
//             type: 'Invalid primitive type',
//             path: path,
//             message: `Unexpected type "${selectorType}", expected ${toOrSeparatedString(allValidTypes)}`,
//         },
//     ];
// }

// export function validateSelectorFields<T>(selector: T, validator: SelectorValidator<T>, path?: string[]): ValidatorError[] {
//     if (AllPrimitiveNames.has(typeof selector)) {
//         return [];
//     } else if (typeof validator === 'undefined') {
//         return [];
//     } else if (typeof validator.validFields === 'undefined') {
//         return [];
//     }
//     if (!path) {
//         path = [ROOT_NODE_NAME];
//     }

//     const validFields = validator.validFields;

//     const validatorErrors = [] as ValidatorError[];

//     const nonPrimitiveSelector = selector as NonPrimitive<T>;

//     const selectorFieldNames = Object.keys(nonPrimitiveSelector) as (Extract<keyof NonPrimitive<T>, string>)[];
//     const validFieldNames = Object.keys(validFields) as (keyof SelectorFieldValidator<NonPrimitive<T>>)[];
//     const validFieldNamesSet = new Set(validFieldNames);
//     for (const selectorFieldName of selectorFieldNames) {
//         const isSpecifiedField = validFieldNamesSet.has(selectorFieldName);
//         if (!validator.allowAnyField && !isSpecifiedField) {
//             validatorErrors.push(
//                 {
//                     type: 'Invalid field',
//                     path: path,
//                     message: `Unexpected field "${selectorFieldName}"`,
//                 },
//             );
//             continue;
//         }
//         const fieldSelector = nonPrimitiveSelector[selectorFieldName];
//         if (isSpecifiedField) {
//             const fieldValidator = validFields[selectorFieldName];
//             validatorErrors.push(
//                 ...validateSelector(
//                     fieldSelector,
//                     fieldValidator,
//                     [...path, validator.selectorName]
//                 )
//             );
//         } else if (validator.anyFieldValidator) {
//             validatorErrors.push(
//                 ...validateSelector(
//                     fieldSelector,
//                     validator.anyFieldValidator,
//                     [...path, validator.selectorName]
//                 )
//             );
//         }
//     }
//     return validatorErrors;
// }

// export function validateSelectorCustom<T>(selector: T, validator: SelectorValidator<T>, path?: string[]): ValidatorError[] {
//     if (typeof validator === 'undefined') {
//         return [];
//     } else if (typeof validator.validate === 'undefined') {
//         return [];
//     }
//     if (!path) {
//         path = [ROOT_NODE_NAME];
//     }
//     return validator.validate(selector, validator, path);
// }

// export function validateDomsiSelector(selector: DomsiNodeSelector): boolean {
//     return !!selector;
// }


export const DomsiUndefinedValueSelectorValidator = makeValidator(
    'UndefinedValueSelector',
    () => false,
    ['Object'],
    ['type'],
    () => 'undefined',
) as SelectorValidator<DomsiUndefinedValueSelector>;

export const DomsiNullValueSelectorValidator = makeValidator(
    'NullValueSelector',
    () => false,
    ['Object'],
    ['type'],
    () => 'null',
) as SelectorValidator<DomsiNullValueSelector>;

export const DomsiRegexValueValidator = makeValidator(
    'RegexValue',
    (value: any) => typeof value === 'string' || value instanceof RegExp,
    ['string', 'RegExp'],
) as SelectorValidator<DomsiRegexValueSelector>;

export const DomsiRegexFlagsValidator = makeValidator(
    'RegexFlags',
    () => false,
    ['undefined', 'string'],
) as SelectorValidator<DomsiRegexValueSelector>;

export const DomsiRegexValueSelectorValidator = makeValidator(
    'RegexValueSelector',
    () => false,
    ['Object'],
    ['type', 'regex', 'flags'],
    makeFieldValidatorFunction({
        type: 'regex',
        regex: DomsiRegexValueValidator,
        flags: DomsiRegexFlagsValidator,
    }),
) as SelectorValidator<DomsiRegexValueSelector>;
