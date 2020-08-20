import React from 'react'
import './cartItem.scss'
import Storage from '../cartApi'
import { useHistory } from 'react-router-dom'
import Cta from './cta'

export default function CartItem({ data, handleFetchCartReload }) {
    let { id, name, price, amount, productId } = data
    const history = useHistory()

    if (name.length > 20) {
        name = name.slice(0, 21 - 3)
        name += '...'
    }
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    })

    const handleDeleteItem = async () => {
        await Storage.removeItem({ id })
        handleFetchCartReload()
    }

    return (
        <div className="cart-item">
            <div className="square"></div>
            <p className="name">{name}</p>
            <p className="price">{formatter.format(price)}</p>
            <p className="amount">{amount}</p>
            <Cta clear={true} link={`/product/${productId}`} className="visit">
                Visit
            </Cta>
            <div className="delete" onClick={handleDeleteItem}>
                X
            </div>
        </div>
    )
}
