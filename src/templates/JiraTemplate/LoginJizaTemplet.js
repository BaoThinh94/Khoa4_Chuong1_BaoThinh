import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import styled from 'styled-components';
import { useEffect, useState } from 'react';


const { Header, Content, Footer,Sider } = Layout;
export const LoginJiraTemplet = (props) => {


    let { Component, ...restParam } = props;

    const [{width ,height}, setSize] = useState({width:window.innerWidth, height:window.innerHeight});

    useEffect( () => {
        window.onresize = () =>{
            setSize ({
                width:window.innerWidth,
                height:window.innerWidth
            })
        }
    })

    return <Route  {...restParam} render={(propsRoute) => {

        return <>
            <Layout>
                <Sider width = {width/2} style={{
                    backgroundImage: `url(https://picsum.photos/${width/2}/${height})`,
                    height: height,
                    backgroundSize:'100%'
                }}
                >
                </Sider>
                <Content>
                    <Component {...propsRoute }/>
                </Content >
            </Layout>

        </>
    }} />
}
