import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    BarsOutlined,
    PlusOutlined,
    SearchOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { OPEN_CREATE_TASK_FORM } from '../../redux/constants/CyberBugConst';
import CreateTask from './CreateTask';
const { Header, Sider, Content } = Layout;


export default function SideBarCyberbug() {
    const dispatch = useDispatch()
    const [collapsed, setCollapsed] = useState(true);
    return (
        <Layout style={{
            height: window.innerHeight,
            minWidth: '100px'
        }}
        >
            <Sider style={{
            }} trigger={null} collapsible collapsed={collapsed}>

                <div className='d-flex justify-content-end pr-2'>
                    <button
                        onClick={() => { setCollapsed(!collapsed) }}
                        className="site-layout-background mt-2 mb-4"
                        style={{
                            padding: '0 4px',

                            fontSize: '15px',
                        }}
                    >
                        <BarsOutlined />
                    </button>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <SearchOutlined />,
                            label: (<span onClick={() => { console.log('a') }}>Search Issue</span>),
                        },
                        {

                            key: '2',
                            icon: <PlusOutlined />,
                            label: (<span onClick={() => {
                                dispatch({
                                    type: OPEN_CREATE_TASK_FORM,
                                    Component: <CreateTask />
                                })
                            }}>Create Task</span>),

                        },
                    ]}
                />
            </Sider>
        </Layout>
    );
}
