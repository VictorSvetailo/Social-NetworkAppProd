


export type FieldValidatorType = (value: string) => string | undefined
export const required: FieldValidatorType = (value) => {
    if (value) return undefined;
    return 'field is required';
}

export const maxLengthCreator = (maxLength: number): FieldValidatorType => (value) => {
    if (value && value.length > maxLength) return `maxLength is ${maxLength} symbols`;
    return undefined;
}

// export const minLength2 = (value: any) => {
//     if (value && value.length < 2)     return 'field is required';
//     return undefined;
// }