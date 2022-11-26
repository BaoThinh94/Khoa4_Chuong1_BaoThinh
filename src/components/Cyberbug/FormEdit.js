import React, { useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { connect } from 'react-redux'
import { withFormik } from 'formik';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
import * as Yup from 'yup';
import { CLOSE_FORM, UPDATE_PROJECT } from '../../redux/constants/CyberBugConst';

function FormEdit(props) {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        content,
        dispatch
    } = props;
    const editorRef = useRef(null);

    console.log('editform')
    const renderProJectCatelogry = () => {
        return content.map((item, index) => {
            return <option key={index} value={item.id} >{item.projectCategoryName}</option>
        })
    }

    const log = () => {
        if (editorRef.current) {
            setFieldValue('description', `${editorRef.current.getContent()}`)
        }
    };

    return (
        <form onSubmit={handleSubmit} >
            <div className='row'>
                <div className='form-group col-6'>
                    <label>
                        ID Project
                    </label>
                    <br />
                    <input name='id' disabled type='text' className='form-control' value={values.id} />
                </div>
                <div className='form-group col-6'>
                    <label>
                        Project name
                    </label>
                    <br />
                    <input name='projectName' type='text' onChange={handleChange} className='form-control' value={values.projectName} />
                </div>

                <div className='mt-5 col-12'>
                    <p>Description</p>
                    <Editor
                        name='description'
                        apiKey='your-api-key'
                        onInit={(evt, editor) => editorRef.current = editor}
                        initialValue={values.description}
                        init={{
                            height: 300,
                            menubar: false,
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                            ],
                            toolbar: 'undo redo | blocks | ' +
                                'bold italic forecolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                    />
                </div>

                <div className='mt-5 mb-5 col-12 '>
                    <p>Project Category</p>
                    <select className='w-100 creat_input' name='categoryId' onChange={handleChange} value={values.categoryId}>
                        {renderProJectCatelogry()}
                    </select>
                </div>
            </div>
            {/* <button className="btn btn-primary" onClick={log} type="submit">Submit</button> */}

            <button className='mr-2 btn btn-success' onClick={log} type="submit">
                Submit
            </button>

            <div style={{ cursor: 'pointer' }} className='btn btn-danger' onClick={() => {
                dispatch({
                    type: CLOSE_FORM
                })
            }}>Cancel</div>
        </form>
    )
}


const CreateProjectEditForm = withFormik({
    enableReinitialize: true,

    mapPropsToValues: (props) => {
        return {
            id: props.projectEdit.id,
            projectName: props.projectEdit.projectName,
            description: props.projectEdit.description,
            categoryId: props.projectEdit.categoryId,

        }
    },

    validationSchema: Yup.object().shape({


    }),


    handleSubmit: (values, { props, setSubmitting }) => {

        props.dispatch({
            type: UPDATE_PROJECT,
            projectID: props.projectEdit.id,
            projectValue: values
        })

        console.log(values)
    },

    displayName: 'BasicForm',
})(FormEdit);

const mapStateToProps = (state) => {
    return {
        projectEdit: state.ProjectManagermentEditReducer.editProject,
        content: state.ProjectCategoryReducer.content
    }
}

export default connect(mapStateToProps)(CreateProjectEditForm)