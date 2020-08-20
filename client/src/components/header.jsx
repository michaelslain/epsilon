import React, { useState, useEffect } from 'react'
import './header.scss'
import { Link } from 'react-router-dom'
import ShopIcon from '../images/cart.svg'
import MenuIcon from '../images/burger.svg'
import Storage from '../cartApi'
import XImage from '../images/x.svg'

import Tab from './tab'

export default function Header({ canCart, fetchCartReloadCounter }) {
    const [cartNumber, setCartNumber] = useState('%')
    const [showNav, setShowNav] = useState(false)
    const [navStyle, setNavStyle] = useState(null)

    const handleMobileNav = () => {
        if (window.innerWidth >= 850) {
            if (navStyle != null) setNavStyle({})
            return
        }
        if (!showNav) {
            setNavStyle({ display: 'none' })
            return
        }

        setNavStyle({ display: 'flex' })
    }

    useEffect(() => {
        window.addEventListener('resize', handleMobileNav)

        return () => {
            window.removeEventListener('resize', handleMobileNav)
        }
    }, [handleMobileNav])

    useEffect(() => {
        handleMobileNav()
    }, [showNav])

    useEffect(() => {
        if (canCart) handleGetCartNumber()
    }, [canCart, fetchCartReloadCounter])

    const handleGetCartNumber = async () => {
        const data = await Storage.getItems()
        const amountOfCartNumber = data.length

        setCartNumber(amountOfCartNumber)
    }

    const handleToggleNav = () => setShowNav(!showNav)

    return (
        <div className="header">
            <Link to="/">
                <h1 className="logo" style={{ opacity: 0 }}>
                    Garbanzo
                </h1>
            </Link>
            <div className="text-container">
                <div className="tabs-container" style={navStyle}>
                    <img
                        src={XImage}
                        alt="X"
                        className="back"
                        onClick={handleToggleNav}
                    />
                    <Tab link="/">Home</Tab>
                    <Tab link="/shop">Shop</Tab>
                    <Tab link="/about">About</Tab>
                </div>
                <Tab link="/cart" className="cart">
                    <img src={ShopIcon} className="cart-image" alt="Cart" />
                    {cartNumber}
                </Tab>
                <img
                    className="burger"
                    onClick={handleToggleNav}
                    src={MenuIcon}
                    alt="Menu"
                />
            </div>
        </div>
    )
}
