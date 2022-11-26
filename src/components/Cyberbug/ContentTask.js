import { AutoComplete } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GET_TASK_DETAIL_SAGA, UPDATE_STATUS_TASK_DRAG_DROP_SAGA } from '../../redux/constants/CyberBugConst'
import { TaskReducer } from '../../redux/reducers/TaskReducer'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

const parse = require('html-react-parser');

export default function ContentTask(props) {
    const { proJectDetail } = props
    const dispatch = useDispatch()

    console.log(proJectDetail)
    const renderHeaderTask = () => {
        return proJectDetail.lstTask?.map((item, index) => {
            return <div key={index} className="card" style={{ width: '20rem', height: 'auto' }}
            >
                <div className="card-header">
                    {item.statusName}
                </div>
                <Droppable droppableId={item.statusId} key={index}>
                    {(provided) => {
                        return <ul
                            style={{ minHeigh: '600px', height: 'auto' }}
                            key={index}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="list-group list-group-flush">
                            {renderTaskDetail(item)}
                            {provided.placeholder}
                        </ul>
                    }}
                </Droppable>

            </div>


        })
    }

    const renderTaskDetail = (item) => {
        return item.lstTaskDeTail?.map((taskItem, index) => {
            return <Draggable key={taskItem.taskId.toString()} index={index} draggableId={taskItem.taskId.toString()} isDropDisabled={false} >
                {(provided) => {
                    return <li onClick={() => {
                        dispatch({
                            type: GET_TASK_DETAIL_SAGA,
                            task: taskItem.taskId
                        })
                    }}
                        data-toggle="modal"
                        data-target="#infoModal"
                        key={index} className="list-group-item"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        {parse(taskItem.taskName)}
                        <div className="block" style={{ display: 'flex' }}>
                            <div className="block-left">
                                <i className="fa fa-bookmark" />
                                <i className="fa fa-arrow-up" />
                            </div>
                            <div className="block-right">

                                <div className="avatar-group" style={{ display: 'flex' }}>
                                    {renderMemberTask(taskItem)}
                                </div>
                            </div>
                        </div>
                    </li>
                }
                }
            </Draggable>
        })
    }

    const renderMemberTask = (item) => {
        return item.assigness?.map((memberTask, index) => {
            return <div key={index} className="avatar">
                <img src={memberTask.avatar} alt={memberTask.avatar} />
            </div>
        })
    }

    const handleDragEnd = (value) => {
        console.log(value)
        let { destination, source, draggableId } = value

        if (!destination) {
            return
        }

        if (destination.droppableId == source.droppableId) {
            return
        }

        dispatch({
            type: UPDATE_STATUS_TASK_DRAG_DROP_SAGA,
            projectId: proJectDetail.id,
            task: {
                taskId: draggableId,
                statusId: destination.droppableId
            }
        })


    }

    const handleDragUpdate = (value) => {
        console.log(value)
        let { destination, source, draggableId } = value

        if (!destination) {
            return
        }

        if (destination.droppableId == source.droppableId) {
            return
        }

        dispatch({
            type: UPDATE_STATUS_TASK_DRAG_DROP_SAGA,
            projectId: proJectDetail.id,
            task: {
                taskId: draggableId,
                statusId: destination.droppableId
            }
        })
    }

    return (
        <DragDropContext onDragEnd={handleDragEnd} onDragUpdate={handleDragUpdate} >
            <div className="content" style={{ display: 'flex' }}>
                {renderHeaderTask()}
            </div>
        </DragDropContext>
    )
}
