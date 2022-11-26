import { all } from "redux-saga/effects";
import * as CyberBugSaga from './CyberBugSaga'
import * as ProjectSaga from './ProjectSaga'
import * as TaskSaga from './TaskSaga'
import * as SignUpSaga from './SignUpSaga'
import * as UserManagerSaga from './UserManagerSaga'

// import {theoDoiActionGetTaskApi} from './ToDoListSaga'


export function* rootSaga() {

  yield all([

    CyberBugSaga.theoDoiActionLoginCyberBug(),
    CyberBugSaga.trackGetProjectCategorySaga(),
    CyberBugSaga.trackingCreateProjectAuthorizeSaga(),
    CyberBugSaga.trackingGetAllProjectSaga(),
    CyberBugSaga.trackingDeleteProjectSaga(),
    CyberBugSaga.trackingUpdateProjectSaga(),
    CyberBugSaga.trackingGetUser(),
    CyberBugSaga.trackingAssignUserProjectSaga(),
    CyberBugSaga.trackingRemoveUserProjectSaga(),

    ProjectSaga.TrackingGetProJectDetailSaga(),

    TaskSaga.TrackingGetAllTaskCategorySaga(),
    TaskSaga.TrackingGetTaskPriorityCategorySaga(),
    TaskSaga.TrackingGetAllProjectChosseTaskSaga(),
    TaskSaga.TrackingGetTaskTypeAllSaga(),
    TaskSaga.TrackingCreateTaskSaga(),
    TaskSaga.TrackingGetTaskDetailSaga(),
    TaskSaga.TrackingGetProjectDetailSaga(),
    TaskSaga.TrackingUpdateStatusTask(),
    TaskSaga.TrackingUpdateStatusTaskDragAndDropSaga(),
    TaskSaga.TrackingInseartCommentSaga(),
    TaskSaga.TrackingRemoveUserFromTaskSaga(),
    TaskSaga.TrackingremoveTaskSaga(),
    TaskSaga.TrackingUptdateTaskCommentSaga(),
    TaskSaga.TrackingDeleteTaskCommentSaga(),

    SignUpSaga.TrackingSignUpSaga(),

    UserManagerSaga.TrackingUserManagerMentSaga(),
    UserManagerSaga.TrackingEditUserSaga(),
    UserManagerSaga.TrackingDelUserSaga(),
    UserManagerSaga.TrackingEditFormSaga()
  ])


}