import Axios from 'axios'
import { call, delay, fork, take, takeEvery, takeLatest, put, select } from 'redux-saga/effects'
import { CyberbugService, cyberbugService } from '../../services/CyberbugService'
import { todoList } from '../../services/ToDoListService'
import { STATUS_CODE, TOKEN, USER_LOG } from '../../util/constants/settingSystem'
import { ADD_LIST_ALL_PROJECT, CREATE_NEWPROJECT_AUTHORIZE, DEL_PROJECT, GET_ALLPROJECT, GET_LIST_ALL_PROJECT, GET_PROJECT_CATEGORY, SET_PROJECT_CATEGORY, USER_LOGIN_CYBERBUG } from '../constants/CyberBugConst'
import { DISPLAY_LOADING, HIDE_LOADING } from '../constants/LoadingConst'
import { useSelector, useDispatch } from 'react-redux';
import HistoryReducer from '../reducers/HistoryReducer'


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
            type: 'ADD_USER_LOG',
            user: data.content
        })
        const history = yield select(state => state.HistoryReducer.history)

        history.push('/main')

    } catch (err) {
        console.log('err')
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
    } catch (err) {
        console.log(err)
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
            // let user = yield select(state => state.InfoUserLogInReducer.useLogin)
            
            
            // for (let item in data.content){
            //     if (data.content[item].creator.id == user.id){
            //         listProject.push(data.content[item])
            //     }
            // }
            yield put ({
                type: ADD_LIST_ALL_PROJECT,
                listProject:data.content
            })
            
        }
    } catch (err) {
        console.log(err)
    }

    yield put({
        type: HIDE_LOADING
    })

}

export function* trackingGetAllProjectSaga() {
    yield takeLatest(GET_ALLPROJECT, getAllProjectSaga)
}

function* deleteProject(action) {

    console.log(action.projectID)

    yield put({
        type: DISPLAY_LOADING
    })

    try {
        let { data, status } = yield call( () => {return cyberbugService.deleteProject(action.projectID)})
        console.log(data)
        console.log(status)
        if (status == STATUS_CODE.SUCCESS) {
           
            yield put ({
                type:GET_ALLPROJECT
            })
            
        }
    } catch (err) {
        console.log(err)
    }

    yield put({
        type: HIDE_LOADING
    })

}

export function* trackingDeleteProjectSaga() {
    yield takeLatest(DEL_PROJECT, deleteProject)
}