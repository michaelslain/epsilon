import React, { useState, useEffect, Fragment } from 'react'
import './cart.scss'
import Storage from '../cartApi'

import LoadingScreen from '../components/loadingScreen'
import CartItem from '../components/cartItem'
import Cta from '../components/cta'
import Footer from '../components/footer'

export default function Cart({
    fetchCartReloadCounter,
    handleFetchCartReload,
    products,
    canProduct,
    canCart,
}) {
    const [cartItems, setCartItems] = useState(null)
    const [totalProductPrice, setTotalProductPrice] = useState(null)
    const [tax, setTax] = useState(null)
    const [totalPrice, setTotalPrice] = useState(null)

    useEffect(() => {
        if (canCart && canProduct) handleFetchCart()
    }, [canCart, canProduct, fetchCartReloadCounter])

    const handleFetchCart = async () => {
        let items = await Storage.getItems()

        let newTotalPrice = 0

        items = items.map(item => {
            const product = products.find(
                product => product._id === item.productId
            )

            newTotalPrice += product.price

            return {
                id: item.id,
                amount: item.amount,
                name: product.name,
                price: product.price,
                productId: product._id,
            }
        })

        const newTax = (10 / 100) * newTotalPrice

        setTotalProductPrice(newTotalPrice)
        setCartItems(items)
        setTax(newTax)
        setTotalPrice(newTotalPrice + newTax)
    }

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    })

    if (cartItems == null) return <LoadingScreen />

    if (cartItems.length === 0) {
        return (
            <Fragment>
                <div className="no-items-container">
                    <div className="inner-container">
                        <i>
                            <h1 className="text">
                                There are no items in your cart
                            </h1>
                        </i>
                        <Cta link="/shop" className="cta-continue">
                            Continue Shopping
                        </Cta>
                    </div>
                </div>
                <Footer />
            </Fragment>
        )
    }

    return (
        <Fragment>
            <div className="cart-page">
                <div className="cart-container">
                    {cartItems.map(item => (
                        <CartItem
                            key={item.id}
                            data={item}
                            handleFetchCartReload={handleFetchCartReload}
                        />
                    ))}
                </div>
                <div className="checkout-container">
                    <div className="inner-container">
                        <div className="text-container">
                            <div className="price">
                                + {formatter.format(totalProductPrice)}
                            </div>
                            <div className="tax">+ {formatter.format(tax)}</div>
                            <div className="shipping">+ FREE SHIPPING</div>
                            <div className="total">
                                = {formatter.format(totalPrice)}
                            </div>
                        </div>
                        <Cta link="/checkout" className="checkout-cta">
                            Checkout
                        </Cta>
                    </div>
                </div>
            </div>
            <Footer />
        </Fragment>
    )
}
