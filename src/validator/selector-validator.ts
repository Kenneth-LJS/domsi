import { DomsiAttributeSelector, DomsiAttributeValueSelector } from '../types/selectors/attribute-selector';
import { DomsiChildrenSelector, DomsiChildSelector } from '../types/selectors/children-selector';
import { DomsiCssColorValueSelector, DomsiCssSelector, DomsiCssValueSelector } from '../types/selectors/css-selector';
import { DomsiPropertySelector, DomsiPropertyValueSelector } from '../types/selectors/property-selector';
import { DomsiTagNameSelector } from '../types/selectors/tag-name-selector';
import { DomsiTextSelector } from '../types/selectors/text-selector';
import { SelectorValidator, ValidateFunctionGetter } from '../types/validator/selector-validator';
import { DomsiValueSelector } from '../types/selectors/value-selector';
import { CssColorPropertyNames } from '../constants/css-selector';
import { getInvalidKeys } from '../utils/object';
import { ValidatorError } from '../types/validator/validator-errors';
import { makeArrayValidator, makeConstantValidator, makeFieldValidatorFunction, makeValidator, makeValidatorFunction, makeValueSelectorValidator } from 'src/utils/validator';
import { DomsiNodeSelector } from 'src/types/public';
import { DomsiCountSelector } from 'src/types/selectors/count-selector';



export const DomsiTagNameSelectorValidator = makeValidator(
    'NodeSelector',
    () => false,
    ['undefined', 'number', 'string'],
    ['tagName', 'attribute', 'property', 'css', 'text', 'children'], // todo, value
    (fieldName) => {
        return undefined;
    },
) as SelectorValidator<DomsiNodeSelector>;



// import { DomsiAttributeSelector, DomsiAttributeValueSelector } from '../types/selectors/attribute-selector';
// import { DomsiChildrenSelector } from '../types/selectors/children-selector';
// import { DomsiCssSelector } from '../types/selectors/css-selector';
// import { DomsiPropertySelector } from '../types/selectors/property-selector';
// import { DomsiTagNameSelector } from '../types/selectors/tag-name-selector';
// import { DomsiTextSelector } from '../types/selectors/text-selector';
// import { IDomsiNodeSelector as DomsiNodeSelector } from '../types/selectors/node-selector';
// import { SelectorValidator } from '../types/validator/selector-validator';
// import { DomsiValueSelector } from '../types/selectors/value-selector';
// import { CssColorPropertyNames } from '../constants/css-selector';

// function getDomsiNodeSelectorValidator(): SelectorValidator<DomsiNodeSelector> {
//     return {
//         name: 'DomsiNodeSelectorValidator',
//         selectorName: 'NodeSelector',
//         validFields: {
//             tagName: DomsiTagNameSelectorValidator,
//             attribute: DomsiAttributeSelectorValidator,
//             property: DomsiPropertySelectorValidator,
//             css: DomsiCssSelectorValidator,
//             text: DomsiTextSelectorValidator,
//             children: DomsiChildrenSelectorValidator,
//         },
//     } as SelectorValidator<DomsiNodeSelector>;
// }

// // Placeholder
// export const DomsiNodeSelectorValidator = {} as SelectorValidator<DomsiNodeSelector>;



// export const DomsiValueSelectorValidator = makeValueSelectorValidator(
//     'Generic',
//     (value: any) => ['undefined', 'number', 'string'].includes(typeof value),
//     ['undefined', 'number', 'string', 'GenericValueSelector'],
// ) as SelectorValidator<DomsiValueSelector>;



export const DomsiCountValueSelectorValidator = makeValueSelectorValidator(
    'Count',
    (value: any) => ['undefined', 'number'].includes(typeof value),
    ['undefined', 'number'],
) as SelectorValidator<DomsiCountSelector>;

export const DomsiAttributeValueSelectorValidator = makeValueSelectorValidator(
    'Attrribute',
    (value: any) => ['undefined', 'number', 'string'].includes(typeof value),
    ['undefined', 'number', 'string'],
) as SelectorValidator<DomsiAttributeValueSelector>;

export const DomsiAttributeSelectorValidator = makeValidator(
    'AttributeSelector',
    (v: any) => typeof v === 'undefined',
    ['undefined', 'AttributeSelector'],
    undefined,
    () => DomsiAttributeValueSelectorValidator
);

export const DomsiPropertyValueSelectorValidator = makeValueSelectorValidator(
    'Property',
    (value: any) => ['undefined', 'number', 'string'].includes(typeof value),
    ['undefined', 'number', 'string'],
) as SelectorValidator<DomsiPropertyValueSelector>;

export const DomsiPropertySelectorValidator = makeValidator(
    'PropertySelector',
    (v: any) => typeof v === 'undefined',
    ['undefined', 'PropertySelector'],
    undefined,
    () => DomsiPropertyValueSelectorValidator
);

export const DomsiCssColorValueSelectorValidator = makeValueSelectorValidator(
    'Color',
    (value: any) => ['undefined', 'string'].includes(typeof value),
    ['undefined', 'string'],
) as SelectorValidator<DomsiCssColorValueSelector>;

export const DomsiCssValueSelectorValidator = makeValueSelectorValidator(
    'CSS',
    (value: any) => ['undefined', 'number', 'string'].includes(typeof value),
    ['undefined', 'number', 'string'],
) as SelectorValidator<DomsiCssValueSelector>;

export const DomsiCssSelectorValidator = makeValidator(
    'CssSelector',
    (v: any) => typeof v === 'undefined',
    ['undefined', 'CssSelector'],
    undefined,
    (cssProperty: string) => {
        if (cssProperty.startsWith('color') || cssProperty.includes('Color')) {
            return DomsiCssColorValueSelectorValidator;
        } else {
            return DomsiCssValueSelectorValidator;
        }
    },
) as SelectorValidator<DomsiCssSelector>;

export const DomsiTextSelectorValidator = makeValueSelectorValidator(
    'Text',
    (value: any) => ['undefined', 'string'].includes(typeof value),
    ['undefined', 'string', 'Text'],
) as SelectorValidator<DomsiTextSelector>;


export const DomsiNodeSelectorValidator = {} as SelectorValidator<DomsiNodeSelector>;

export const DomsiChildSelectorValidator = makeValidator(
    'ChildSelector',
    () => false,
    ['Object'],
    ['type', 'transparent', 'count', 'selector'],
    makeFieldValidatorFunction({
        type: makeConstantValidator('ChildType', ['single', 'multiple', 'none']),
        transparent: makeConstantValidator('Transparent', [false, true], true),
        count: DomsiCountValueSelectorValidator,
        selector: DomsiNodeSelectorValidator,
    }),
) as SelectorValidator<DomsiChildSelector<DomsiNodeSelector>>;

export const DomsiChildrenSelectorValidator = makeArrayValidator(
    'ChildrenSelector',
    DomsiChildSelectorValidator,
) as SelectorValidator<DomsiChildrenSelector<DomsiNodeSelector>>;

Object.assign(
    DomsiNodeSelectorValidator,
    makeValidator(
        'NodeSelector',
        () => false,
        ['Object'],
        ['tagName', 'attribute', 'property', 'css', 'text', 'children'],
        makeFieldValidatorFunction({
            tagName: DomsiTagNameSelectorValidator,
            attribute: DomsiAttributeSelectorValidator,
            property: DomsiPropertySelectorValidator,
            css: DomsiCssSelectorValidator,
            text: DomsiTextSelectorValidator,
            children: DomsiChildrenSelectorValidator,
        }),
    ) as SelectorValidator<DomsiNodeSelector>
);