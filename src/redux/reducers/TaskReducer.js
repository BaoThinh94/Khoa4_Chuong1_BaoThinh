import { PUT_TO_TASK_CATEGORY_PRIORITY_REDUCER, PUT_TO_TASK_CATEGORY_REDUCER, PUT_TO_TASK_TYPE_REDUCER } from "../constants/CyberBugConst"

const stateDefault = {
    taskCategory: [],
    taskPriorityCategory: [],
    taskTypeCatelogy: []
}

export const TaskReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case PUT_TO_TASK_CATEGORY_REDUCER: {

            return { ...state, taskCategory: action.taskCategory }
        }
        case PUT_TO_TASK_CATEGORY_PRIORITY_REDUCER: {

            return { ...state, taskPriorityCategory: action.taskPriorityCategory }
        }
        case PUT_TO_TASK_TYPE_REDUCER: {

            return { ...state, taskTypeCatelogy: action.listTypeTask }
        }
        default: return { ...state }


    }
}