import React, { useState, useEffect, useRef, Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import { PayPalButton } from 'react-paypal-button-v2'
import './checkout.scss'

import Cta from '../components/cta'
import CartApi from '../cartApi'
import Footer from '../components/footer'
import LoadingScreen from '../components/loadingScreen'
import CheckoutCartItem from '../components/checkoutCartItem'

export default function Checkout({
    products,
    canProduct,
    canCart,
    handleFetchCartReload,
    setBanner,
}) {
    const [cartItems, setCartItems] = useState(null)
    const [totalPrice, setTotalPrice] = useState(null)
    const [currentPage, setCurrentPage] = useState(0)
    const [address, setAddress] = useState('')
    const [addressIsValid, setAddressIsValid] = useState(false)

    const history = useHistory()
    const windowRef = useRef(null)

    useEffect(() => {
        if (canCart && canProduct) handleGetCart()
    }, [canCart, canProduct])

    useEffect(() => {
        handleIsAddressValid()
    }, [address])

    const handleGetCart = async () => {
        if (products.length === 0) handleRedirect()
        let items = await CartApi.getItems()
        if (items.length === 0) handleRedirect()

        let totalPrice = 0
        items = items.map(item => {
            const product = products.find(
                product => product._id === item.productId
            )

            totalPrice += product.price
            item.price = product.price
            item.name = product.name
            return item
        })

        totalPrice += (10 / 100) * totalPrice
        setTotalPrice(totalPrice)
        setCartItems(items)
    }

    const handleRedirect = () => history.push('/shop')

    const handleNextpage = () => {
        if (currentPage === 2) return
        if (currentPage === 1) {
            if (!addressIsValid) return
        }
        setCurrentPage(currentPage + 1)
    }
    const handleGoReviewCart = () => {
        const page = 0
        if (currentPage === page) return
        setCurrentPage(page)
    }
    const handleGoAddressForm = () => {
        const page = 1
        if (currentPage === page) return
        setCurrentPage(page)
    }
    const handleGoPayment = () => {
        if (!addressIsValid) return
        const page = 2
        if (currentPage === page) return
        setCurrentPage(page)
    }

    const handleUpdateAddress = e => setAddress(e.target.value)

    const handleIsAddressValid = () => {
        setAddressIsValid(true)

        const validCountries = [
            'america',
            'usa',
            'us',
            'united states',
            'united states of america',
        ]

        let tokens = address.split(' ')

        tokens = tokens.filter(token => token !== '')

        if (tokens.length === 0) return
        if (tokens.length < 5) return
        if (Number.isNaN(Number(tokens[0]))) return

        if (tokens[0].length < 3) return

        if (
            !tokens.join('').includes('unitedstates') &&
            !tokens.join('').includes('unitedstatesofamerica') &&
            !validCountries.includes(tokens[tokens.length - 1].toLowerCase())
        )
            return

        setAddressIsValid(true)
    }

    const handleOnSuccess = () => {
        setBanner({
            type: 'good',
            text: 'Your payment is complete and the order is on your way!',
        })

        CartApi.clearCart()
        handleFetchCartReload()
        history.push('/cart')
    }
    const handleOnError = () =>
        setBanner({
            type: 'error',
            text: 'An error has occured, transaction is cancelled',
        })

    if (cartItems == null) return <LoadingScreen />

    const right =
        currentPage === 0
            ? 0
            : currentPage === 1
            ? windowRef.current.offsetWidth
            : windowRef.current.offsetWidth * 2

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    })

    return (
        <Fragment>
            <div className="checkout-page">
                <div className="tabs-container">
                    <p
                        className="tab"
                        onClick={handleGoReviewCart}
                        style={{ color: currentPage === 0 ? 'white' : null }}
                    >
                        Review Cart
                    </p>
                    <p
                        className="tab"
                        onClick={handleGoAddressForm}
                        style={{ color: currentPage === 1 ? 'white' : null }}
                    >
                        Address Form
                    </p>
                    <p
                        className="tab"
                        onClick={handleGoPayment}
                        style={{ color: currentPage === 2 ? 'white' : null }}
                    >
                        Payment
                    </p>
                </div>
                <div className="window" ref={windowRef}>
                    <div className="reel" style={{ right: `${right}px` }}>
                        <div className="page review-cart">
                            <h1 className="total-price">
                                Total Price: {formatter.format(totalPrice)}
                            </h1>
                            <div className="cart-item-container">
                                {cartItems.map(cartItem => (
                                    <CheckoutCartItem
                                        key={cartItem.id}
                                        item={cartItem}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="page address-form">
                            <p className="address-label">
                                Type in your address (House Num, Street, City,
                                Country)
                            </p>
                            <input
                                type="text"
                                name="address"
                                className="address-field"
                                onChange={handleUpdateAddress}
                                style={{
                                    borderColor: !addressIsValid
                                        ? '#f56042'
                                        : null,
                                }}
                            />
                        </div>
                        <div className="page checkout-form">
                            <div className="paypal-container">
                                <PayPalButton
                                    shippingPreference="NO_SHIPPING"
                                    amount={String(totalPrice)}
                                    currency="USD"
                                    style={{
                                        shape: 'pill',
                                        color: 'blue',
                                    }}
                                    onSuccess={handleOnSuccess}
                                    options={{
                                        clientId:
                                            process.env.NODE_ENV ===
                                            'production'
                                                ? ''
                                                : 'AU2sAbWFMuDVw5Qf7koCIHgdZz9bNVtVR25oNfAsXMZiaydeO_NOFTq-qn7TDy_vIDr7jpH5bZTbW8QZ',
                                    }}
                                    onError={handleOnError}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <Cta
                    link="none"
                    callback={handleNextpage}
                    className="next-button"
                >
                    Next &#8594;
                </Cta>
            </div>
            <Footer />
        </Fragment>
    )
}
