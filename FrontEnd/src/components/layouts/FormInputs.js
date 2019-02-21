import React from "react";
import "./FormInput.css";

/*
@method: renderLoginTextInputField
@desc: Render login page input
*/
// export function renderLoginTextInputField(field) {
//     const { input, meta: { touched, error }, ...others } = field;
//     return (
//         <div className="input-form-group email-block">
//             <label>{field.label}</label>
//             <div className="input-group bdr-btm">
//             <input {...others} type="text" className={`form-control`} {...input} />
         
//                 <div className="input-group-prepend ">
//                     <span className="input-group-text iconSpan "><i className="fa fa-envelope loginIcon"></i></span>
//                 </div>
//             </div>
//             <div className="text-help">{(touched) ? error : ''}</div>
//         </div>
//     );
// }

export function renderTextInputField(field) {
    const { input, meta: { touched, error, active }, ...others } = field;
    const inputbox = `inputbox ${active ? 'active' : ''}`;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;
    const InputClassName = `form-control ${field.className ? field.className : ''}`;
    return (
        <div className={className}>
            <label>{field.label}{field.value}</label>
            <div className={inputbox}>
                <input maxLength={field.mxLength} {...others} type="text" className={`form-control ${InputClassName}`} {...input} />
            </div>
            <div className="text-help">{(touched) ? error : ''}</div>
        </div>
    );
}

/*
@method: renderLoginPasswordInputField
@desc: Render number type input
*/
export function renderLoginPasswordInputField(field) {
    const { input, meta: { touched, error }, ...others } = field;
    const InputClassName = `form-control ${field.className ? field.className : ''}`;
    return (
        <div className="input-form-group">
            <label>Password</label>
            <div className="input-group bdr-btm">
                <input maxLength={32} type="password" className={InputClassName} {...input} />
                <div className="input-group-prepend ">
                    <span className="input-group-text iconSpan"><i className="fa fa-lock loginIcon"></i></span>
                </div>
            </div>
            <div className="text-help">{(touched) ? error : ''}</div>
        </div>
    );
}

/*
@method: renderPasswordInputField
@desc: Render password input
*/
export function renderPasswordInputField(field) {
    const { input, meta: { touched, error, active } } = field;
    const inputbox = `inputbox ${active ? 'active' : ''}`;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;
    const InputClassName = `form-control ${field.className ? field.className : ''}`;
    return (
        <div className={className}>
            <label>{field.label}{(field.required && field.required === true) ? <span className="asterisk-required">*</span> : ''}</label>
            <div className={inputbox}>
                <input type="password" maxLength={field.mxLength} className={InputClassName} {...input} placeholder={field.placeholder} />
            </div>
            <div className="text-help">{(touched) ? error : ''}</div>
        </div>
    );
}

/*
@method: renderTextInputField
@desc: Render text input
*/
export function renderLoginTextInputField(field) {
    const { input, meta: { touched, error, active }, ...others } = field;
    const inputbox = `inputbox ${active ? 'active' : ''}`;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;
    const InputClassName = `form-control ${field.className ? field.className : ''}`;
    return (
        <div className={className}>
            <label>{field.label}{field.value}{(field.required && field.required === true) ? <span className="asterisk-required">*</span> : ''}</label>
            <div className={inputbox}>
                <input maxLength={field.mxLength} {...others} type="text" className={`form-control ${InputClassName}`} {...input} />
            </div>
            <div className="text-help">{(touched) ? error : ''}</div>
        </div>
    );
}

/*
@method: renderEmailInputField
@desc: Render email input
*/
export function renderEmailInputField(field) {
    const { input, isDisabled, meta: { touched, error, active }, ...others } = field;
    const disabled = isDisabled === true ? true : false;
    const inputbox = `inputbox ${active ? 'active' : ''}`;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;
    const InputClassName = `form-control ${field.className ? field.className : ''}`;
    return (
        <div className={className}>
            <label>{field.label}{(field.required && field.required === true) ? <span className="asterisk-required">*</span> : ''}</label>
            <div className={inputbox}>
                <input {...others} disabled={disabled} type="text" className={InputClassName} {...input} />
            </div>
            <div className="text-help">{(touched) ? error : ''}</div>
        </div>
    );
}

/*
@method: renderFileInputField
@desc: Render file input
*/
export function renderFileInputField(field) {
    const { input, isDisabled, meta: { touched, error, active }, ...others } = field;
    const disabled = isDisabled === true ? true : false;
    const inputbox = `inputbox ${active ? 'active' : ''}`;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;
    const InputClassName = `form-control ${field.className ? field.className : ''}`;
    return (
        <div className={className}>
            <label>{field.label}{(field.required && field.required === true) ? <span className="asterisk-required">*</span> : ''}</label>
            <div className={inputbox}>
                <input {...others} type="file" value={field.input.value} className={InputClassName} {...input} />
                {/* <input disabled={disabled} type="file" className={InputClassName} /> */}
            </div>
            <div className="text-help">{(touched) ? error : ''}</div>
        </div>
    );
}

/*
@method: renderCheckboxInputField
@desc: Render radio input
*/
export function renderCheckboxInputField(field) {
    const { input, meta: { touched, error }, ...others } = field;
    const InputClassName = `input-form-group ${field.className ? field.className : ''}`;
    return (
        <div className="InputClassName align-items-center remember float-left">
            <input {...others} id={field.input.name} className="m-0 align-middle" {...input} onChange={field.onChange} />
            <label htmlFor={field.input.name} className="font-weight-bold m-0 ml-1 align-middle">{field.label}</label>
            <div className="text-help">{(touched) ? error : ''}</div>
        </div>
    );
}


/*
@method: focusOnError
@desc: focus on the error input
*/
export const focusOnError = (errors) => {
    if (typeof errors !== "undefined" && errors !== null) {
        const errorEl = document.querySelector(
            Object.keys(errors).map(fieldName => {
                return `[name="${fieldName}"]`
            }).join(",")
        );

        if (errorEl && errorEl.focus) {
            errorEl.focus();
        }
    }
}

