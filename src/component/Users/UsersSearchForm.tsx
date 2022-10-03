import {Formik} from 'formik';
import React from 'react';

const usersSearchFormValidate = (values: any) => {
    const errors = {}
    return errors
}
type usersSearchFormObjectType = {
    term: string
}


// для Samurai 2.0
export const UsersSearchForm = () => {

    const submit = (values: usersSearchFormObjectType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {

    }
    return (
        <div>
            <Formik
                initialValues={{term: ''}}
                validate={usersSearchFormValidate}
                onSubmit={submit}>
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                      /* and other goodies */
                  }) => (
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="term"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            // value={values.email}
                        />
                        {/*{errors.email && touched.email && errors.email}*/}
                        {/*<input*/}
                        {/*    type="password"*/}
                        {/*    name="password"*/}
                        {/*    onChange={handleChange}*/}
                        {/*    onBlur={handleBlur}*/}
                        {/*    // value={values.password}*/}
                        {/*/>*/}
                        {/*{errors.password && touched.password && errors.password}*/}
                        <button type="submit" disabled={isSubmitting}>
                            Find
                        </button>
                    </form>
                )}
            </Formik>
        </div>
    )
}