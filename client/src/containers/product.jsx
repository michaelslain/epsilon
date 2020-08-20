import React, { useState, useEffect } from 'react'
import './product.scss'
import { useParams } from 'react-router-dom'
import Storage from '../cartApi'

import LoadingScreen from '../components/loadingScreen'
import Cta from '../components/cta'

export default function Product({
    handleFetchCartReload,
    products,
    canProduct,
    canCart,
    setBanner,
}) {
    const [data, setData] = useState(null)
    const [selectedAmount, setSelectedAmount] = useState(null)
    const { productId } = useParams()

    useEffect(() => {
        if (canProduct) handleGetData()
    }, [canProduct])

    const handleGetData = () => {
        const filteredData = products.find(product => product._id === productId)
        setData(filteredData)
    }

    const handleAddToCart = async () => {
        if (!canCart) return

        if (selectedAmount == null) {
            setBanner({ type: 'error', text: 'Must Select Size!' })
            return
        }

        await Storage.addItem({ productId: data._id, amount: selectedAmount })

        handleFetchCartReload()

        setBanner({ type: 'good', text: 'Added to Cart :D' })
    }

    if (data == null) {
        return <LoadingScreen />
    }

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    })

    const amounts = ['XS', 'S', 'M', 'L', 'XL']

    return (
        <div className="product-page">
            <div className="image-container">
                <div className="inner-image-container">
                    <img
                        src={`/api/${data.image}`}
                        alt={data.name}
                        className="image"
                    />
                </div>
            </div>
            <div className="text-container">
                <div className="inner-text-container">
                    <h1 className="name">{data.name}</h1>
                    <h2 className="price">{formatter.format(data.price)}</h2>
                    <h3 className="amount-heading">Select a size</h3>
                    <div className="amount-container">
                        {amounts.map((amount, i) => {
                            const isClear = selectedAmount !== amount

                            return (
                                <Cta
                                    key={i}
                                    clear={isClear}
                                    link="none"
                                    callback={() => setSelectedAmount(amount)}
                                    className={isClear ? 'amount-clear' : ''}
                                >
                                    {amount}
                                </Cta>
                            )
                        })}
                    </div>
                    <div className="cta-s">
                        <Cta callback={handleAddToCart} link="none">
                            Add to cart
                        </Cta>
                        <Cta clear={true} link="/shop">
                            Continue Shopping
                        </Cta>
                    </div>
                </div>
            </div>
        </div>
    )
}
