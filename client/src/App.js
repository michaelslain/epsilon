import React, { useState, useEffect } from 'react'
import './App.scss'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import axios from 'axios'
import Storage from './cartApi'

import BackgroundAnimation from './components/backgroundAnimation'
import Header from './components/header'
import Home from './containers/home'
import Shop from './containers/shop'
import About from './containers/about'
import Product from './containers/product'
import Cart from './containers/cart'
import Checkout from './containers/checkout'
import Banner from './components/banner'
import Admin from './containers/admin'

function App() {
    const [products, setProducts] = useState(null)
    const [canProduct, setCanProduct] = useState(false)
    const [fetchProductReloadCounter, setFetchProductReloadCounter] = useState(
        0
    )
    const [canCart, setCanCart] = useState(false)
    const [fetchCartReloadCounter, setFetchCartReloadCounter] = useState(0)
    const [banner, setBanner] = useState(null)

    useEffect(() => {
        if (products != null) handleInitStorage()
    }, [products])

    useEffect(() => {
        handleGetProducts()
    }, [fetchProductReloadCounter])

    const handleGetProducts = async () => {
        try {
            const request = await axios.get('/api/products/get')
            const data = request.data

            setProducts(data)
            setCanProduct(true)
        } catch (err) {
            console.error(err)
        }
    }

    const handleInitStorage = async () => {
        await Storage.storageInit(products)
        setCanCart(true)
    }

    const handleFetchProductReload = () =>
        setFetchProductReloadCounter(fetchProductReloadCounter + 1)
    const handleFetchCartReload = () =>
        setFetchCartReloadCounter(fetchCartReloadCounter + 1)

    return (
        <Router>
            <BackgroundAnimation>
                <Header
                    canCart={canCart}
                    fetchCartReloadCounter={fetchCartReloadCounter}
                />
                <Banner banner={banner} setBanner={setBanner} />
                <Switch>
                    <Route path="/" exact={true} render={Home} />
                    <Route
                        path="/shop"
                        render={() => (
                            <Shop products={products} canProduct={canProduct} />
                        )}
                    />
                    <Route path="/about" render={About} />
                    <Route
                        path="/product/:productId"
                        render={() => {
                            return (
                                <Product
                                    handleFetchCartReload={
                                        handleFetchCartReload
                                    }
                                    products={products}
                                    canProduct={canProduct}
                                    canCart={canCart}
                                    setBanner={setBanner}
                                />
                            )
                        }}
                    />
                    <Route
                        path="/cart"
                        render={() => (
                            <Cart
                                handleFetchCartReload={handleFetchCartReload}
                                products={products}
                                canProduct={canProduct}
                                canCart={canCart}
                                fetchCartReloadCounter={fetchCartReloadCounter}
                            />
                        )}
                    />
                    <Route
                        path="/checkout"
                        render={() => (
                            <Checkout
                                handleFetchCartReload={handleFetchCartReload}
                                products={products}
                                canProduct={canProduct}
                                canCart={canCart}
                                setBanner={setBanner}
                            />
                        )}
                    />
                    <Route
                        path="/admin"
                        render={() => (
                            <Admin
                                handleFetchProductReload={
                                    handleFetchProductReload
                                }
                                products={products}
                                canProduct={canProduct}
                                setBanner={setBanner}
                            />
                        )}
                    />
                </Switch>
            </BackgroundAnimation>
        </Router>
    )
}

export default App
