
export type ValidatorError
    = ValidatorInvalidPrimitiveTypeError;

export interface ValidatorInvalidPrimitiveTypeError extends BaseValidatorError {
    type: 'Invalid Primitive Type';
}

export interface BaseValidatorError {
    type: string;
    path: string[];
    message: string;
}