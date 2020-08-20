import React, { Fragment } from 'react'
import './shop.scss'

import LoadingScreen from '../components/loadingScreen'
import Product from '../components/product'
import Footer from '../components/footer'
import CoolBackground from '../components/coolBackground'

export default function Shop({ products, canProduct }) {
    if (!canProduct) return <LoadingScreen />

    const main =
        products.length === 0 ? (
            <div className="no-products-container">
                <i>
                    <h1 className="text">
                        There are currently no products in store
                    </h1>
                </i>
            </div>
        ) : (
            <div className="shop-showcase">
                {products.map(data => (
                    <Product key={data._id} data={data} />
                ))}
            </div>
        )

    return (
        <Fragment>
            {main}
            <Footer style={{ marginTop: 100 }} />
            {/* <CoolBackground /> */}
        </Fragment>
    )
}
