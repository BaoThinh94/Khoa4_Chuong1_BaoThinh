import { call, put, takeLatest } from "redux-saga/effects";
import { projectService } from "../../services/ProjectService";
import { STATUS_CODE } from "../../util/constants/settingSystem";
import { GET_PROJECT_DETAIL, GET_PROJECT_DETAILSAGA } from "../constants/CyberBugConst";

function* GetProJectDetailSaga(action) {
    if (action.IdProject) {
        try {

            let { data, status } = yield call(() => { return projectService.getprojectDetail(action.IdProject) })

            if (status === STATUS_CODE.SUCCESS) {
                yield put({
                    type: GET_PROJECT_DETAIL,
                    Idproject: data.content
                })
            }

        } catch (err) {
            console.log(err)
        }
    }

}

export function* TrackingGetProJectDetailSaga() {
    yield takeLatest(GET_PROJECT_DETAILSAGA, GetProJectDetailSaga)
}