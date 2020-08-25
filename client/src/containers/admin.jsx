import React, { useState } from 'react'
import './admin.scss'

import LoadingScreen from '../components/loadingScreen'
import AdminProduct from '../components/adminProduct'
import EditPop from '../components/editPop'
import AddPop from '../components/addPop'

export default function Admin({
    handleFetchProductReload,
    products,
    canProduct,
    setBanner,
}) {
    const [currentPage, setCurrentPage] = useState(0)
    const [editPop, setEditPop] = useState(null)
    const [showAddPop, setShowAddPop] = useState(false)

    if (!canProduct) return <LoadingScreen />

    const handleGoProductsPage = () => {
        const page = 0
        if (currentPage === page) return
        setCurrentPage(page)
    }
    const handleGoOrdersPage = () => {
        const page = 1
        if (currentPage === page) return
        setCurrentPage(page)
    }

    const handleOpenAddPop = () => setShowAddPop(true)

    const productsPage = (
        <div className="admin-page-products">
            {products.map(product => (
                <AdminProduct
                    key={product._id}
                    data={product}
                    handleFetchProductReload={handleFetchProductReload}
                    setEditPop={setEditPop}
                />
            ))}
            <div className="add-product" onClick={handleOpenAddPop}>
                Add Product
            </div>
            <EditPop
                data={editPop}
                setEditPop={setEditPop}
                handleFetchProductReload={handleFetchProductReload}
                setBanner={setBanner}
            />
            <AddPop
                showAddPop={showAddPop}
                setShowAddPop={setShowAddPop}
                handleFetchProductReload={handleFetchProductReload}
                setBanner={setBanner}
            />
        </div>
    )
    const ordersPage = <div className="admin-page-orders"></div>

    const page = currentPage === 0 ? productsPage : ordersPage

    return (
        <div className="admin-page">
            <div className="admin-header">
                <p className="tab" onClick={handleGoProductsPage}>
                    Products
                </p>
                <p className="tab" onClick={handleGoOrdersPage}>
                    Orders
                </p>
            </div>
            {page}
        </div>
    )
}
