import React, { useState, useEffect, useRef } from 'react'
import { Button, Space, Table, Popconfirm, message, Tag, Avatar, Popover, AutoComplete } from 'antd';
import HTMLReactParser from 'html-react-parser';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllProjectReducer } from '../../redux/reducers/GetAllProjectReducer';
import { ADD_PROJECT_EDIT, ASSIGN_USER_PROJECT, DEL_PROJECT, GET_ALLPROJECT, GET_PROJECT_DETAIL_MODAL, GET_USER, OPEN_FORM_EDIT, REMOVE_USER_PROJECT } from '../../redux/constants/CyberBugConst';

import { NavLink } from 'react-router-dom';
import FormEdit from './FormEdit';




const textPopover = <span>Add Members</span>;

export default function ProjectManagerment() {

    const listData = useSelector(state => state.GetAllProjectReducer.list)

    const [userSearch, setUserSearch] = useState('');

    const { getUser } = useSelector(state => state.InfoUserLogInReducer);


    //get list data
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: GET_ALLPROJECT })

    }, [])



    //Sorter and filter table
    const [filteredInfo, setFilteredInfo] = useState({});

    const [sortedInfo, setSortedInfo] = useState({});

    const handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        // setFilteredInfo(filters);
        // setSortedInfo(sorter);
    };

    const clearFilters = () => {
        setFilteredInfo({});
    };

    const clearAll = () => {
        setFilteredInfo({});
        setSortedInfo({});
    };

    const setAgeSort = () => {
        setSortedInfo({
            order: 'descend',
            columnKey: 'age',
        });
    };


    const userGetRef = useRef(null);



    //Table managerment
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',

        },
        {
            title: 'Project Name',
            dataIndex: 'projectName',
            key: 'projectName',
            render(text, record, index) {
                return <NavLink onClick={() => {

                }} color="green" to={`/main/${record.id}`} >{record.projectName}</NavLink>
            }
        },
        {
            title: 'Category Name',
            dataIndex: 'categoryName',
            key: 'categoryName',

        },
        {
            title: 'Creator',
            dataIndex: 'creator',
            key: 'creator',
            render(text, record, index) {
                return <Tag color="green">{record.creator?.name}</Tag>
            }
        },
        {
            title: 'Members',
            dataIndex: 'members',
            key: 'members',
            render(text, record, index) {
                return <div>
                    <Popover trigger="hover" content={() => {

                        const columns = [
                            {
                                title: 'User ID',
                                dataIndex: 'userId',
                                key: 'userId',
                            },
                            {
                                title: 'Name',
                                dataIndex: 'name',
                                key: 'name',
                            },
                            {
                                title: '',
                                key: '',
                                render(text, recordMember, index) {


                                    return <button onClick={() => {
                                        dispatch({
                                            type: REMOVE_USER_PROJECT,
                                            user: {
                                                "projectId": record.id,
                                                "userId": recordMember.userId
                                            }
                                        })
                                    }} className='btn btn-danger' style={{ borderRadius: '50%', fontSize: '10px' }}>X</button>
                                }
                            }
                        ];

                        return <Table size="small"

                            columnWidth={40} rowKey={"userId"} dataSource={record.members} columns={columns} />

                    }
                    } title="Member infor">
                        {record.members?.slice(0, 2).map((item, index) => {
                            return <Avatar key={index} src={item.avatar} />
                        })}
                        {record.members?.length > 2 ? <Avatar>...</Avatar> : ''}
                    </Popover >


                    < Popover placement="right" title={textPopover} content={() => {

                        return <AutoComplete
                            style={{
                                width: 200,
                            }}
                            onSearch={(value) => {

                                if (userGetRef.current) {
                                    clearTimeout(userGetRef.current)
                                }
                                userGetRef.current = setTimeout(() => {
                                    dispatch({
                                        type: GET_USER,
                                        user: value
                                    });
                                }, 200);


                            }}
                            placeholder="input here"
                            value={userSearch}
                            onSelect={(value, option) => {
                                dispatch({
                                    type: ASSIGN_USER_PROJECT,
                                    user: {
                                        "projectId": record.id,
                                        "userId": value
                                    }
                                })

                                setUserSearch(option.label)
                            }}

                            onChange={(value) => {
                                setUserSearch(value)
                            }}

                            options={getUser?.map((user, index) => ({
                                label: user.name, value: user.userId.toString()
                            }))}


                        />
                    }
                    } trigger="click" >
                        <Button style={{
                            borderRadius: '80%', paddingRight: '11px',
                            paddingLeft: '11px'
                        }}>+</Button>
                    </Popover >
                </div >
            }
        },
        {
            title: 'Action',
            key: 'action',
            render(text, record, index) {
                return <Space text="middle">
                    <button onClick={() => {

                        dispatch({
                            type: ADD_PROJECT_EDIT,
                            project: record
                        })

                        dispatch({
                            type: OPEN_FORM_EDIT,
                            Component: <FormEdit />
                        })


                    }}
                        type="button" className="btn btn-primary">
                        Edit
                    </button>
                    <Popconfirm placement="right" title="Do you want to delele this Project ?" onConfirm={() => {
                        dispatch({ type: DEL_PROJECT, projectID: record.id })
                    }} cancelText="No" okText="Yes" >
                        <button type="button" className="btn btn-danger" >Delete</button>
                    </Popconfirm>
                </Space>
            },
        },
    ];
    return (
        <div style={{ paddingLeft: '2%' }}>

            <h3 className='pt-3'>Project Managerment</h3>

            <Table size="middle" style={{ maxHeight: '500px' }} columns={columns} rowKey={"id"} dataSource={listData} onChange={handleChange} />
        </div>
    );
};
