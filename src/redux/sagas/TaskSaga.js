import { notification } from "antd"
import { useSelector } from "react-redux"
import { call, put, select, takeLatest } from "redux-saga/effects"
import { projectService, ProjectService } from "../../services/ProjectService"
import { taskService, TaskService } from "../../services/TaskService"
import { openNotificationWithIcon } from "../../util/constants/settingNotifycation"
import { STATUS_CODE, USER_LOG } from "../../util/constants/settingSystem"
import { ADD_LIST_ALL_PROJECT_USER_LOCAL, ADD_LIST_ALL_TYPE_TASK, CREATE_TASK_SAGA, DEL_TASK_COMMENT_SAGA, GET_ALL_PROJECT_CHOSSE_TASK_SAGA, GET_ALL_TASK_CATEGORY, GET_ALL_TASK_CATEGORY_PRIORITY, GET_ALL_TYPE_TASK_SAGA, GET_PROJECT_DETAILSAGA, GET_PROJECT_DETAIL_MODAL, GET_TASK_DETAIL_SAGA, INSERT_COMMENT_TASK, PUT_T0_MODAL_PROJECT_DETAIL_REDUCER, PUT_T0_TASK_REDUCER, PUT_TO_TASK_CATEGORY_PRIORITY_REDUCER, PUT_TO_TASK_CATEGORY_REDUCER, PUT_TO_TASK_TYPE_REDUCER, REMOVE_TASK, REMOVE_USER_FROM_TASK, RUPDATE_TASK_COMMENT_SAGA, UPDATE_STATUS_TASK_DRAG_DROP, UPDATE_STATUS_TASK_DRAG_DROP_SAGA, UPDATE_STATUS_TASK_SAGA, UPDATE_TASK_COMMENT_SAGA } from "../constants/CyberBugConst"

function* GetAllTaskCategorySaga() {
    try {
        let { data, status } = yield call(() => {
            return taskService.getTaskCategory()
        })

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: PUT_TO_TASK_CATEGORY_REDUCER,
                taskCategory: data.content
            })
        }


    } catch (err) {
        console.log(err)
    }
}

export function* TrackingGetAllTaskCategorySaga() {
    yield takeLatest(GET_ALL_TASK_CATEGORY, GetAllTaskCategorySaga)
}

function* GetTaskPriorityCategorySaga() {
    try {
        let { data, status } = yield call(() => {
            return taskService.getTaskPriorityCategory()
        })
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: PUT_TO_TASK_CATEGORY_PRIORITY_REDUCER,
                taskPriorityCategory: data.content
            })
        }


    } catch (err) {
        console.log(err)
    }
}

export function* TrackingGetTaskPriorityCategorySaga() {
    yield takeLatest(GET_ALL_TASK_CATEGORY_PRIORITY, GetTaskPriorityCategorySaga)
}

function* GetAllProjectChosseTaskSaga() {
    let list = []
    let userLocal = JSON.parse(localStorage.getItem(USER_LOG))

    try {
        let { data, status } = yield call(() => {
            return taskService.getAllProjectChosseTask()
        })

        if (status === STATUS_CODE.SUCCESS) {
            for (let i = 0; i < data.content.length; i++) {
                if (data.content[i].creator.id === userLocal.id) {
                    list.push(data.content[i])
                }
            }
            yield put({
                type: ADD_LIST_ALL_PROJECT_USER_LOCAL,
                listProject: list
            })

        }

    } catch (err) {
        console.log(err)
    }
}

export function* TrackingGetAllProjectChosseTaskSaga() {
    yield takeLatest(GET_ALL_PROJECT_CHOSSE_TASK_SAGA, GetAllProjectChosseTaskSaga)
}

function* GetTaskTypeAllSaga() {

    try {
        let { data, status } = yield call(() => {
            return taskService.getTaskTypeAll()
        })
        if (status === STATUS_CODE.SUCCESS) {

            yield put({
                type: PUT_TO_TASK_TYPE_REDUCER,
                listTypeTask: data.content
            })

        }

    } catch (err) {
        console.log(err)
    }
}

export function* TrackingGetTaskTypeAllSaga() {
    yield takeLatest(GET_ALL_TYPE_TASK_SAGA, GetTaskTypeAllSaga)
}

function* CreateTaskSaga(action) {


    try {
        let { data, status } = yield call(() => {
            return taskService.createTask(action.task)
        })
        console.log(data)
        if (status === STATUS_CODE.SUCCESS) {
            yield call(() => {
                openNotificationWithIcon('success', 'tạo thành công'
                )
            })
        } else {

        }

    } catch (err) {
        console.log(err)
        yield call(() => {
            openNotificationWithIcon('error', err.response.data.message
            )
        })
    }
}

export function* TrackingCreateTaskSaga() {
    yield takeLatest(CREATE_TASK_SAGA, CreateTaskSaga)
}

function* GetTaskDetailSaga(action) {

    try {
        let { data, status } = yield call(() => {
            return taskService.getTaskDetail(action.task)
        })

        console.log(data)
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: PUT_T0_TASK_REDUCER,
                task: data.content
            })
        } else {

        }

    } catch (err) {
        console.log(err)

    }
}

export function* TrackingGetTaskDetailSaga() {
    yield takeLatest(GET_TASK_DETAIL_SAGA, GetTaskDetailSaga)
}

function* GetProjectDetailSaga(action) {
    if (action.projectID !== 0) {
        try {
            let { data, status } = yield call(() => {
                return projectService.getprojectDetail(action.projectID)
            })
            // console.log(data)
            if (status === STATUS_CODE.SUCCESS) {
                yield put({
                    type: PUT_T0_MODAL_PROJECT_DETAIL_REDUCER,
                    Idproject: data.content
                })
            } else {

            }
        } catch (err) {
            console.log(err)

        }
    }

}

export function* TrackingGetProjectDetailSaga() {
    yield takeLatest(GET_PROJECT_DETAIL_MODAL, GetProjectDetailSaga)
}

function* UpdateStatusTask(action) {
    let { actionType, name, value, listUserId } = action
    yield put({
        type: actionType,
        name: name,
        value: value,
        listUserId: listUserId
    }
    )

    let { taskDetail } = yield select(state => state.TaskDetailReducer)
    console.log(taskDetail)

    try {
        let { data, status } = yield call(() => {
            return taskService.updateTask(taskDetail)
        })

        console.log(data)
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_PROJECT_DETAILSAGA,
                IdProject: taskDetail.projectId
            })

            yield put({
                type: GET_TASK_DETAIL_SAGA,
                task: taskDetail.taskId
            })


        }
    } catch (err) {
        console.log(err)
    }
}

export function* TrackingUpdateStatusTask() {
    yield takeLatest(UPDATE_STATUS_TASK_SAGA, UpdateStatusTask)
}


function* UpdateStatusTaskDragAndDropSaga(action) {
    let { task, projectId } = action
    console.log(projectId)
    try {
        let { data, status } = yield call(() => {
            return taskService.updateStatus(task)
        })

        console.log(data)

        if (status == STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_PROJECT_DETAILSAGA,
                IdProject: projectId
            })
        }

    } catch (err) {
        console.log(err)
    }
}

export function* TrackingUpdateStatusTaskDragAndDropSaga() {
    yield takeLatest(UPDATE_STATUS_TASK_DRAG_DROP_SAGA, UpdateStatusTaskDragAndDropSaga)
}

function* inseartCommentSaga(action) {
    let { comment } = action

    try {
        let { data, status } = yield call(() => {
            return taskService.insertComment(comment)
        })

        console.log(data)

        if (status == STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASK_DETAIL_SAGA,
                task: comment.taskId
            })
        }

    } catch (err) {
        console.log(err)
    }
}

export function* TrackingInseartCommentSaga() {
    yield takeLatest(INSERT_COMMENT_TASK, inseartCommentSaga)
}

function* removeUserFromTaskSaga(action) {
    let { user } = action
    console.log(user)
    try {
        let { data, status } = yield call(() => {
            return taskService.removeUserFromTask(user)
        })

        console.log(data)

        if (status == STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASK_DETAIL_SAGA,
                task: user.taskId
            })
        }

    } catch (err) {
        console.log(err)
    }
}

export function* TrackingRemoveUserFromTaskSaga() {
    yield takeLatest(REMOVE_USER_FROM_TASK, removeUserFromTaskSaga)
}

function* removeTaskSaga(action) {
    let { task } = action
    console.log(task)
    try {
        let { data, status } = yield call(() => {
            return taskService.removeTask(task.taskId)
        })

        console.log(data)

        if (status == STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_PROJECT_DETAILSAGA,
                IdProject: task.projectId
            })
        }

    } catch (err) {
        console.log(err)
    }
}

export function* TrackingremoveTaskSaga() {
    yield takeLatest(REMOVE_TASK, removeTaskSaga)
}

function* UptdateTaskCommentSaga(action) {
    let { content, commentID, taskID } = action
    try {
        let { data, status } = yield call(() => {
            return taskService.updateComment(commentID, content)
        })
        if (status == STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASK_DETAIL_SAGA,
                task: taskID
            })
        }

    } catch (err) {
        console.log(err)
    }
}

export function* TrackingUptdateTaskCommentSaga() {
    yield takeLatest(UPDATE_TASK_COMMENT_SAGA, UptdateTaskCommentSaga)
}

function* DeleteTaskCommentSaga(action) {
    let { cmtID, taskID } = action
    try {
        let { data, status } = yield call(() => {
            return taskService.deleteComent(cmtID)
        })

        console.log(data)

        if (status == STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASK_DETAIL_SAGA,
                task: taskID
            })
        }

    } catch (err) {
        console.log(err)
    }
}

export function* TrackingDeleteTaskCommentSaga() {
    yield takeLatest(DEL_TASK_COMMENT_SAGA, DeleteTaskCommentSaga)
}