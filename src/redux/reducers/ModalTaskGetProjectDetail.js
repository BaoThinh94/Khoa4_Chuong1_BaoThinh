import { PUT_T0_MODAL_PROJECT_DETAIL_REDUCER } from "../constants/CyberBugConst";

const stateDefault = {
    proJectDetail: {

    }
}

export const ModalTaskGetProjectDetail = (state = stateDefault, action) => {
    switch (action.type) {
        case PUT_T0_MODAL_PROJECT_DETAIL_REDUCER: {
            return { ...state, proJectDetail: action.Idproject }
        }
        default: return { ...state };
    }
}