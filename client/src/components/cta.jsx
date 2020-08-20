import React from 'react'
import './cta.scss'
import { Link } from 'react-router-dom'

export default function Cta({
    children,
    style,
    link,
    clear = false,
    callback,
    className,
}) {
    let classes = 'cta '
    if (clear === true) classes += 'clear'

    if (link === 'none') {
        return (
            <a
                className={`${classes} ${className}`}
                style={style}
                onClick={callback}
            >
                {children}
            </a>
        )
    }

    return (
        <Link
            to={link}
            className={`${classes} ${className}`}
            style={style}
            onClick={callback}
        >
            {children}
        </Link>
    )
}
