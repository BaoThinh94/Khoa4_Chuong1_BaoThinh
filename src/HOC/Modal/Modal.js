import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { CLOSE_FORM } from '../../redux/constants/CyberBugConst';

export default function Modal(props) {

    // const [open, setOpen] = useState(false);

    let { setOpen, ComponentContent, title } = useSelector(state => state.ModalReducer)
    let dispatch = useDispatch()

    const onClose = () => {
        return dispatch({
            type: CLOSE_FORM
        })
    };
    return (
        <>
            <Drawer
                title={title}
                width={720}
                onClose={onClose}
                open={setOpen}
                bodyStyle={{
                    paddingBottom: 80,
                }}
            >   <div>
                    {ComponentContent}
                </div>
            </Drawer>
        </>
    );
}
