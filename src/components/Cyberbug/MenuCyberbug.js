import React from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { GET_ALLPROJECT } from '../../redux/constants/CyberBugConst';

export default function MenuCyberbug() {

    return (
        <div className="menu">
            <div className="account">
                <div className="avatar">
                    <img src={require("../../assets/img/download.jfif")} alt='123' />
                </div>
                <div className="account-info">
                    <p>CyberLearn.vn</p>
                    <p>Report bugs</p>
                </div>
            </div>
            <div className="control">
                <div>
                    <NavLink style={{ color: 'rgba(0, 0, 0, 0.85)' }} activeClassName="activeNavlink" activeStyle={{
                        fontWeight: 'bold',
                        color: 'blue'
                    }}
                        to='/main/:projectid'>
                        <i className="fa fa-credit-card" />
                        <span> Cyber Board</span>
                    </NavLink>
                </div>
                <div>
                    <NavLink style={{ color: 'rgba(0, 0, 0, 0.85)' }} activeClassName="activeNavlink" activeStyle={{ fontWeight: 'bold', color: 'blue' }} to='/createproject'>
                        <i className="fa fa-cog" />
                        <span> Project Settings</span>
                    </NavLink>
                </div>
                <div>
                    <NavLink style={{ color: 'rgba(0, 0, 0, 0.85)' }} activeClassName="activeNavlink" activeStyle={{ fontWeight: 'bold', color: 'blue' }} to='/projectmanagerment'>
                        <i className="fa fa-cog" />
                        <span> Project Managerment</span>
                    </NavLink>
                </div>
                <div>
                    <NavLink style={{ color: 'rgba(0, 0, 0, 0.85)' }} activeClassName="activeNavlink" activeStyle={{ fontWeight: 'bold', color: 'blue' }} to='/usermanagerment'>
                        <i className="fa fa-cog" />
                        <span> User Managerment</span>
                    </NavLink>
                </div>
            </div>
            <div className="feature">
                <div>
                    <i className="fa fa-truck" />
                    <span>Releases</span>
                </div>
                <div>
                    <i className="fa fa-equals" />
                    <span>Issues and filters</span>
                </div>
                <div>
                    <i className="fa fa-paste" />
                    <span>Pages</span>
                </div>
                <div>
                    <i className="fa fa-location-arrow" />
                    <span>Reports</span>
                </div>
                <div>
                    <i className="fa fa-box" />
                    <span>Components</span>
                </div>
            </div>
        </div>

    )
}
