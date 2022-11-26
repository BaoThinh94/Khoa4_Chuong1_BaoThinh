import React, { useEffect } from 'react'
import ContentTask from './ContentTask'
import Hearder from './Hearder'
import InforTask from './InforTask'
import { useDispatch, useSelector } from 'react-redux'
import { GET_PROJECT_DETAILSAGA } from '../../redux/constants/CyberBugConst'
import { GetprojectDetailReducer } from '../../redux/reducers/GetprojectDetailReducer'

export default function MainCyberbug(props) {
    const dispatch = useDispatch();

    const { proJectDetail } = useSelector(state => state.GetprojectDetailReducer)

    useEffect(() => {
        dispatch({
            type: GET_PROJECT_DETAILSAGA,
            IdProject: props.match.params.projectid
        })
    }, [])

    return (
        <div className="main">
            <Hearder proJectDetail={proJectDetail} />
            <InforTask proJectDetail={proJectDetail} />
            <ContentTask proJectDetail={proJectDetail} />
        </div>

    )
}
