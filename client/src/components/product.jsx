import React from 'react'
import './product.scss'

import Cta from './cta'

export default function Product({ data }) {
    const { name, price, image } = data

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    })

    const url = `/product/${data._id}`

    return (
        <div className="product">
            <div className="image-container">
                <img src={`/api/${image}`} alt={name} className="image" />
            </div>
            <h1 className="name">{name}</h1>
            <h2 className="price">{formatter.format(price)}</h2>
            <Cta className="cta" link={url}>
                Visit Product
            </Cta>
        </div>
    )
}
