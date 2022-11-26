import { ADD_USER_EDIT_TO_REDUCER } from "../constants/CyberBugConst"



const stateDefault = {
    userEdit: {}


}


export const UserEditReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case ADD_USER_EDIT_TO_REDUCER: {
            return { ...state, userEdit: action.user }
        }

        default: return { ...state }
    }
}