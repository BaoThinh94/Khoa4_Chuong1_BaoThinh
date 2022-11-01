import { USER_LOG } from "../../util/constants/settingSystem"

let uSerlogin = {}

if (localStorage.getItem(USER_LOG)) {
    uSerlogin = JSON.parse(localStorage.getItem(USER_LOG))
}

const stateUseLog = {
    useLogin: uSerlogin
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = stateUseLog, action) => {
    switch (action.type) {
        case 'ADD_USER_LOG': {
            state.useLogin = action.user;
            return { ...state }
        }
        default: return { ...state }
    }
}