import React, { Fragment, useState } from 'react'
import './addPop.scss'
import axios from 'axios'

export default function EditPop({
    showAddPop,
    setShowAddPop,
    handleFetchProductReload,
    setBanner,
}) {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState()

    if (!showAddPop) return <Fragment />

    const handleUpdateName = e => setName(e.target.value)
    const handleUpdatePrice = e => setPrice(e.target.value)
    const handleUpdateDescription = e => setDescription(e.target.value)
    const handleUpdateImage = e => setImage(e.target.files[0])

    const handleSubmit = async () => {
        if (image == null || image === '') {
            setBanner({ type: 'error', text: 'Image is required' })
            return
        }
        if (name.length === 0) {
            setBanner({ type: 'error', text: 'Name is required' })
            return
        }
        if (price.length === 0) {
            setBanner({ type: 'error', text: 'Price is required' })
            return
        }
        if (description.length === 0) {
            setBanner({ type: 'error', text: 'Description is required' })
        }

        const body = new FormData()
        body.append('name', name)

        const replaceAll = (string, search, replace) =>
            string.split(search).join(replace)

        let newPrice = price
        if (typeof newPrice === 'string') {
            newPrice = replaceAll(newPrice, '$', '')
            newPrice = replaceAll(newPrice, ',', '')

            if (Number.isNaN(Number(newPrice))) {
                setBanner({ type: 'error', text: 'Price is invalid' })
                return
            }

            newPrice = Number(newPrice)
        }
        body.append('price', newPrice)

        body.append('description', description)
        body.append('image', image)

        await axios({
            method: 'post',
            url: '/api/products/post',
            data: body,
            headers: { 'Content-Type': 'multipart/form-data' },
        })

        handleFetchProductReload()
        setShowAddPop(false)
    }

    const handleClosePop = () => setShowAddPop(false)

    return (
        <div className="edit-pop-container">
            <div className="edit-pop">
                <form>
                    <p className="edit-label name">Name</p>
                    <input
                        type="text"
                        className="edit-field text-field name"
                        value={name}
                        onChange={handleUpdateName}
                    />
                    <p className="edit-label price">Price</p>
                    <input
                        type="text"
                        className="edit-field text-field price"
                        value={price}
                        onChange={handleUpdatePrice}
                    />
                    <p className="edit-label description">Description</p>
                    <input
                        type="text"
                        className="edit-field text-field description"
                        value={description}
                        onChange={handleUpdateDescription}
                    />
                    <p className="edit-label image">Image</p>
                    <div className="bottom-container">
                        <input
                            type="file"
                            className="edit-field file-field image"
                            onChange={handleUpdateImage}
                        />
                        <div className="submit-button" onClick={handleSubmit}>
                            Submit
                        </div>
                    </div>
                </form>
                <div className="edit-back" onClick={handleClosePop}>
                    X
                </div>
            </div>
        </div>
    )
}
