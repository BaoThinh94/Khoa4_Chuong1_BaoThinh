import { Editor } from '@tinymce/tinymce-react';
import { AutoComplete, Popover } from 'antd';
import React, { useRef } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { DEL_TASK_COMMENT_SAGA, GET_PROJECT_DETAIL_MODAL, INSERT_COMMENT_TASK, REMOVE_TASK, REMOVE_USER_FROM_TASK, UPDATE_COMMENT, UPDATE_STATUS_TASK_SAGA, UPDATE_TASK_COMMENT_SAGA, UPDATE_TO_REDUCER_TASK } from '../../redux/constants/CyberBugConst';


const parse = require('html-react-parser');



export default function ModalTaskDetail(props) {

    const dispatch = useDispatch()
    const { proJectDetail } = useSelector(state => state.ModalTaskGetProjectDetail) //get project detail
    const { taskDetail } = useSelector(state => state.TaskDetailReducer) //get task detail
    const { taskTypeCatelogy, taskCategory, taskPriorityCategory } = useSelector(state => state.TaskReducer) //render all category 
    const user = useSelector(state => state.InfoUserLogInReducer.useLogin) //get localstore infor user
    const [userSelect, setUserSelect] = useState('')
    const [visible, setVisible] = useState(false)
    const [visibleComment, setVisibleComment] = useState(false)
    const [visibleCommentBox, setVisibleCommentBoX] = useState([])

    let listMem = taskDetail.assigness?.map(mem => {
        return mem.id
    })

    let listCmnt = taskDetail.lstComment?.map((cmt, index) => { return { ...cmt, visible: false, editorRed: null } })



    useEffect(() => {
        dispatch({
            type: GET_PROJECT_DETAIL_MODAL,
            projectID: taskDetail.projectId

        })

        setVisibleCommentBoX(listCmnt)
    }, [taskDetail])

    // console.log(user)

    const percentBar = Math.round((Number(taskDetail?.timeTrackingSpent) * 100) / (Number(taskDetail?.timeTrackingSpent) + Number(taskDetail?.timeTrackingRemaining)))

    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            setVisible(false)
            dispatch({
                type: UPDATE_STATUS_TASK_SAGA,
                actionType: UPDATE_TO_REDUCER_TASK,
                name: 'description',
                value: editorRef.current.getContent(),
                listUserId: listMem
            })
        }
    };

    const editorRefComment = useRef(null);
    const logComment = () => {
        if (editorRefComment.current) {
            setVisibleComment(false)
            dispatch({
                type: INSERT_COMMENT_TASK,
                comment: {
                    taskId: taskDetail.taskId,
                    contentComment: editorRefComment.current.getContent()
                }
            })
        }
    };

    const editorRefUpdateComment = useRef(null);
    const logUpdateComment = (cmtId, index) => {

        if (editorRefUpdateComment.current) {
            console.log(editorRefUpdateComment.current.getContent())
            console.log(cmtId)
            let newList = [...visibleCommentBox];
            newList[index].visible = false;
            setVisibleCommentBoX(newList)
            dispatch({
                type: UPDATE_TASK_COMMENT_SAGA,
                content: editorRefUpdateComment.current.getContent(),
                commentID: cmtId,
                taskID: taskDetail.taskId
            })
        }
    };

    const renderDescription = () => {
        return <div >
            {visible ? <div><Editor
                name='description'
                apiKey='your-api-key'
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue={taskDetail.description}
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
                <div className='mt-3 mb-3'>
                    <button onClick={log} className='mr-3 btn btn-success'>Save</button>
                    <button onClick={() => { setVisible(!visible) }} className='mr-3 btn btn-primary'>Cancel</button>
                </div>
            </div> : <div onClick={() => {
                setVisible(true)
            }}>{parse(taskDetail.description)}</div>}
        </div>
    }


    const content = (
        <AutoComplete
            style={{
                width: 200,

            }}
            optionFilterProp='label'

            placeholder="Search"
            filterOption={(inputValue, option) =>
                option.label.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
            }
            options={proJectDetail.members?.filter(
                mem => {
                    let index =
                        taskDetail.assigness?.findIndex(taskMem => taskMem.id == mem.userId)
                    if (index != -1) {
                        return false;
                    } else {
                        return true;
                    }
                })?.map((mem, index) => ({
                    label: mem.name,
                    value: mem.userId.toString()
                }))
            }
            value={userSelect}
            onChange={(e) => {
                setUserSelect(e)

            }}
            onSelect={(value, option) => {
                setUserSelect(option.label)
                listMem.push(Number(option.value))
                dispatch({
                    type: UPDATE_STATUS_TASK_SAGA,
                    actionType: UPDATE_TO_REDUCER_TASK,
                    listUserId: listMem
                })
            }}

            onBlur={() => {
                setUserSelect('')
            }}
        />

    );

    const renderTaskPriorityCategory = () => {
        return taskPriorityCategory?.map((item, index) => {
            return <option key={index} value={item.priorityId} > {item.priority}</option>
        })
    }

    const renderTaskCategory = () => {
        return taskCategory?.map((item, index) => {

            return <option key={index} value={item.statusId} > {item.statusName}</option>
        })
    }

    const renderUser = () => {
        return taskDetail.assigness?.map((mem, index) => {
            return <div key={index} style={{ display: 'flex' }} className="item">
                <div className="avatar">
                    <img src={mem.avatar} alt='123' />
                </div>
                <p onClick={() => {
                    dispatch({
                        type: REMOVE_USER_FROM_TASK,
                        user: {
                            taskId: taskDetail.taskId,
                            userId: mem.id
                        }
                    })
                }} className="name">
                    {mem.name}
                    <i className="fa fa-times" style={{ marginLeft: 5, cursor: 'pointer' }} />
                </p>
            </div>
        })
    }

    const renderInputComment = () => {
        return <div style={{ width: '100%' }}>
            {visibleComment ? <div><Editor
                name='description'
                apiKey='your-api-key'
                onInit={(evt, editor) => editorRefComment.current = editor}
                initialValue='ADD coment'
                init={{
                    height: 200,
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
                <div className='mt-3 mb-3'>
                    <button onClick={logComment} className='mr-3 btn btn-success'>Save</button>
                    <button onClick={() => { setVisibleComment(!visibleComment) }} className='mr-3 btn btn-primary'>Cancel</button>
                </div>
            </div> : <div onClick={() => { setVisibleComment(true) }} className="input-comment">
                <input type="text" placeholder="Add a comment ..." />
                <p>
                    <span style={{ fontWeight: 500, color: 'gray' }}>Protip:</span>
                    <span>press
                        <span style={{ fontWeight: 'bold', background: '#ecedf0', color: '#b4bac6' }}>M</span>
                        to comment</span>
                </p>
            </div>}

        </div>
    }

    const renderComment = () => {
        return visibleCommentBox?.map((cmt, index) => {

            if (user.id === cmt.idUser) {
                return <div key={index} className="display-comment mb-2" style={{ display: 'flex' }}>
                    <div className="avatar">
                        <img src={cmt.avatar} alt='123' />
                    </div>
                    {cmt.visible ? <div><Editor
                        name='description'
                        apiKey='your-api-key'
                        onInit={(evt, editor) => editorRefUpdateComment.current = editor}
                        initialValue={cmt.commentContent}
                        init={{
                            height: 150,
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
                        <div className='mt-3 mb-3'>
                            <button onClick={() => { logUpdateComment(cmt.id, index) }} className='mr-3 btn btn-success'>Save</button>
                            <button onClick={() => {
                                let newList = [...visibleCommentBox];
                                newList[index].visible = false;
                                console.log(newList)
                                setVisibleCommentBoX(newList)
                            }} className='mr-3 btn btn-primary'>Cancel</button>
                        </div>
                    </div> : <div>
                        <p style={{ marginBottom: 5 }}>
                            {cmt.name} <span>a month ago</span>
                        </p>
                        <div style={{}}>
                            {parse(cmt.commentContent)}
                        </div>
                        <div>
                            <span onClick={() => {
                                let newList = [...visibleCommentBox];
                                newList[index].visible = true;
                                console.log(newList)
                                setVisibleCommentBoX(newList)
                            }} style={{ color: '#929398', cursor: 'pointer' }}>Edit</span>
                            •
                            <span style={{ color: '#929398', cursor: 'pointer' }}
                                onClick={() => {
                                    dispatch({
                                        type: DEL_TASK_COMMENT_SAGA,
                                        cmtID: cmt.id,
                                        taskID: taskDetail.taskId
                                    })
                                }}
                            >Delete</span>
                        </div>
                    </div>}

                </div>
            } else {
                return <div key={index} className="display-comment mb-2" style={{ display: 'flex' }}>
                    <div className="avatar">
                        <img src={cmt.avatar} alt='123' />
                    </div>
                    <div>
                        <p style={{ marginBottom: 5 }}>
                            {cmt.name} <span>a month ago</span>
                        </p>
                        <div style={{}}>
                            {parse(cmt.commentContent)}
                        </div>
                    </div>
                </div>
            }
        })
    }

    return (
        <div>
            {/* <!-- Search Modal --> */}
            <div>
                <div className="modal fade" id="searchModal" role="dialog" aria-labelledby="searchModal" aria-hidden="true">
                    <div className="modal-dialog modal-search">
                        <div className="modal-content">
                            <div className="modal-header">
                                <div className="search-block">
                                    <input className="search" />
                                    <i className="fa fa-search" />
                                </div>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>RECENT ISSUES</p>
                                <div style={{ display: 'flex' }}>
                                    <div className="icon">
                                        <i className="fa fa-bookmark" />
                                    </div>
                                    <div>
                                        <p>cyberlearn</p>
                                        <p>BUG-238066</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Info Modal */}
                <div className="modal fade" id="infoModal" role="dialog" aria-labelledby="infoModal" aria-hidden="true">
                    <div className="modal-dialog modal-info">
                        <div className="modal-content">
                            <div className="modal-header">
                                <div className="task-title">
                                    <i className="fa fa-bookmark" />
                                    <span>TASK-{taskDetail?.taskId}</span>
                                </div>
                                <div style={{ display: 'flex' }} className="task-click">
                                    <div>
                                        <i className="fab fa-telegram-plane" />
                                        <span style={{ paddingRight: 20 }}>Give feedback</span>
                                    </div>
                                    <div>
                                        <i className="fa fa-link" />
                                        <span style={{ paddingRight: 20 }}>Copy link</span>
                                    </div>
                                    <div data-dismiss="modal" aria-label="Close" onClick={() => {
                                        dispatch({
                                            type: REMOVE_TASK,
                                            task: taskDetail
                                        })
                                    }}>
                                        <i className="fa fa-trash-alt = '123'" style={{ cursor: 'pointer' }} />
                                    </div>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                            </div>
                            <div className="modal-body">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-8">
                                            <p className="issue">{taskDetail.taskName}</p>
                                            <div className="description">
                                                <p onClick={() => {
                                                    setVisible(true)
                                                }}>Description</p>
                                                {renderDescription()}
                                            </div>

                                            <div className="comment">
                                                <h6>Comment</h6>
                                                <div className="block-comment" style={{ display: 'flex' }}>
                                                    <div className="avatar">
                                                        <img src={user.avatar} />
                                                    </div>
                                                    {renderInputComment()}
                                                </div>
                                                <div className="lastest-comment">
                                                    <div className="comment-item">
                                                        {renderComment()}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div className="status">
                                                <h6>STATUS</h6>
                                                <select name='statusId' value={taskDetail?.statusId} onChange={(e) => {
                                                    // setStatusid(e.target.value)
                                                    dispatch({
                                                        type: UPDATE_STATUS_TASK_SAGA,
                                                        actionType: UPDATE_TO_REDUCER_TASK,
                                                        name: 'statusId',
                                                        value: e.target.value,
                                                        listUserId: listMem
                                                    })
                                                }} className="custom-select">
                                                    {renderTaskCategory()}
                                                </select>
                                            </div>
                                            <div className="assignees">
                                                <h6>ASSIGNEES</h6>
                                                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                                    {renderUser()}
                                                    <Popover placement="bottom" content={content} trigger="click" style={{ display: 'flex', alignItems: 'center', }}>
                                                        <i className="fa fa-plus" style={{ marginRight: 5 }} /><span>Add more</span>
                                                    </Popover>
                                                </div>
                                            </div>
                                            <div className="reporter">
                                                <h6>REPORTER</h6>
                                                <div style={{ display: 'flex' }} className="item">
                                                    <div className="avatar">
                                                        <img src="./assets/img/download (1).jfif" alt='123' />
                                                    </div>
                                                    <p className="name">
                                                        Pickle Rick
                                                        <i className="fa fa-times" style={{ marginLeft: 5 }} />
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="priority" style={{ marginBottom: 20 }}>
                                                <h6>PRIORITY</h6>
                                                <select name='priorityId' value={taskDetail?.priorityId} onChange={(e) => {
                                                    dispatch({
                                                        type: UPDATE_STATUS_TASK_SAGA,
                                                        actionType: UPDATE_TO_REDUCER_TASK,
                                                        name: 'priorityId',
                                                        value: e.target.value,
                                                        listUserId: listMem
                                                    })
                                                }}>
                                                    {renderTaskPriorityCategory()}
                                                </select>
                                            </div>
                                            <div className="estimate">
                                                <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                                                <input name='originalEstimate' onChange={(e) => {
                                                    dispatch({
                                                        type: UPDATE_STATUS_TASK_SAGA,
                                                        actionType: UPDATE_TO_REDUCER_TASK,
                                                        name: 'originalEstimate',
                                                        value: e.target.value,
                                                        listUserId: listMem
                                                    })
                                                }} value={taskDetail.originalEstimate} type="number" className="estimate-hours" />
                                            </div>
                                            <div className="time-tracking">
                                                <h6>TIME TRACKING</h6>
                                                <div style={{ display: 'flex' }}>
                                                    <i className="fa fa-clock" />
                                                    <div style={{ width: '100%' }}>
                                                        <div className="progress">
                                                            <div className="progress-bar" role="progressbar" style={{ width: `${percentBar}%` }} aria-valuenow={taskDetail.timeTrackingSpent} aria-valuemin={0} aria-valuemax={Number(taskDetail.timeTrackingSpent) + Number(taskDetail.timeTrackingRemaining)} />
                                                        </div>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between' }} className='mt-2'>
                                                            <p className="logged text-left"> <input name='timeTrackingSpent' onChange={(e) => {
                                                                dispatch({
                                                                    type: UPDATE_STATUS_TASK_SAGA,
                                                                    actionType: UPDATE_TO_REDUCER_TASK,
                                                                    name: 'timeTrackingSpent',
                                                                    value: e.target.value,
                                                                    listUserId: listMem
                                                                })
                                                            }} style={{ width: '20%', background: 'transparent', border: 'none' }} className="estimate-hours pr-0 text-right" value={taskDetail.timeTrackingSpent}></input>h logged</p>

                                                            <p className="estimate-time text-right"><input name='timeTrackingRemaining' onChange={(e) => {
                                                                dispatch({
                                                                    type: UPDATE_STATUS_TASK_SAGA,
                                                                    actionType: UPDATE_TO_REDUCER_TASK,
                                                                    name: 'timeTrackingRemaining',
                                                                    value: e.target.value,
                                                                    listUserId: listMem
                                                                })
                                                            }} className='estimate-hours pr-0 text-right' style={{ width: '20%', background: 'transparent', border: 'none' }} value={taskDetail.timeTrackingRemaining}  ></input>h estimated</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ color: '#929398' }}>Create at a month ago</div>
                                            <div style={{ color: '#929398' }}>Update at a few seconds ago</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

