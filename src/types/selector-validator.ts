export interface SelectorValidator {
    name: string;
    validPrimitives?: string;
    validFields?: SelectorFieldValidator;
}

export interface SelectorFieldValidator {
    [field: string]: SelectorValidator;
}