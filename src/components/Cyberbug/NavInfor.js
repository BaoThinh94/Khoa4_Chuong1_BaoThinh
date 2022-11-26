import { DownOutlined } from '@ant-design/icons'
import React from 'react'
import { NavLink } from 'react-router-dom'

export default function NavInfor(props) {
    let { user } = props

    return (
        <div className='border-bottom text-right pr-5 pt-2'>

            {user.id ?
                <div className='d-flex justify-content-end mb-2'>
                    <p className='m-0'> Chào !, {user.name} <img style={{ borderRadius: '50%', width: '50px', height: '50px' }} src={user.avatar} alt={user.avatar}></img></p>
                    <div className='ml-2'>
                        <div style={{ height: '100%', cursor: 'pointer' }} className="d-flex align-items-center" data-toggle="dropdown">
                            <DownOutlined style={{ fontSize: '20px' }} />
                        </div>
                        <div className="dropdown-menu" style={{ top: '35px' }}>
                            <NavLink className="dropdown-item" to="/editinformation">Edit Information</NavLink>
                            <a className="dropdown-item" href="/" onClick={() => {
                                localStorage.clear();
                            }}>Log out</a>
                        </div>
                    </div>

                </div>


                : <NavLink to='/loginjira'>Log In !</NavLink>}

        </div>
    )
}
