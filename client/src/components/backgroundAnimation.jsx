import React, { useState, useEffect } from 'react'
import './backgroundAnimation.scss'
import { useHistory } from 'react-router-dom'

export default function BackgroundAnimation({ children }) {
    const [classes, setClasses] = useState('no-animation')
    const history = useHistory()

    const handlePlayAnimation = () => {
        setClasses('no-animation')
        setTimeout(() => setClasses('animation'), 1)
    }

    useEffect(() => {
        handlePlayAnimation()
    }, [])

    useEffect(() => {
        return history.listen(handlePlayAnimation)
    }, [history])

    return <div className={'background-animation ' + classes}>{children}</div>
}
