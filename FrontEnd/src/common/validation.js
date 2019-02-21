export const minLength = min => value =>
    value && value.length < min ? `Must be ${min} characters.` : undefined;

export const maxLength = max => value =>
    value && value.length > max ? `Must be less than ${max} characters.` : undefined;

export const minLength10 = minLength(10);
export const maxLength30 = maxLength(30);
export const maxLength10 = maxLength(10);
export const maxLength100 = maxLength(100);


export const validateEmail = value => {
    return (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value));
}

export const required = value => ((typeof value !== 'undefined' && value !== null && value !== "") ? undefined : 'The field is required.');

export const number = value =>
    value && (isNaN(Number(value)) || Number(value) <= 0) ? 'The field is invalid.' : undefined;

export const alphabetsOnly = value =>
    value && /[^a-zA-Z ]/i.test(value)
        ? 'Only Alphabets allowed.'
        : undefined;

export const validatePassword = value => {
    return (value && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/i.test(value));
}
 
