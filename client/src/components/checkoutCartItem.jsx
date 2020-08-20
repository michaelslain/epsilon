import React from 'react'
import './checkoutCartItem.scss'

export default function CheckoutCartItem({ item }) {
    let { id, name, price, amount, productId } = item

    if (name.length > 20) {
        name = name.slice(0, 21 - 3)
        name += '...'
    }
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    })

    return (
        <div className="checkout-cart-item">
            <p className="name">{name}</p>
            <p className="price">{formatter.format(price)}</p>
            <p className="amount">{amount}</p>
        </div>
    )
}
