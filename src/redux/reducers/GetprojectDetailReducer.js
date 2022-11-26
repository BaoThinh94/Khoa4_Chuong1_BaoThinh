import { GET_PROJECT_DETAIL } from "../constants/CyberBugConst";

const stateDefault = {
    proJectDetail: {

    }
}

export const GetprojectDetailReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case GET_PROJECT_DETAIL: {
            return { ...state, proJectDetail: action.Idproject }
        }
        default: return { ...state };
    }
}