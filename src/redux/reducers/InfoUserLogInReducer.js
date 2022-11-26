import { USER_LOG } from "../../util/constants/settingSystem"
import { ADD_USER_LOG, GET_USER_LIST } from "../constants/CyberBugConst"

let uSerlogin = {}

if (localStorage.getItem(USER_LOG)) {
    uSerlogin = JSON.parse(localStorage.getItem(USER_LOG))
}

const stateUseLog = {
    useLogin: uSerlogin,
    getUser: []
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = stateUseLog, action) => {
    switch (action.type) {
        case ADD_USER_LOG: {
            state.useLogin = action.user;
            return { ...state }
        }

        case GET_USER_LIST: {
            state.getUser = action.userList;

            return { ...state }
        }
        default: return { ...state }
    }
}