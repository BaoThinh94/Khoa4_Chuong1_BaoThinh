import { ADD_HISTORY } from "../constants/CyberBugConst";


const stateHistory = {
    history:{}
}

// eslint-disable-next-line import/no-anonymous-default-export
export  default   ( state = stateHistory, action) => {
    switch(action.type){
        case ADD_HISTORY: {
            
            state.history = action.history;
            return {...state}
        }
        default: return {...state}
    }
}