import React from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { withFormik, yupToFormErrors } from "formik";
import * as Yup from 'yup'
import { connect } from 'react-redux';
import { USER_LOGIN_CYBERBUG } from '../../redux/constants/CyberBugConst';
import { signInAction } from '../../redux/actions/Cyberbugaction';

function LoginJira(props) {

    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
    } = props;
   
    
    return (
        <div className='d-flex justify-content-center align-items-center' style={{ height: window.innerHeight, minWidth: 200 }}>
            <form onSubmit={handleSubmit}
                style={{ minWidth: 200 }}>
                <h3 className='text-center'>Login CyberBug</h3>
                <div className='mt-3'>
                    <Input name="email" onChange={handleChange} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                    {touched.email && <div className='text-danger'>{errors.email}</div>}
                </div>
                <div className='mt-3'>
                    <Input
                        name="password"
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                        onChange={handleChange}
                    />
                    {errors.password && touched.password && <div className='text-danger'>{errors.password}</div>}
                </div>
                <div className='d-flex justify-content-center mt-5'>
                    <Button htmlType="submit" type="primary">Login</Button>
                </div>
            </form>
        </div>
    )
}


const MyEnhancedForm = withFormik({
    mapPropsToValues: () => ({
        email: '',
        password: ''

    }),
    validationSchema: Yup.object().shape({ // Validate form field
        email: Yup.string()
            .email('email is not valid')
            .required('Username is required')
            .min(5, 'Username must have min 5 characters'),
            
        password: Yup.string()
            .required('Username is required')
            ,
            
    }),
    handleSubmit: ({email,password}, {props,setSubmitting }) => {
        

        
        setSubmitting(true)
        props.dispatch(signInAction(email,password));
    },

    displayName: 'BasicForm',
})(LoginJira);


export default connect()(MyEnhancedForm)