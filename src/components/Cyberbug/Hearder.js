import React from 'react'

export default function Hearder(props) {
    let { proJectDetail } = props
    return (
        <div>
            <div className="header">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb" style={{ backgroundColor: 'white' }}>
                        <li className="breadcrumb-item">Project</li>
                        <li className="breadcrumb-item">CyberLearn</li>
                        <li className="breadcrumb-item active" aria-current="page">
                            {proJectDetail.projectName}
                        </li>
                    </ol>
                </nav>
            </div>
            <h3>{proJectDetail.projectName}</h3>
        </div>
    )
}
