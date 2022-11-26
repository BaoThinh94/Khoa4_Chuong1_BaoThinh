import React from 'react'

export default function InforTask(props) {
    let { proJectDetail } = props

    const renderMember = () => {
        return proJectDetail.members?.map((user, index) => {
            return <div key={index} className="avatar">
                <img src={user.avatar} alt={user.avatar} />
            </div>
        })
    }

    return (
        <div className="info" style={{ display: 'flex' }}>
            <div className="search-block">
                <input className="search" />
                <i className="fa fa-search" />
            </div>
            <div className="avatar-group" style={{ display: 'flex' }}>
                {renderMember()}
            </div>
            <div style={{ marginLeft: 20 }} className="text">Only My Issues</div>
            <div style={{ marginLeft: 20 }} className="text">Recently Updated</div>
        </div>
    )
}
