import React, { useState, useEffect } from 'react'
import { Button, Space, Table } from 'antd';
import HTMLReactParser from 'html-react-parser';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllProjectReducer } from '../../redux/reducers/GetAllProjectReducer';
import { ADD_PROJECT_EDIT, DEL_PROJECT, GET_ALLPROJECT } from '../../redux/constants/CyberBugConst';
import { DELETE_TASK_API } from '../../redux/constants/ToDoListConst';
import ModalProjectManager from './ModalProjectManager';

export default function ProjectManagerment() {

    let listData = useSelector(state => state.GetAllProjectReducer.list)
    
    let dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: GET_ALLPROJECT })
    }, [])

    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});
    const handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setFilteredInfo(filters);
        setSortedInfo(sorter);
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

        },
        {
            title: 'Category Name',
            dataIndex: 'categoryName',
            key: 'categoryName',

        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render(text, record, index) {
                let jsx = HTMLReactParser(text);
                return <div>
                    {jsx}
                </div>

            }
        },
        {
            title: 'Action',
            key: 'action',
            render ( text, record, index) {
              return <Space text="middle">
                <button onClick={() => {dispatch({type:ADD_PROJECT_EDIT, project:record})}} type="button" className="btn btn-primary" data-toggle="modal" data-target="#projectmanagerment">
                    Edit
                </button>
                <button onClick={() => {dispatch({type:DEL_PROJECT, projectID:record.id})}} type="button" className="btn btn-danger" >
                Delete
                </button>
              </Space>
            },
        },
    ];
    return (
        <div className='mt-5 ml-5 w-60' style={{ width: '70%' }}>
            <ModalProjectManager/>
            <h3>Project Managerment</h3>
            {/* <Space
                style={{
                    marginBottom: 16,
                }}
            >
                <Button onClick={setAgeSort}>Sort age</Button>
                <Button onClick={clearFilters}>Clear filters</Button>
                <Button onClick={clearAll}>Clear filters and sorters</Button>
            </Space> */}
            <Table columns={columns} rowKey={"id"} dataSource={listData} onChange={handleChange} />
        </div>
    );
};
