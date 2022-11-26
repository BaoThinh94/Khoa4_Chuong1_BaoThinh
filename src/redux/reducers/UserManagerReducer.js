import { ADD_LIST_ALL_USER } from "../constants/CyberBugConst"

const stateDefault = {
    userList: [],
}

export const UserManagerReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case ADD_LIST_ALL_USER: {
            state.userList = action.listUser
            return { ...state }
        }
        default: return { ...state }
    }
}