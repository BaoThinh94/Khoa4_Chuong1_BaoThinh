import { ADD_LIST_ALL_PROJECT } from "../constants/CyberBugConst"



const stateDefault = {
    list: []
}

export const GetAllProjectReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case ADD_LIST_ALL_PROJECT: {
            state.list = action.listProject
            return { ...state }
        } default: return { ...state }
    }
}