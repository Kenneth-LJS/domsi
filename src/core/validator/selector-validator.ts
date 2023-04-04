import { DomsiAttributeValueSelector } from '../../types/selectors/attribute-selector';
import { DomsiChildSelector } from '../../types/selectors/children-selector';
import { DomsiCssColorValueSelector, DomsiCssSelector, DomsiCssValueSelector } from '../../types/selectors/css-selector';
import { DomsiPropertyValueSelector } from '../../types/selectors/property-selector';
import { DomsiTextSelector } from '../../types/selectors/text-selector';
import { SelectorValidator } from '../../types/validator/selector-validator';
import { makeConstantValidator, makeFieldValidatorFunction, makeValidator, makeValueSelectorValidator } from '../utils/validator';
import { DomsiNodeSelector } from '../../types/public';
import { DomsiCountSelector } from '../../types/selectors/count-selector';
import { DomsiTagNameSelector } from '../../types/selectors/tag-name-selector';
import { DomsiUndefinedValueSelector, DomsiNullValueSelector, DomsiRegexValueSelector } from '../../types/selectors/abstract-value-selector';

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

export const DomsiTagNameSelectorValidator = makeValueSelectorValidator(
    'TagName',
    (value: any) => ['undefined', 'string'].includes(typeof value),
    ['undefined', 'string'],
) as SelectorValidator<DomsiTagNameSelector>;

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

export const { DomsiNodeSelectorValidator, DomsiChildSelectorValidator, DomsiChildrenSelectorValidator } = (() => {
    // Initialize in function to resolve circular dependency, while preserving side effects

    const DomsiNodeSelectorValidator = {} as SelectorValidator<DomsiNodeSelector>;

    const DomsiChildSelectorValidator = makeValidator(
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

    const DomsiChildrenSelectorValidator = makeValidator(
        'ChildrenSelector',
        (v: any) => typeof v === 'undefined',
        ['undefined', 'ChildrenSelector'],
        undefined,
        () => DomsiChildSelectorValidator,
    ) as SelectorValidator<DomsiCssSelector>;

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

    return {
        DomsiNodeSelectorValidator,
        DomsiChildSelectorValidator,
        DomsiChildrenSelectorValidator
    };
})();
