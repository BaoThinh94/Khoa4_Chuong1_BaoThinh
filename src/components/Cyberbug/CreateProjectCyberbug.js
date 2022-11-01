import React from 'react'
import { useRef } from 'react'
import { useDispatch, useSelector, connect } from 'react-redux'
import { withFormik } from 'formik';
import { Input } from 'antd';
import { Editor } from '@tinymce/tinymce-react';
import { ProjectCategoryReducer } from '../../redux/reducers/ProjectCategoryReducer';
import { CREATE_NEWPROJECT_AUTHORIZE } from '../../redux/constants/CyberBugConst';
import * as Yup from 'yup';



function CreateProjectCyberbug(props) {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        content
    } = props;

    const renderProJectCatelogry = () => {
        return content.map((item, index) => {
            return <option key={index} value={item.id} >{item.projectCategoryName}</option>
        })
    }

    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            setFieldValue('description', `${editorRef.current.getContent()}`)
        }
    };

    return (
        <div className="creat_project">
            <div className='project_detail'>
                <p>Projects / singularity 1.0 / Project Details</p>
                <h3>Cyber Board</h3>
                <form onSubmit={handleSubmit}>
                    <div >
                        <p>Name</p>
                        <Input
                            className='creat_input'
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                            name="projectName"
                        />
                    </div>
                    <div className='mt-5'>
                        <p>Description</p>
                        <Editor
                            name='description'
                            apiKey='your-api-key'
                            onInit={(evt, editor) => editorRef.current = editor}

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
                    <div className='mt-5 mb-5 '>
                        <p>Project Category</p>
                        <select className='w-100 creat_input' name='categoryId' onChange={handleChange} >
                            {/* <option>Software</option>
                            <option>Business</option>
                            <option>Marketing</option> */}

                            {renderProJectCatelogry()}
                        </select>
                    </div>
                    <button onClick={log} type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

const CreateProjectForm = withFormik({
    enableReinitialize: true,

    mapPropsToValues: (props) => {
        return {
            projectName: '',
            description: '',
            categoryId: props.content[0]?.id,
        }
    },

    validationSchema: Yup.object().shape({


    }),

    handleSubmit: (values, { props, setSubmitting }) => {
        props.dispatch({
           type: CREATE_NEWPROJECT_AUTHORIZE,
           newProject:values
        })
    },

    displayName: 'BasicForm',
})(CreateProjectCyberbug);


const mapStateToProps = (state) => {
    return {
        content: state.ProjectCategoryReducer.content
    }
}

export default connect(mapStateToProps)(CreateProjectForm)