import { Route } from "react-router-dom"
import MenuCyberbug from '../../components/Cyberbug/MenuCyberbug'
import SideBarCyberbug from '../../components/Cyberbug/SideBarCyberbug'


export const CyberBugTemplate = (props) => {
    let {Component, ...restProps} = props

    return <Route { ...restProps} render = {(propsRoutes) => {
        return<div className='jira'>
        <SideBarCyberbug/>
        <MenuCyberbug/>
        <Component {...propsRoutes}/>
    </div>
    }}/>
}