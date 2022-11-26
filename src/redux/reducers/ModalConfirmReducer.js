import { CLOSE_MODAL_CONFIRM, OPEN_MODAL_CONFIRM } from "../constants/CyberBugConst"


const stateDefault = {
    setIsModalOpen: false,

}


export const ModalConfirmReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case OPEN_MODAL_CONFIRM: {
            return { ...state, setIsModalOpen: true }
        }

        case CLOSE_MODAL_CONFIRM: {
            return { ...state, setIsModalOpen: false }
        }


        default: return { ...state }
    }
}