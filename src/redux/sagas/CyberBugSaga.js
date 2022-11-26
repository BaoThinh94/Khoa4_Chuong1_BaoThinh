import Axios from 'axios'
import { call, delay, fork, take, takeEvery, takeLatest, put, select } from 'redux-saga/effects'
import { CyberbugService, cyberbugService } from '../../services/CyberbugService'

import { STATUS_CODE, TOKEN, USER_LOG } from '../../util/constants/settingSystem'
import { ADD_LIST_ALL_PROJECT, ADD_USER_LOG, ASSIGN_USER_PROJECT, CLOSE_FORM, CREATE_NEWPROJECT_AUTHORIZE, DEL_PROJECT, GET_ALLPROJECT, GET_LIST_ALL_PROJECT, GET_PROJECT_CATEGORY, GET_USER, GET_USER_LIST, REMOVE_USER_PROJECT, SET_PROJECT_CATEGORY, UPDATE_PROJECT, USER_LOGIN_CYBERBUG } from '../constants/CyberBugConst'
import { DISPLAY_LOADING, HIDE_LOADING } from '../constants/LoadingConst'
import { useSelector, useDispatch } from 'react-redux';
import HistoryReducer from '../reducers/HistoryReducer'
import { openNotificationWithIcon } from '../../util/constants/settingNotifycation'


// eslint-disable-next-line require-yield
function* loginCyberBug(action) {
    yield put({
        type: DISPLAY_LOADING
    })

    yield delay(300);

    try {
        let { userLogin } = action;
        let { data, status } = yield call(() => {
            return cyberbugService.loginUser(userLogin);
        });

        localStorage.setItem(TOKEN, data.content.accessToken)
        localStorage.setItem(USER_LOG, JSON.stringify(data.content))

        yield put({
            type: ADD_USER_LOG,
            user: data.content
        })
        const history = yield select(state => state.HistoryReducer.history)
        history.push('/projectmanagerment')

    } catch (err) {
        console.log(err)
        yield call(() => {
            openNotificationWithIcon('error', err.response.data.message
            )
        })
    }

    yield put({
        type: HIDE_LOADING
    })


}

export function* theoDoiActionLoginCyberBug() {
    yield takeLatest(USER_LOGIN_CYBERBUG, loginCyberBug)
}


function* getProjectCategorySaga() {
    try {
        let { data, status } = yield call(cyberbugService.getProjectCategory)
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: SET_PROJECT_CATEGORY,
                content: data.content
            })
        }
    } catch (err) {

    }
}


export function* trackGetProjectCategorySaga() {
    yield takeLatest(GET_PROJECT_CATEGORY, getProjectCategorySaga)
}


function* createProjectAuthorizeSaga(action) {
    yield put({
        type: DISPLAY_LOADING
    })

    yield delay(300);

    try {
        let { data, status } = yield call(() => { return cyberbugService.createProjectAuthorize(action.newProject) })

        if (status == STATUS_CODE.SUCCESS) {
            yield call(() => {
                openNotificationWithIcon('success', data.message
                )
            })
        }
    } catch (err) {
        console.log(err)
        yield call(() => {
            openNotificationWithIcon('error', err.response.data.message
            )
        })
    }

    yield put({
        type: HIDE_LOADING
    })

}

export function* trackingCreateProjectAuthorizeSaga() {
    yield takeLatest(CREATE_NEWPROJECT_AUTHORIZE, createProjectAuthorizeSaga)
}

function* getAllProjectSaga() {


    yield put({
        type: DISPLAY_LOADING
    })

    try {
        let { data, status } = yield call(cyberbugService.getAllProject)
        if (status == STATUS_CODE.SUCCESS) {
            yield put({
                type: ADD_LIST_ALL_PROJECT,
                listProject: data.content
            })

        }
    } catch (err) {
        console.log(err)
        yield call(() => {
            openNotificationWithIcon('error', err.response.data.message
            )
        })
    }

    yield put({
        type: HIDE_LOADING
    })

}

export function* trackingGetAllProjectSaga() {
    yield takeLatest(GET_ALLPROJECT, getAllProjectSaga)
}

function* deleteProject(action) {

    yield put({
        type: DISPLAY_LOADING
    })

    try {
        let { data, status } = yield call(() => { return cyberbugService.deleteProject(action.projectID) })
        if (status == STATUS_CODE.SUCCESS) {

            yield put({
                type: GET_ALLPROJECT
            })

            yield call(() => {
                openNotificationWithIcon('success', 'Xóa thành công')
            })
        } else {
            yield call(() => {
                openNotificationWithIcon('error', 'Lỗi xóa không thành công')
            })
        }
    } catch (err) {

        yield call(() => {

            return openNotificationWithIcon('error', 'Lỗi xóa không thành công')
        })
        console.log(err)
    }

    yield put({
        type: HIDE_LOADING
    })

}

export function* trackingDeleteProjectSaga() {
    yield takeLatest(DEL_PROJECT, deleteProject)
}

function* updateProject(action) {

    let { projectID, projectValue } = action;


    yield put({
        type: DISPLAY_LOADING
    })

    try {
        let { data, status } = yield call(() => { return cyberbugService.updateProject(projectID, projectValue) })
        console.log(data)
        console.log(status)
        if (status == STATUS_CODE.SUCCESS) {
            yield delay(500)
            yield put({
                type: GET_ALLPROJECT
            })
            yield put({
                type: CLOSE_FORM
            })
            yield call(() => {
                openNotificationWithIcon('success', data.message
                )
            })
        }
    } catch (err) {
        console.log(err)
        yield call(() => {
            openNotificationWithIcon('error', err.response.data.message
            )
        })
    }

    yield put({
        type: HIDE_LOADING
    })



}

export function* trackingUpdateProjectSaga() {
    yield takeLatest(UPDATE_PROJECT, updateProject)
}

function* getUser(action) {
    try {
        let { data, status } = yield call(() => { return cyberbugService.getUser(action.user) })
        if (status == STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_USER_LIST,
                userList: data.content
            })
        }
    } catch (err) {
        console.log(err)
    }

}

export function* trackingGetUser() {
    yield takeLatest(GET_USER, getUser)
}


function* assignUserProjectSaga(action) {
    console.log(action.user)
    try {
        let { data, status } = yield call(() => { return cyberbugService.assignUserProject(action.user) })

        if (status == STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALLPROJECT
            })
            yield call(() => {
                openNotificationWithIcon('success', data.content
                )
            })
        }
    } catch (err) {
        console.log(err)
        yield call(() => {
            openNotificationWithIcon('error', err.response.data.message
            )
        })
    }

}

export function* trackingAssignUserProjectSaga() {
    yield takeLatest(ASSIGN_USER_PROJECT, assignUserProjectSaga)
}

function* removeUserProjectSaga(action) {
    console.log(action.user)
    try {
        let { data, status } = yield call(() => { return cyberbugService.removeUserProject(action.user) })
        console.log(data)
        console.log(status)

        if (status == STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALLPROJECT
            })
            yield call(() => {
                openNotificationWithIcon('success', data.content
                )
            })
        }
    } catch (err) {
        console.log(err)
        yield call(() => {
            openNotificationWithIcon('error', err.response.data.message
            )
        })
    }

}

export function* trackingRemoveUserProjectSaga() {
    yield takeLatest(REMOVE_USER_PROJECT, removeUserProjectSaga)
}