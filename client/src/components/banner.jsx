import React, { useEffect, Fragment } from 'react'
import './banner.scss'

export default function Banner({ banner, setBanner }) {
    useEffect(() => {
        if (banner != null) {
            setTimeout(() => {
                setBanner(null)
            }, 3000)
        }
    }, [banner, setBanner])

    if (banner == null) return <Fragment />

    const { type, text } = banner

    let classes = 'banner '
    if (type === 'error') classes += 'error'
    else classes += 'good'

    return (
        <div className={classes}>
            <p className="banner-text">{text}</p>
        </div>
    )
}
