// import React from 'react'

import CreateTask from "../../components/Cyberbug/CreateTask"
import FormEdit from "../../components/Cyberbug/FormEdit"
import { CLOSE_FORM, OPEN_CREATE_TASK_FORM, OPEN_FORM_EDIT, OPEN_USER_EDIT } from "../constants/CyberBugConst"

const stateDefault = {
    setOpen: false,
    title: '',
    ComponentContent: <p> default </p>,


}


export const ModalReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case OPEN_FORM_EDIT: {
            return { ...state, setOpen: true, title: 'Edit form', ComponentContent: action.Component }
        }

        case CLOSE_FORM: {
            state.setOpen = false;
            return { ...state, setOpen: false }
        }

        case OPEN_CREATE_TASK_FORM: {
            return { ...state, setOpen: true, title: 'Create Task', ComponentContent: action.Component }
        }

        case OPEN_USER_EDIT: {
            return { ...state, setOpen: true, title: 'Edit User Information', ComponentContent: action.Component }
        }

        default: return { ...state }
    }
}