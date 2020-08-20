import React from 'react'
import './tab.scss'
import { Link } from 'react-router-dom'

export default function Tab({ children, link, style, className }) {
    return (
        <Link to={link} className={`header-tab ${className}`} style={style}>
            {children}
        </Link>
    )
}
