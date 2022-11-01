import React from 'react'
import { useRef } from 'react'
import { useDispatch, useSelector, connect } from 'react-redux'
import { withFormik } from 'formik';
import { Input } from 'antd';
import { Editor } from '@tinymce/tinymce-react';
import { ProjectCategoryReducer } from '../../redux/reducers/ProjectCategoryReducer';
import { CREATE_NEWPROJECT_AUTHORIZE } from '../../redux/constants/CyberBugConst';
import * as Yup from 'yup';
import { ProjectManagermentEditReducer } from '../../redux/reducers/ProjectManagermentEditReducer'

function ModalProjectManager(props) {



    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        content,
        projectEdit
    } = props;

    console.log(projectEdit)

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
        <div>
            <div>
                {/* Button trigger modal */}

                {/* Modal */}
                <div className="modal fade" id="projectmanagerment" tabIndex={-1} role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    Project ID: {projectEdit.id}
                                </h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="container-fluid">
                                    <form onSubmit={handleSubmit}>
                                        <div >
                                            <p>Name</p>
                                            <Input
                                                className='creat_input'
                                                type="text"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={projectEdit.projectName}
                                                name="projectName"
                                            />
                                        </div>
                                        <div className='mt-5'>
                                            <p>Description</p>
                                            <Editor
                                                name='description'
                                                apiKey='your-api-key'
                                                onInit={(evt, editor) => editorRef.current = editor}
                                                initialValue={projectEdit.description}
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
                                            <select className='w-100 creat_input' name='categoryId' onChange={handleChange} value={projectEdit.categoryId} >
                                                {renderProJectCatelogry()}
                                            </select>
                                        </div>
                                        <button className="btn btn-primary" onClick={log} type="submit">Submit</button>
                                    </form>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

const CreateProjectForm = withFormik({
    enableReinitialize: true,

    mapPropsToValues: (props) => {
        return {
            id: props.projectEdit.id,
            projectName: props.projectEdit.projectName,
            description: props.projectEdit.description,
            creator: props.projectEdit.creator,
            categoryId: props.projectEdit.categoryId,

        }
    },

    validationSchema: Yup.object().shape({


    }),

    handleChange: (e) => {
        console.log(e)
    },

    handleSubmit: (values, { props, setSubmitting }) => {
        // props.dispatch({
        //    type: CREATE_NEWPROJECT_AUTHORIZE,
        //    newProject:values
        // })
        console.log(values)
    },

    displayName: 'BasicForm',
})(ModalProjectManager);

const mapStateToProps = (state) => {
    return {
        projectEdit: state.ProjectManagermentEditReducer.editProject,
        content: state.ProjectCategoryReducer.content
    }
}

export default connect(mapStateToProps)(CreateProjectForm)