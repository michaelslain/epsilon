import React from 'react'
import './adminProduct.scss'
import axios from 'axios'

export default function AdminProduct({
    data,
    handleFetchProductReload,
    setEditPop,
}) {
    const { _id, name, price, image, description } = data

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    })

    const handleDeleteProduct = async () => {
        await axios.delete(`/api/products/delete/${_id}`)
        handleFetchProductReload()
    }

    const handleEditPop = () => setEditPop({ _id, name, price, description })

    return (
        <div className="admin-product">
            <div className="image-container">
                <img src={`/api/${image}`} alt={name} className="image" />
            </div>
            <h1 className="name">{name}</h1>
            <h2 className="price">{formatter.format(price)}</h2>
            <div className="buttons-container">
                <div className="delete-button" onClick={handleDeleteProduct}>
                    Delete Product
                </div>
                <div className="edit-button" onClick={handleEditPop}>
                    Edit Product
                </div>
            </div>
        </div>
    )
}
