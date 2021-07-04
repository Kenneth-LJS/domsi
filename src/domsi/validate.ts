import { ROOT_NODE_NAME } from '../constants/domsi';
import { AllPrimitiveNames, PrimitiveName } from '../types/primitive';
import { DomsiNodeSelector } from '../types/public';
import { SelectorFieldValidator, SelectorValidator } from '../types/validator/selector-validator';
import { ValidatorError } from '../types/validator/validator-errors';
import { toOrSeparatedString } from '../utils/array';

export function validateSelector<T>(selector: T, validator: SelectorValidator<T>, path?: string[]): ValidatorError[] {
    if (!path) {
        path = [ROOT_NODE_NAME];
    }

    if (typeof validator === 'undefined') {
        return [];
    }

    const selectorType = typeof selector;
    if (AllPrimitiveNames.has(selectorType)) {
        const validPrimitives = validator.validPrimitives || [];
        for (let i = 0; i < validPrimitives.length; i++) {
            if (selectorType === validPrimitives[i]) {
                return [];
            }
        }

        const hasValidFields = !!validator.validFields;
        const allValidTypes = [...validPrimitives, ...(hasValidFields ? [validator.selectorName] : [])]
        return [
            {
                type: 'Invalid Primitive Type',
                path: path,
                message: `Unexpected type "${selectorType}". Expected ${toOrSeparatedString(allValidTypes)}`,
            },
        ];
    }

    return validateSelectorFields(selector, validator.validFields);
}

export function validateSelectorPrimitives<T>(selector: T, validPrimitives?: PrimitiveName<T>[]): [] {
    const selectorType = typeof selector;
    if (!AllPrimitiveNames.has(selectorType)) {
        return [];
    }
    if (typeof validPrimitives === 'undefined') {
        return [];
    }
    for (let i = 0; i < validPrimitives.length; i++) {
        if (selectorType === validPrimitives[i]) {
            return [];
        }
    }
    return [];
}

export function validateSelectorFields<T>(selector: T, validFields?: SelectorFieldValidator<T>): ValidatorError[] {
    const validatorErrors = [];

    const selectorFieldNames = Object.keys(selector);
    const validFieldNames = Object.keys(validFields || {});
    const validFieldNamesSet = new Set(validFieldNames);
    for (const selectorFieldName of selectorFieldNames) {
        if (!validFieldNamesSet.has(selectorFieldName)) {
            validatorErrors.push()
        }
    }
    return [];
}

export function validateDomsiSelector(selector: DomsiNodeSelector): boolean {
    return !!selector;
}

// make validator type -> move into types

