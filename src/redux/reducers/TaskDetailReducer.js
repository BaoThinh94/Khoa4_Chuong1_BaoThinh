import { PUT_T0_TASK_REDUCER, UPDATE_TO_REDUCER_TASK } from "../constants/CyberBugConst"

const stateDefault = {
    taskDetail: {
        listUserAsign: [

        ],
        taskName: "string",
        description: "string",
        statusId: "string",
        originalEstimate: 0,
        timeTrackingSpent: 0,
        timeTrackingRemaining: 0,
        projectId: 0,
        typeId: 0,
        priorityId: 0
    }
}

export const TaskDetailReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case PUT_T0_TASK_REDUCER: {
            state.taskDetail = action.task
            return { ...state }
        }
        case UPDATE_TO_REDUCER_TASK: {
            let { name, value, listUserId } = action
            let newTask = { ...state.taskDetail, [name]: value, listUserAsign: listUserId }

            state.taskDetail = newTask
            return { ...state }
        }


        default: return { ...state }


    }
}