import React from 'react';
import {inspect} from 'util';
import styles from './FormControls.module.css'


// @ts-ignore
const FormControl = ({input, meta, child, ...props}) => {
    const error = meta.touched && meta.error
    return (
        <div className={error && styles.formControl + ' ' + styles.error}>
            {props.children}
            <div>
                {error && <span className={styles.formControl + ' ' + styles.error}>{meta.error}</span> }
            </div>
        </div>
    );
}
// @ts-ignore
export const Textarea = (props: any) => {
    const {input, meta, child, ...restProps} = props
    return <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
};
// @ts-ignore
export const Input = (props: any) => {
    const {input, meta, child, ...restProps} = props
    return <FormControl {...props}><input {...input} {...restProps}/></FormControl>
};

{/*// @ts-ignore*/}
{/*export const Textarea = ({input, meta, ...props}) => {*/}
{/*const error = meta.touched && meta.error*/}
{/*    console.log(meta.error)*/}
{/*    return (*/}
{/*        <div className={error && styles.formControl + ' ' + styles.error}>*/}
{/*            <textarea {...input} {...props}/>*/}
{/*            <div>*/}
{/*                {error && <span className={styles.formControl + ' ' + styles.error}>{meta.error}</span> }*/}
{/*            </div>*/}
{/*        </div>*/}
{/*    );*/}
{/*};*/}
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
