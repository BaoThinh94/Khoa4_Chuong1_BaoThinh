import React from 'react'
import { withFormik } from 'formik';
import { Input } from 'antd';
import * as Yup from 'yup';
import { connect } from 'react-redux'
import { EDIT_USER_SAGA } from '../../redux/constants/CyberBugConst';


/// Phải xác nhận đúng mật khẩu của user cần đổi mới được đổi thông tin user

function EditUser(props) {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,

    } = props;
    return (
        <div className='d-flex justify-content-center align-items-center' style={{ minWidth: 200, }}>
            <form style={{ width: '500px' }} onSubmit={handleSubmit}>
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
                <div className='row'>
                    <div className='mb-3 col-6'>
                        <p className='m-0'>Email</p>
                        <Input
                            type="text"
                            onChange={handleChange}
                            value={values.email}
                            name="email"
                        />
                        {errors.email && touched.email && <div className='text-danger' id="feedback">{errors.email}</div>}
                    </div>
                    <div className='mb-3 col-6'>
                        <p className='m-0'>Password <span className='text-danger'>*</span></p>
                        <Input
                            type="passWord"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="passWord"
                        />
                        {errors.passWord && touched.passWord && <div className='text-danger' id="feedback">{errors.passWord}</div>}
                    </div>
                    <div className='mb-3 col-6'>
                        <p className='m-0'>Name</p>
                        <Input
                            type="text"
                            onChange={handleChange}

                            value={values.fullName}
                            name="fullName"
                        />
                        {errors.fullName && touched.fullName && <div className='text-danger' id="feedback">{errors.fullName}</div>}
                    </div>
                    <div className='mb-3 col-6'>
                        <p className='m-0'>Phone Number</p>
                        <Input
                            type="tel"
                            onChange={handleChange}

                            value={values.phoneNumber}
                            name="phoneNumber"
                        />
                        {errors.phoneNumber && touched.phoneNumber && <div className='text-danger' id="feedback">{errors.phoneNumber}</div>}
                    </div>
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
            id: props.userEdit.userId,
            email: props.userEdit.email,
            fullName: props.userEdit.name,
            phoneNumber: props.userEdit.phoneNumber,
            passWord: ''
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
            }
        )
    },

    handleSubmit: (values, { props, setSubmitting }) => {
        let userSignup = { ...values, name: values.fullName }

        props.dispatch({
            type: EDIT_USER_SAGA,
            user: userSignup
        })

    },

    displayName: 'BasicForm',
})(EditUser);

const mapStateToProps = (state) => {
    return {
        userEdit: state.UserEditReducer.userEdit
    }
}

export default connect(mapStateToProps)(MyFormEditUser)
