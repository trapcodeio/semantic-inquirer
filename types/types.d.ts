export declare type InquirerQuestionValidatorFn = (input: any) => boolean | string | Promise<boolean | string>;
export declare type AnonymousAnswer = {
    [key: string]: any;
};
export interface InputTypeExtender {
    validate?: InquirerQuestionValidatorFn;
}
export interface ListTypeExtender {
    default?: any;
    loop?: boolean;
    filter?: (input: any) => any;
}
export interface RawListTypeExtender {
    default?: number;
    loop?: boolean;
    filter?: (input: any) => any;
}
export interface CheckboxTypeExtender {
    default?: any[];
    loop?: boolean;
    filter?: (input: any) => any;
    validate?: InquirerQuestionValidatorFn;
}
