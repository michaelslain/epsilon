import React from 'react'
import './admin.scss'

import LoadingScreen from '../components/loadingScreen'

export default function Admin({
    handleFetchProductReload,
    products,
    canProduct,
    setBanner,
}) {
    if (!canProduct) return <LoadingScreen />

    return <div className="admin-page"></div>
}
