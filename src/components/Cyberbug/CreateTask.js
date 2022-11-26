import { Select, Slider } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { CREATE_TASK_SAGA, GET_ALL_PROJECT_CHOSSE_TASK_SAGA, GET_ALL_TYPE_TASK_SAGA, GET_USER } from '../../redux/constants/CyberBugConst'
import {
    ClockCircleOutlined,
} from '@ant-design/icons';
import { Editor } from '@tinymce/tinymce-react';
import { GetAllProjectReducer } from '../../redux/reducers/GetAllProjectReducer'
import { withFormik } from 'formik';
import * as Yup from 'yup';

function CreateTask(props) {

    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        content,
        listProjectUser,
        taskCategory,
        taskPriorityCategory,
        getUser,
        taskTypeCatelogy,

    } = props;

    console.log(taskTypeCatelogy)
    console.log(taskCategory)
    console.log(taskPriorityCategory)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({ type: GET_USER, user: '' })
        dispatch({ type: GET_ALL_PROJECT_CHOSSE_TASK_SAGA })
        dispatch({ type: GET_ALL_TYPE_TASK_SAGA })

    }, [])

    const [idProject, setidProject] = useState(0)

    let options = [];

    useEffect(() => {

        setidProject(listProjectUser[0]?.id)

    }, [listProjectUser])


    let index = listProjectUser.findIndex(project => project.id === idProject)
    if (index !== -1) {
        for (let i = 0; i < listProjectUser[index].members.length; i++) {
            options.push({
                label: listProjectUser[index].members[i].name,
                value: listProjectUser[index].members[i].userId,
            });
        }
    }

    const [time, setTime] = useState({
        timeTrackingSpent: 0,
        timeTrackingRemaining: 10
    })

    // console.log(getUser)








    const renderTaskCategory = () => {
        return taskCategory?.map((item, index) => {
            return <option key={index} value={item.statusId} > {item.statusName}</option>
        })
    }

    const renderTaskPriorityCategory = () => {
        return taskPriorityCategory?.map((item, index) => {
            return <option key={index} value={item.priorityId} > {item.priority}</option>
        })
    }

    const renderAllProjectUserLocal = () => {
        return listProjectUser?.map((item, index) => {
            return <option key={index} value={item.id} > {item.projectName}</option>
        })
    }

    const renderTaskTypeCatelogy = () => {
        return taskTypeCatelogy?.map((item, index) => {
            return <option key={index} value={item.id} > {item.taskType}</option>
        })
    }


    const editorRef = useRef(null);

    const log = () => {
        if (editorRef.current) {
            setFieldValue('description', `${editorRef.current.getContent()}`)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='row'>
                <div className="form-group col-12">
                    <p>ProJect</p>
                    <select onChange={(e) => {
                        handleChange(e)
                        setidProject(Number(e.target.value))
                    }
                    } className="form-control" name="projectId" >
                        {renderAllProjectUserLocal()}
                    </select>
                </div>
            </div>
            <div className='row'>
                <div className="form-group col-6">
                    <p>Task Name</p>
                    <input onChange={handleChange} type="text" className="form-control" name='taskName' />
                </div>
                <div className="form-group col-6">
                    <p>Assign Member</p>
                    <Select
                        onChange={(value) => {
                            setFieldValue('listUserAsign', value)

                        }}


                        name='listUserAsign'
                        mode="multiple"
                        allowClear
                        style={{
                            width: '100%',
                        }}
                        optionFilterProp='label'
                        placeholder="Please select"
                        defaultValue={[]}
                        options={options}
                        onSelect={(values, option) => {

                        }
                        }

                    />
                </div>
            </div>
            <div className='row'>
                <div className="form-group col-6">
                    <p>Status</p>
                    <select onChange={handleChange} className="form-control" name="statusId" >
                        {renderTaskCategory()}
                    </select>
                </div>
                <div className="form-group col-6">
                    <p>Priority</p>
                    <select onChange={handleChange} className="form-control" name="priorityId" >
                        {renderTaskPriorityCategory()}
                    </select>
                </div>
            </div>
            <div className='row'>
                <div className="form-group col-6">
                    <p>Tracking time</p>
                    <div className='d-flex justify-content-between align-items-center'>
                        <ClockCircleOutlined style={{ fontSize: '25px' }} />
                        <div style={{ width: '90%' }}>
                            <Slider
                                min={0}
                                max={Number(time.timeTrackingSpent) + Number(time.timeTrackingRemaining)}
                                defaultValue={3}
                                value={time.timeTrackingSpent}

                                onChange={(value) => {
                                    setTime({
                                        ...time,
                                        timeTrackingSpent: value
                                    })
                                }}

                                tooltip={{
                                    open: false,
                                }}
                            />

                            <div className='d-flex justify-content-between align-items-center'>
                                <p className='m-0 font-weight-bold' >{time.timeTrackingSpent}h logged</p>
                                <p className='m-0 font-weight-bold'>{time.timeTrackingRemaining}h remaining</p>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className="form-group col-6">
                            <p className='m-0'>Time spent (hours)</p>
                            <input value={time.timeTrackingSpent} onChange={e => {
                                handleChange(e)
                                setTime({
                                    ...time,
                                    timeTrackingSpent: e.target.value
                                })
                            }} type="number" className="form-control" min="0" name='timeTrackingSpent' />
                        </div>
                        <div className="form-group col-6">
                            <p style={{ whiteSpace: 'nowrap' }} className='m-0'>Time remaining (hours)</p>
                            <input onChange={e => {
                                handleChange(e)
                                setTime({
                                    ...time,
                                    timeTrackingRemaining: e.target.value
                                })
                            }} type="number" className="form-control" min="0" name='timeTrackingRemaining' />
                        </div>
                    </div>

                </div>
                <div className="form-group col-6">
                    <p>Task Type</p>
                    <select onChange={handleChange} className="form-control" name="typeId" >
                        {renderTaskTypeCatelogy()}
                    </select>
                    <p>RIGINAL ESTIMATE (HOURS)</p>
                    <input onChange={handleChange} type="number" min="0" className="form-control" name='originalEstimate' />
                </div>
            </div>
            <div className='row'>
                <div className='col-12'>
                    <p>Description</p>
                    <Editor
                        name='description'
                        apiKey='your-api-key'
                        onInit={(evt, editor) => editorRef.current = editor}

                        init={{
                            height: 250,
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
            </div>
            <button className=' mt-4 btn btn-success' onClick={log} type="submit">Submit</button>
        </form>
    )
}



const CreateTaskForm = withFormik({
    enableReinitialize: true,

    mapPropsToValues: (props) => {
        return {
            listUserAsign: [],
            taskName: '',
            description: '',
            statusId: props.taskCategory[0]?.statusId,
            originalEstimate: 0,
            timeTrackingSpent: 0,
            timeTrackingRemaining: 0,
            projectId: props.listProjectUser[0]?.id,
            typeId: props.taskTypeCatelogy[0]?.id,
            priorityId: props.taskPriorityCategory[0].priorityId,
        }
    },

    validationSchema: Yup.object().shape({


    }),

    handleSubmit: (values, { props, setSubmitting }) => {
        console.log(values)
        props.dispatch({
            type: CREATE_TASK_SAGA,
            task: values
        })
    },

    displayName: 'BasicForm',
})(CreateTask);


const mapStateToProps = (state) => {
    return {
        listProjectUser: state.GetAllProjectReducer.listProjectUser,
        taskTypeCatelogy: state.TaskReducer.taskTypeCatelogy,
        taskCategory: state.TaskReducer.taskCategory,
        taskPriorityCategory: state.TaskReducer.taskPriorityCategory,
        getUser: state.InfoUserLogInReducer.getUser,

    }
}

export default connect(mapStateToProps)(CreateTaskForm)