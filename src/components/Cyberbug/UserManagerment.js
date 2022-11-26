import { InputNumber, Popconfirm, Space, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_USER_EDIT_TO_REDUCER, DEL_USER, GET_ALL_USER_MANAGERMENT_SAGA, OPEN_FORM_EDIT, OPEN_USER_EDIT } from '../../redux/constants/CyberBugConst'
import EditUser from './EditUser'


export default function UserManagerment() {

    const dispatch = useDispatch()
    const [search, setSearch] = useState('')
    const { userList } = useSelector(state => state.UserManagerReducer)

    useEffect(() => {
        dispatch({
            type: GET_ALL_USER_MANAGERMENT_SAGA,
            user: search
        })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch({
            type: GET_ALL_USER_MANAGERMENT_SAGA,
            user: search
        })
    }

    const columns = [
        {
            title: 'STT',
            key: 'email',
            render(text, record, index) {
                return index
            }
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Action',
            key: 'action',
            render(text, record, index) {
                return <Space text="middle">
                    <button onClick={() => {

                        dispatch({
                            type: ADD_USER_EDIT_TO_REDUCER,
                            user: record
                        })

                        dispatch({
                            type: OPEN_USER_EDIT,
                            Component: <EditUser />
                        })
                    }}
                        type="button" className="btn-primary">
                        Edit
                    </button>
                    <Popconfirm placement="right" title="Do you want to delele this User ?" onConfirm={() => {

                        dispatch({ type: DEL_USER, userID: record.userId })
                    }} cancelText="No" okText="Yes" >
                        <button type="button" className=" btn-danger" >Delete</button>
                    </Popconfirm>
                </Space>
            }
        },
    ];

    return (
        <div className='pt-3' style={{ paddingLeft: '2%' }}>
            <h3>User Managerment</h3>
            <div >
                <form onSubmit={handleSubmit}>
                    <input name='search' placeholder="Search..." style={{ width: '80%', padding: '5px 10px', height: '100%' }}
                        onChange={(e) => {
                            setSearch(e.target.value)
                        }}
                    ></input>
                    <button className='btn btn-success ml-2' type="submit" style={{ padding: '2px 12px' }} >Search</button>
                </form>
            </div>

            <div className='mt-3'>
                <Table rowKey={"userId"} dataSource={userList} columns={columns} />;
            </div>
        </div>
    )
}
