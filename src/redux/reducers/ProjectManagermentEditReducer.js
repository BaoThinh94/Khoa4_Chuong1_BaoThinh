import { ADD_PROJECT_EDIT } from "../constants/CyberBugConst"



const stateDefault = {
    editProject: {}
}

export const ProjectManagermentEditReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case ADD_PROJECT_EDIT: {
            let neweditProject = { ...state, editProject: action.project }
            state = neweditProject;

            return { ...state }
        } default: return { ...state }
    }
}

