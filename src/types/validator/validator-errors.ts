export type ValidatorError = BaseValidatorError & {
    selectorName: string;
    path: string[];
}

export type BaseValidatorError
    = ValidatorInvalidConstantError
    | ValidatorInvalidTypeError
    | ValidatorMissingFieldError
    | ValidatorInvalidFieldError;


export interface ValidatorInvalidConstantError extends AbstractValidatorError {
    type: 'Invalid constant';
    provided: any;
    expected: any;
}

export interface ValidatorInvalidTypeError extends AbstractValidatorError {
    type: 'Invalid type';
    provided: string;
    expected: string[];
}

export interface ValidatorMissingFieldError extends AbstractValidatorError {
    type: 'Missing field';
    expected: string;
}

export interface ValidatorInvalidFieldError extends AbstractValidatorError {
    type: 'Invalid field';
    provided: string;
    expected: string[];
}

export interface AbstractValidatorError {
    type: string;
}