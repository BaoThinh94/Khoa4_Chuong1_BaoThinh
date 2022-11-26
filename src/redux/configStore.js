import { applyMiddleware, combineReducers, createStore } from 'redux';

import LoadingReducer from './reducers/LoadingReducer';
import HistoryReducer from './reducers/HistoryReducer';
import InfoUserLogInReducer from './reducers/InfoUserLogInReducer';
import { ProjectCategoryReducer } from './reducers/ProjectCategoryReducer';
import { GetAllProjectReducer } from './reducers/GetAllProjectReducer';
import { GetprojectDetailReducer } from './reducers/GetprojectDetailReducer';
import { ProjectManagermentEditReducer } from './reducers/ProjectManagermentEditReducer';
import { ModalReducer } from './reducers/ModalReducer'
import { TaskReducer } from './reducers/TaskReducer'
import { TaskDetailReducer } from './reducers/TaskDetailReducer'
import { ModalTaskGetProjectDetail } from './reducers/ModalTaskGetProjectDetail'
import reduxThunk from 'redux-thunk'
import { UserManagerReducer } from './reducers/UserManagerReducer'
import { UserEditReducer } from './reducers/UserEditReducer'
import { ModalConfirmReducer } from './reducers/ModalConfirmReducer'

//middleware saga
import createMiddleWareSaga from 'redux-saga';
import { rootSaga } from './sagas/rootSaga';
const middleWareSaga = createMiddleWareSaga();


const rootReducer = combineReducers({
    //reducer khai báo tại đây
    LoadingReducer,
    ModalReducer,
    HistoryReducer,
    InfoUserLogInReducer,
    ProjectCategoryReducer,
    GetAllProjectReducer,
    ProjectManagermentEditReducer,
    GetprojectDetailReducer,
    TaskReducer,
    TaskDetailReducer,
    ModalTaskGetProjectDetail,
    UserManagerReducer,
    UserEditReducer,
    ModalConfirmReducer


})

const store = createStore(rootReducer, applyMiddleware(reduxThunk, middleWareSaga));

//Gọi saga
middleWareSaga.run(rootSaga);


export default store;

