import { call, delay, put, select, takeLatest } from "redux-saga/effects";
import { signUpService } from "../../services/SignUpService";
import { openNotificationWithIcon } from "../../util/constants/settingNotifycation";
import { STATUS_CODE } from "../../util/constants/settingSystem";
import { SIGN_UP } from "../constants/CyberBugConst";
import { DISPLAY_LOADING, HIDE_LOADING } from "../constants/LoadingConst";

function* SignUpSaga(action) {
    let { user } = action

    yield put({
        type: DISPLAY_LOADING
    })

    try {
        let { data, status } = yield call(() => {
            return signUpService.signUp(user)
        })
        console.log(data)
        if (status == STATUS_CODE.SUCCESS) {
            yield delay(500)
            yield call(() => {
                openNotificationWithIcon('success', data.message
                )
            })

            const history = yield select(state => state.HistoryReducer.history)

            history.push('/loginjira')
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

export function* TrackingSignUpSaga() {
    yield takeLatest(SIGN_UP, SignUpSaga)
}