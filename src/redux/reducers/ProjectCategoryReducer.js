import { GET_PROJECT_CATEGORY, SET_PROJECT_CATEGORY } from "../constants/CyberBugConst"


const defaultState = {
    content:[]
}


export const ProjectCategoryReducer = (state = defaultState, action) => {
    switch (action.type){
        case SET_PROJECT_CATEGORY: {
            state.content = action.content;
            return { ...state}
        }   
        default: return { ...state }
    }
} 