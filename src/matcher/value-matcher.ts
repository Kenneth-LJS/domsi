import { DomsiValue, DomsiValueSelector } from '../types/selectors/value-selector';

export function isValueMatch(value: DomsiValue, valueSelector: DomsiValueSelector): boolean {
    if (typeof valueSelector == 'number' || typeof valueSelector == 'string') {
        return value == valueSelector;
    }
    if (valueSelector.type == 'undefined') {
        return value == undefined;
    }
    if (valueSelector.type == 'null') {
        return value == null;
    }
    if (valueSelector.type == 'regex') {
        // valueSelector.flags can be left as undefined
        return new RegExp(valueSelector.regex, valueSelector.flags).test(value.toString());
    }
    if (valueSelector.type == 'compare') {
        const operator = valueSelector.operator;
        const comparedValue = valueSelector.value;
        if (operator == '==') {
            return value == comparedValue;
        } else if (operator == '!=') {
            return value != comparedValue;
        } else if (operator == '===') {
            return value === comparedValue;
        } else if (operator == '!==') {
            return value !== comparedValue;
        } else if (operator == '>') {
            return value > comparedValue;
        } else if (operator == '>=') {
            return value >= comparedValue;
        } else if (operator == '<') {
            return value < comparedValue;
        } else if (operator == '<=') {
            return value <= comparedValue;
        }
        return false;
    }
    if (valueSelector.type == 'and') {
        for (const operand of valueSelector.operands) {
            if (!isValueMatch(value, operand)) {
                return false;
            }
        }
        return true;
    }
    if (valueSelector.type == 'or') {
        for (const operand of valueSelector.operands) {
            if (isValueMatch(value, operand)) {
                return true;
            }
        }
        return false;
    }
    if (valueSelector.type == 'not') {
        return !isValueMatch(value, valueSelector.operand);
    }
    return false;
}