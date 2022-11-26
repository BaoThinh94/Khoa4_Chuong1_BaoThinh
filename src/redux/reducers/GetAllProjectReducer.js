import { ADD_LIST_ALL_PROJECT, ADD_LIST_ALL_PROJECT_USER_LOCAL } from "../constants/CyberBugConst"



const stateDefault = {
    list: [],
    listProjectUser: []
}

export const GetAllProjectReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case ADD_LIST_ALL_PROJECT: {
            state.list = action.listProject
            return { ...state }
        }

        case ADD_LIST_ALL_PROJECT_USER_LOCAL: {
            state.listProjectUser = action.listProject
            return { ...state }
        }
        default: return { ...state }
    }
}