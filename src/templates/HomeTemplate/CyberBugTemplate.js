import { useSelector } from "react-redux"
import { Route } from "react-router-dom"
import MenuCyberbug from '../../components/Cyberbug/MenuCyberbug'
import NavInfor from "../../components/Cyberbug/NavInfor"
import SideBarCyberbug from '../../components/Cyberbug/SideBarCyberbug'


export const CyberBugTemplate = (props) => {
    let { Component, ...restProps } = props
    const user = useSelector(state => state.InfoUserLogInReducer.useLogin)
    return <Route {...restProps} render={(propsRoutes) => {
        return <div className='jira'>
            <SideBarCyberbug />
            <MenuCyberbug />
            <div className='w-60' style={{ width: '74%', height: window.innerHeight }}>
                <NavInfor user={user} />
                <Component {...propsRoutes} />
            </div>

        </div>
    }} />
}