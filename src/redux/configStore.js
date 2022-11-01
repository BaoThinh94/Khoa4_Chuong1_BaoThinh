import {applyMiddleware, combineReducers, createStore} from 'redux';
import ToDoListReducer from './reducers/ToDoListReducer'
import LoadingReducer from './reducers/LoadingReducer';
import HistoryReducer from './reducers/HistoryReducer';
import InfoUserLogInReducer from './reducers/InfoUserLogInReducer';
import {ProjectCategoryReducer} from './reducers/ProjectCategoryReducer';
import {GetAllProjectReducer} from './reducers/GetAllProjectReducer';
import {ProjectManagermentEditReducer} from './reducers/ProjectManagermentEditReducer';
import {ModalReducer} from './reducers/ModalReducer'
import reduxThunk from 'redux-thunk'


//middleware saga
import createMiddleWareSaga from 'redux-saga';
import { rootSaga } from './sagas/rootSaga';
const middleWareSaga = createMiddleWareSaga();


const rootReducer = combineReducers({
    //reducer khai báo tại đây
    ToDoListReducer,
    LoadingReducer,
    ModalReducer,
    HistoryReducer,
    InfoUserLogInReducer,
    ProjectCategoryReducer,
    GetAllProjectReducer,
    ProjectManagermentEditReducer,


})

const store = createStore(rootReducer,applyMiddleware(reduxThunk,middleWareSaga));

//Gọi saga
middleWareSaga.run(rootSaga);


export default store;

