import React from 'react'
import './loadingScreen.scss'

export default function LoadingScreen({ style }) {
    return (
        <div className="loading-screen" style={style}>
            <div className="text">
                Loading<font className="dot">.</font>
                <font className="dot">.</font>
                <font className="dot">.</font>
            </div>
        </div>
    )
}
