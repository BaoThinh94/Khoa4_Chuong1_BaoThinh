import { all } from "redux-saga/effects";
import Todolist from "../../pages/Todolist/Todolist";
import TodolistRFC from "../../pages/Todolist/TodolistRFC";
import * as ToDoListSaga from './ToDoListSaga'
import * as CyberBugSaga from './CyberBugSaga'
// import {theoDoiActionGetTaskApi} from './ToDoListSaga'


export function* rootSaga() {

  yield all([
    //Nghiệp vụ theo dõi các action saga todolist
    ToDoListSaga.theoDoiActionGetTaskApi(),
    ToDoListSaga.theoDoiActionAddTaskApi(),
    ToDoListSaga.theoDoiActionDeleteTask(),
    ToDoListSaga.theoDoiDoneTask(),
    ToDoListSaga.theoDoiRejectTask(),
    //Nghiệp ...

    CyberBugSaga.theoDoiActionLoginCyberBug(),
    CyberBugSaga.trackGetProjectCategorySaga(),
    CyberBugSaga.trackingCreateProjectAuthorizeSaga(),
    CyberBugSaga.trackingGetAllProjectSaga(),
    CyberBugSaga.trackingDeleteProjectSaga(),
    CyberBugSaga.trackingUpdateProjectSaga(),
  ])


}