import { Button, Modal } from 'antd';
import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { CLOSE_MODAL_CONFIRM } from '../../redux/constants/CyberBugConst';

export default function ModalConfirm(props) {

    const { history } = props
    const { setIsModalOpen } = useSelector(state => state.ModalConfirmReducer)
    const dispatch = useDispatch()


    const handleOk = () => {
        localStorage.clear()
        history.push('/loginjira')
        dispatch({
            type: CLOSE_MODAL_CONFIRM
        })
    };
    const handleCancel = () => {
        dispatch({
            type: CLOSE_MODAL_CONFIRM
        })
    };
    return (
        <>
            <Modal open={setIsModalOpen} onOk={handleOk} onCancel={handleCancel}>
                Do you want to login again
            </Modal>
        </>
    );
}
