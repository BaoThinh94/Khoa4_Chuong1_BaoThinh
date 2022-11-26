import { call, delay, put, select, takeLatest } from "redux-saga/effects"
import { cyberbugService } from "../../services/CyberbugService"
import { userManagerService } from "../../services/UserManagerService"
import { openNotificationWithIcon } from "../../util/constants/settingNotifycation"
import { STATUS_CODE, TOKEN, USER_LOG } from "../../util/constants/settingSystem"
import { ADD_LIST_ALL_USER, ADD_USER_LOG, CLOSE_FORM, DEL_USER, EDIT_USER_CALL_API_SAGA, EDIT_USER_SAGA, GET_ALL_USER_MANAGERMENT_SAGA, OPEN_MODAL_CONFIRM, USER_LOGIN_CYBERBUG } from "../constants/CyberBugConst"
import { DISPLAY_LOADING, HIDE_LOADING } from "../constants/LoadingConst"



function* UserManagerMentSaga(action) {
    let { user } = action

    yield put({
        type: DISPLAY_LOADING
    })

    try {
        let { data, status } = yield call(() => {
            return userManagerService.getAllUser(user)
        })
        if (status == STATUS_CODE.SUCCESS) {

            yield put({
                type: ADD_LIST_ALL_USER,
                listUser: data.content
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

export function* TrackingUserManagerMentSaga() {
    yield takeLatest(GET_ALL_USER_MANAGERMENT_SAGA, UserManagerMentSaga)
}

function* EditUserSaga(action) {
    let { user } = action
    let newUser

    yield put({
        type: DISPLAY_LOADING
    })

    try {
        let { data, status } = yield call(() => {
            return cyberbugService.loginUser(user)
        })

        if (status == STATUS_CODE.SUCCESS) {
            if (user.newPassWord && user.newPassWord != '') {
                newUser = { ...user, passWord: user.newPassWord }
            } else {
                newUser = { ...user }
            }

            yield put({
                type: EDIT_USER_CALL_API_SAGA,
                userApi: newUser
            })
        }

    } catch (err) {
        console.log(err)
        yield call(() => {
            openNotificationWithIcon('error', 'Mật khẩu không hợp lệ'
            )
        })

    }
    yield put({
        type: HIDE_LOADING
    })
}

export function* TrackingEditUserSaga() {
    yield takeLatest(EDIT_USER_SAGA, EditUserSaga)
}


function* EditFormSaga(action) {
    let { userApi } = action

    try {
        let { data, status } = yield call(() => {
            return userManagerService.editUserInfor(userApi)
        })
        if (status == STATUS_CODE.SUCCESS) {

            let userLocal = yield select(state => state.InfoUserLogInReducer.useLogin)
            if (userLocal.id == userApi.id) {
                console.log(userApi)
                if (userApi.newPassWord && userApi.newPassWord != '') {
                    yield put({
                        type: OPEN_MODAL_CONFIRM,
                        userLogin: userApi
                    })
                } else {
                    yield put({
                        type: USER_LOGIN_CYBERBUG,
                        userLogin: userApi
                    })
                }
            }

            yield call(() => {
                openNotificationWithIcon('success', data.content
                )
            })
            yield put({
                type: CLOSE_FORM
            })
            yield put({
                type: GET_ALL_USER_MANAGERMENT_SAGA,
                user: ''
            })

        }
    } catch (err) {
        console.log(err)
        yield call(() => {
            openNotificationWithIcon('error', 'Mật khẩu không hợp lệ'
            )
        })

    }

}


export function* TrackingEditFormSaga() {
    yield takeLatest(EDIT_USER_CALL_API_SAGA, EditFormSaga)
}



function* DelUserSaga(action) {
    let { userID } = action

    yield put({
        type: DISPLAY_LOADING
    })

    try {
        let { data, status } = yield call(() => {
            return userManagerService.deleteUser(userID)
        })
        console.log(data)
        if (status == STATUS_CODE.SUCCESS) {

            yield put({
                type: GET_ALL_USER_MANAGERMENT_SAGA,
                user: ''
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

export function* TrackingDelUserSaga() {
    yield takeLatest(DEL_USER, DelUserSaga)
}