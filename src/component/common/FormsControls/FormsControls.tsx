import React from 'react';
import styles from './FormControls.module.css'
import {Field, WrappedFieldMetaProps, WrappedFieldProps} from 'redux-form';
import {FieldValidatorType} from '../../../utils/validaters/validators';

type FormControlPropsType = {
    meta: WrappedFieldMetaProps
    children: React.ReactNode  //JSX.Element
}
const FormControl: React.FC<FormControlPropsType> = ({meta: {touched, error}, children}) => {
    const errorMain = touched && error
    return (
        <div className={error && styles.formControl + ' ' + styles.error}>
            {children}
            <div>
                {errorMain && <span className={styles.formControl + ' ' + styles.error}>{error}</span>}
            </div>
        </div>
    );
}

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props
    //const {input, meta, child, ...restProps} = props
    return <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
};

export const Input: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props
    return <FormControl {...props}><input {...input} {...restProps}/></FormControl>
};



export function createField<FormKeysType extends string>(placeholder: string | undefined,
                            name: FormKeysType,
                            validators: Array<FieldValidatorType>,
                            component: React.FC<WrappedFieldProps>,
                            props = {},
                            text = '') {
    return <div>
        <Field placeholder={placeholder} name={name} validate={validators} component={component} {...props}/>{text}
    </div>
}






{/*// @ts-ignore*/
}
{/*export const Textarea = ({input, meta, ...props}) => {*/
}
{/*const error = meta.touched && meta.error*/
}
{/*    console.log(meta.error)*/
}
{/*    return (*/
}
{/*        <div className={error && styles.formControl + ' ' + styles.error}>*/
}
{/*            <textarea {...input} {...props}/>*/
}
{/*            <div>*/
}
{/*                {error && <span className={styles.formControl + ' ' + styles.error}>{meta.error}</span> }*/
}
{/*            </div>*/
}
{/*        </div>*/
}
{/*    );*/
}
{/*};*/
}
//
// // @ts-ignore
// export const Input = ({input, meta, ...props}) => {
//     const error = meta.touched && meta.error
//     console.log(meta.error)
//     return (
//         <div className={error && styles.formControl + ' ' + styles.error}>
//             <input {...input} {...props}/>
//             <div>
//                 {error && <span className={styles.formControl + ' ' + styles.error}>{meta.error}</span> }
//             </div>
//         </div>
//     );
// };
