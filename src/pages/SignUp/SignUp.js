import React from 'react'
import { withFormik } from 'formik';
import { Input } from 'antd';
import * as Yup from 'yup';
import { LeftOutlined, RollbackOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { SIGN_UP } from '../../redux/constants/CyberBugConst';

function SignUp(props) {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
    } = props;

    console.log(errors)

    return (
        <div className='d-flex justify-content-center align-items-center' style={{ height: window.innerHeight, minWidth: 200, }}>
            <form style={{ width: '350px' }} onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <p className='m-0'>Email</p>
                    <Input
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        name="email"
                    />
                    {errors.email && touched.email && <div className='text-danger' id="feedback">{errors.email}</div>}
                </div>
                <div className='mb-3'>
                    <p className='m-0'>PassWord</p>
                    <Input
                        type="passWord"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        name="passWord"
                    />
                    {errors.passWord && touched.passWord && <div className='text-danger' id="feedback">{errors.passWord}</div>}
                </div>
                <div className='mb-3'>
                    <p className='m-0'>Name</p>
                    <Input
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        name="fullName"
                    />
                    {errors.fullName && touched.fullName && <div className='text-danger' id="feedback">{errors.fullName}</div>}
                </div>
                <div className='mb-3'>
                    <p className='m-0'>Phone Number</p>
                    <Input
                        type="tel"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        name="phoneNumber"
                    />
                    {errors.phoneNumber && touched.phoneNumber && <div className='text-danger' id="feedback">{errors.phoneNumber}</div>}
                </div>
                <div className='d-flex align-items-center justify-content-between' >
                    <NavLink to='/loginjira' className=''><LeftOutlined /> back to Login </NavLink>
                    <button className='btn btn-primary' type="submit">Submit</button>
                </div>

            </form>
        </div>
    );
};

const MyEnhancedForm = withFormik({

    mapPropsToValues: () => ({
        email: '',
        passWord: '',
        fullName: '',
        phoneNumber: '',


    }),


    validationSchema: () => {

        const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/
        return Yup.object().shape(
            {
                email: Yup.string().required().email(),
                passWord: Yup.string().required(),
                fullName: Yup.string().required(),
                phoneNumber: Yup.string().required().matches(phoneRegExp, 'Phone number is not valid'),
            }
        )
    },

    handleSubmit: (values, { props, setSubmitting }) => {
        let userSignup = { ...values, name: values.fullName }
        console.log(userSignup)

        props.dispatch({
            type: SIGN_UP,
            user: userSignup
        })

    },

    displayName: 'BasicForm',
})(SignUp);

export default connect()(MyEnhancedForm)