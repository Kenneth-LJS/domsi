import { DomsiAbstractValueSelector, DomsiBinaryBooleanValueSelector, DomsiCompareValueEqualitySelector, DomsiCompareValueOrderingSelector, DomsiCompareValueSelector, DomsiUnaryBooleanValueSelector } from "../types/selectors/abstract-value-selector";
import { SelectorValidator, Validator } from '../types/validator/selector-validator';
import { getInvalidKeys, hasOwnProperty } from './object';
import { AllPrimitiveNames, NonPrimitive } from '../types/primitive';
import { DomsiUndefinedValueSelectorValidator, DomsiNullValueSelectorValidator, DomsiRegexValueSelectorValidator } from '../validator/selector-validator';

// Overload function definition
export function makeValidator<T>(
    selectorName: string,
    isValidValue: ((value: any) => boolean) | undefined,
    validValueNames: string[],
): SelectorValidator<T>;

// Overload function definition
export function makeValidator<T>(
    selectorName: string,
    isValidValue: ((value: any) => boolean) | undefined,
    validValueNames: string[],
    validFields: (Extract<keyof T, string>)[] | undefined,
    getFieldValidator: (field: Extract<keyof T, string>) => SelectorValidator<any>
): SelectorValidator<T>;

export function makeValidator<T>(
    selectorName: string,
    isValidValue: ((value: any) => boolean) | undefined,
    validValueNames: string[],
    validFields?: (Extract<keyof T, string>)[],
    getFieldValidator?: (field: Extract<keyof T, string>) => SelectorValidator<any>
): SelectorValidator<T> {
    return {
        selectorName: selectorName,
        validate: makeValidatorFunction(
            isValidValue,
            validValueNames,
            validFields,
            getFieldValidator,
        ),
    }
}

// Overload definition
export function makeConstantValidator<T>(selectorName: string, validConstants: T[]): SelectorValidator<T>;
export function makeConstantValidator<T>(selectorName: string, validConstants: T[], allowUndefined: false): SelectorValidator<T>;
export function makeConstantValidator<T>(selectorName: string, validConstants: T[], allowUndefined: true): SelectorValidator<T | undefined>;
export function makeConstantValidator<T>(selectorName: string, validConstants: T[], allowUndefined: boolean = false): SelectorValidator<T | undefined> {
    const validConstantsAsSet = new Set(validConstants) as Set<T | undefined>;
    const validValueNames = [];
    if (allowUndefined) { validConstantsAsSet.add(undefined); validValueNames.push('undefined'); }
    validValueNames.push(...validConstants.map(v => JSON.stringify(v)));
    return {
        selectorName: selectorName,
        validate: makeValidatorFunction(
            (value: any) => validConstantsAsSet.has(value),
            validValueNames,
        )
    };
}

export function makeArrayValidator<T>(selectorName: string, baseValidator: SelectorValidator<T>): SelectorValidator<T[]> {
    const baseValidatorType = typeof baseValidator;
    let baseValidatorName = (typeof baseValidator === 'undefined' || typeof baseValidator === 'number' || typeof baseValidator === 'string')
        ? baseValidatorType
        : baseValidator.selectorName;
    return {
        selectorName: selectorName,
        validate: (selector, getValidate, emitError) => {
            if (!Array.isArray(selector)) {
                emitError({
                    type: 'Invalid type',
                    provided: typeof baseValidator,
                    expected: [`${baseValidatorName}[]`],
                });
                return;
            }
            selector.forEach((innerSelector, i) => {
                const validate = getValidate(i.toString());
                validate(innerSelector, baseValidator);
            });
        },
    }
}

export function makeCombinedValidator<T>(
    selectorName: string,
    isValidPrimitive: (value: any) => boolean,
    validValueNames: string[],
    fieldName: Extract<keyof NonPrimitive<T>, string>,
    validators: { [fieldValue: string]: SelectorValidator<T> }
): SelectorValidator<T> {
    const expectedTypes = [...validValueNames, selectorName];
    return {
        selectorName: selectorName,
        validate: (selector, getValidate, emitError) => {
            if (isValidPrimitive(selector)) {
                return;
            }
            if (AllPrimitiveNames.has(typeof selector)) {
                emitError({
                    type: 'Invalid type',
                    provided: typeof selector,
                    expected: expectedTypes,
                });
                return;
            }
            if (selector === null) {
                emitError({
                    type: 'Invalid type',
                    provided: 'null',
                    expected: expectedTypes,
                });
                return;
            }
            if (!hasOwnProperty(selector, fieldName)) {
                emitError({
                    type: 'Missing field',
                    expected: fieldName,
                });
                return;
            }
            const fieldValue = (selector as NonPrimitive<T>)[fieldName] as unknown as string;
            getValidate()(selector, validators[fieldValue]);
        },
    }
}

export function makeValidatorFunction<T>(
    isValidValue: ((value: any) => boolean) | undefined,
    validValueNames: string[],
    validFields?: (Extract<keyof T, string>)[],
    getFieldValidator?: (field: Extract<keyof T, string>) => SelectorValidator<any>
): Validator<T> {
    return (selector: T, getValidate, emitError) => {
        if (isValidValue && isValidValue(selector)) {
            return;
        }
        if (typeof selector === 'undefined') {
            emitError({
                type: 'Invalid type',
                provided: 'undefined',
                expected: validValueNames,
            });
            return;
        }
        if (selector === null) {
            emitError({
                type: 'Invalid type',
                provided: 'null',
                expected: validValueNames,
            });
            return;
        }
        if (!validFields) {
            return;
        }
        const invalidFields = getInvalidKeys(selector, validFields);
        invalidFields.forEach(invalidField => {
            emitError({
                type: 'Invalid field',
                provided: invalidField,
                expected: validFields,
            });
        });
        validFields.forEach(validField => {
            const fieldValidate = getValidate(validField);
            const fieldValidator = getFieldValidator ? getFieldValidator(validField) : undefined;
            fieldValidate(selector[validField as keyof T], fieldValidator);
        });
    };
}

export function makeFieldValidatorFunction<T extends { [fieldName: string]: SelectorValidator<any> }>(fieldMap: T): (field: keyof T) => SelectorValidator<any> {
    return (field: keyof T) => fieldMap[field];
}

export function makeValueSelectorValidator<T>(
    valueSelectorName: string,
    isValidValue: (value: any) => boolean,
    validValueNames: string[]
): SelectorValidator<DomsiAbstractValueSelector<T>> {
    const valueValidator = {} as SelectorValidator<DomsiAbstractValueSelector<T>>;

    const CompareEqualityValidator = makeValidator(
        `${valueSelectorName}CompareEqualityValueSelector`,
        () => false,
        ['Object'],
        ['type', 'operator', 'value'],
        makeFieldValidatorFunction({
            type: 'compare',
            operator: makeConstantValidator('Equality operator', ['==', '!=', '===', '!==']),
            value: valueValidator,
        }),
    ) as SelectorValidator<DomsiCompareValueEqualitySelector<T>>;

    const CompareOrderValidator = makeValidator(
        `${valueSelectorName}CompareOrderValueSelector`,
        () => false,
        ['Object'],
        ['type', 'operator', 'value'],
        makeFieldValidatorFunction({
            type: 'compare',
            operator: makeConstantValidator('Equality operator', ['>', '>=', '<', '<=']),
            value: valueValidator,
        }),
    ) as SelectorValidator<DomsiCompareValueOrderingSelector<T>>;

    const UnaryBooleanValidator = makeValidator( //todo
        `${valueSelectorName}CompareOrderValueSelector`,
        () => false,
        ['Object'],
        ['type', 'operand'],
        makeFieldValidatorFunction({
            type: 'not',
            operand: valueValidator,
        }),
    ) as SelectorValidator<DomsiUnaryBooleanValueSelector<T>>;

    const BinaryBooleanValidator = makeValidator( //todo
        `${valueSelectorName}CompareOrderValueSelector`,
        () => false,
        ['Object'],
        ['type', 'operands'],
        makeFieldValidatorFunction({
            type: 'not',
            operands: valueValidator,
        }),
    ) as SelectorValidator<DomsiBinaryBooleanValueSelector<T>>;

    const selectorName = `${valueSelectorName}ValueSelector`;
    Object.assign(
        valueValidator,
        makeCombinedValidator(
            selectorName,
            isValidValue,
            validValueNames,
            'type' as keyof NonPrimitive<DomsiAbstractValueSelector<T>>,
            {
                undefined: DomsiUndefinedValueSelectorValidator,
                null: DomsiNullValueSelectorValidator,
                compare: makeCombinedValidator(
                    selectorName,
                    () => false,
                    [],
                    'operator',
                    {
                        '==': CompareEqualityValidator,
                        '!=': CompareEqualityValidator,
                        '===': CompareEqualityValidator,
                        '!==': CompareEqualityValidator,
                        '>': CompareOrderValidator,
                        '>=': CompareOrderValidator,
                        '<': CompareOrderValidator,
                        '<=': CompareOrderValidator,
                    } as { [fieldValue: string]: SelectorValidator<DomsiCompareValueSelector<T>> },
                ),
                regex: DomsiRegexValueSelectorValidator,
                and: BinaryBooleanValidator,
                or: BinaryBooleanValidator,
                not: UnaryBooleanValidator,
            } as { [fieldValue: string]: SelectorValidator<DomsiAbstractValueSelector<T>> }
        )
    )

    return valueValidator;
}