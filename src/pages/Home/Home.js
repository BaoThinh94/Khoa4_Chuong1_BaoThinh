import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import InfoUserLogInReducer from '../../redux/reducers/InfoUserLogInReducer'

export default function Home(props) {
    
    let user = useSelector ( state => state.InfoUserLogInReducer.useLogin)
    console.log(user);

    return (
        <div>
            email: {user.email}
            <br/>
            <img src={user.avatar}/>
        </div>
    )
}



