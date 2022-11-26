import React, { useState } from 'react'
import { withFormik } from 'formik';
import { Input } from 'antd';
import * as Yup from 'yup';
import { connect } from 'react-redux'
import { EditOutlined } from '@ant-design/icons';
import { EDIT_USER_SAGA } from '../../redux/constants/CyberBugConst';


/// Phải xác nhận đúng mật khẩu của user mới được đổi thông tin user

function EditInformation(props) {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        useLogin

    } = props;

    console.log(errors)
    const [hidden, setHidden] = useState(false)
    return (
        <div className='d-flex justify-content-start align-items-center mt-5 ' style={{ minWidth: 200, paddingLeft: '2%' }}>
            <form style={{ width: '50%' }} onSubmit={handleSubmit}>


                <div className='mb-3'>
                    <p className='m-0'>ID User</p>
                    <Input
                        style={{ fontWeight: 'bold' }}
                        disabled
                        type="text"
                        onChange={handleChange}
                        value={values.id}
                        name="id"
                    />

                </div>

                <div className='mb-3'>
                    <p className='m-0'>Email</p>
                    <Input
                        type="text"
                        onChange={handleChange}
                        value={values.email}
                        name="email"
                    />
                    {errors.email && touched.email && <div className='text-danger' id="feedback">{errors.email}</div>}
                </div>
                <div className='mb-3 ' style={{ overflow: 'hidden', cursor: 'pointer' }} >
                    <p className='m-0' onClick={() => {
                    }} >Password <span className='text-danger'>*</span></p>
                    <Input
                        type="passWord"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="passWord"
                    />
                    {errors.passWord && touched.passWord && <div className='text-danger' id="feedback">{errors.passWord}</div>}
                </div>
                <div className='mb-3 font-weight-bold' style={{ overflow: 'hidden', cursor: 'pointer' }} >
                    <p className='mb-3 ' onClick={() => {
                        setHidden(!hidden)
                    }} >Change Password (optional) <EditOutlined /></p>

                    <div style={{ display: ` ${hidden ? 'block' : 'none'}`, transition: '.3s' }} >
                        <div>
                            <p className='m-0 font-weight-bold'> New Password <span className='text-danger'>*</span></p>
                            <Input
                                type="passWord"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="newPassWord"
                            />
                            {errors.newPassWord && touched.newPassWord && <div className='text-danger' id="feedback">{errors.newPassWord}</div>}

                        </div>
                        <div>
                            <p className='m-0 font-weight-bold'> Confirm Password <span className='text-danger'>*</span></p>
                            <Input
                                type="passWord"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="confirmPassword"
                            />
                            {errors.confirmPassword && <div className='text-danger' id="feedback">{errors.confirmPassword}</div>}
                        </div>
                    </div>

                </div>
                <div className='mb-3 '>
                    <p className='m-0'>Name</p>
                    <Input
                        type="text"
                        onChange={handleChange}

                        value={values.fullName}
                        name="fullName"
                    />
                    {errors.fullName && touched.fullName && <div className='text-danger' id="feedback">{errors.fullName}</div>}
                </div>
                <div className='mb-3 '>
                    <p className='m-0'>Phone Number</p>
                    <Input
                        type="tel"
                        onChange={handleChange}

                        value={values.phoneNumber}
                        name="phoneNumber"
                    />
                    {errors.phoneNumber && touched.phoneNumber && <div className='text-danger' id="feedback">{errors.phoneNumber}</div>}
                </div>
                <div className='d-flex align-items-center justify-content-between' >
                    <button className='btn btn-primary' type="submit">Submits</button>
                </div>
            </form>
        </div>
    );
};

const MyFormEditUser = withFormik({

    enableReinitialize: true,

    mapPropsToValues: (props) => {
        return {
            id: props.useLogin.id,
            email: props.useLogin.email,
            fullName: props.useLogin.name,
            phoneNumber: props.useLogin.phoneNumber,
            passWord: '',
            newPassWord: '',
            confirmPassword: ''
        }

    },


    validationSchema: () => {

        const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/
        return Yup.object().shape(
            {
                email: Yup.string().required().email(),
                passWord: Yup.string().required(),
                fullName: Yup.string().required(),
                phoneNumber: Yup.string().required().matches(phoneRegExp, 'Phone number is not valid'),
                newPassWord: Yup.string(),
                confirmPassword: Yup.string().when('newPassWord', (newPassWord, field) =>
                    newPassWord ? field.required().oneOf([Yup.ref('newPassWord'), null], 'Passwords must match with New Password') : field
                )
            }
        )
    },

    handleSubmit: (values, { props, setSubmitting }) => {
        let userSignup = { ...values, name: values.fullName }

        console.log(userSignup)
        props.dispatch({
            type: EDIT_USER_SAGA,
            user: userSignup
        })

    },

    displayName: 'BasicForm',
})(EditInformation);

const mapStateToProps = (state) => {
    return {
        useLogin: state.InfoUserLogInReducer.useLogin
    }
}

export default connect(mapStateToProps)(MyFormEditUser)
