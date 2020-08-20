import express from 'express'
import Product from '../models/product.model.js'
import multer from 'multer'
import fs from 'fs'

const router = express.Router()

// Image upload config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    },
})
const upload = multer({
    storage,
})

// GET
router.get('/get', async (req, res) => {
    try {
        const products = await Product.find()
        res.json(products)
    } catch (err) {
        res.status(400).json({ message: err })
    }
})

// POST
router.post('/post', upload.single('image'), async (req, res) => {
    try {
        const { name, price, description } = req.body
        const image = req.file.path
        const newProduct = new Product({ name, price, description, image })

        await newProduct.save()
        res.status(200).json({ message: 'Product added' })
    } catch (err) {
        res.status(400).json({ message: err })
    }
})

// DELETE
router.delete('/delete/:id', async (req, res) => {
    try {
        await Product.remove({ _id: req.params.id })
        res.status(200).json({ message: 'Product has been removed' })
    } catch (err) {
        res.status(400).json({ message: err })
    }
})

// UPDATE
router.patch('/update/:id', upload.single('image'), async (req, res) => {
    try {
        const { name, price, description } = req.body
        const image = req.file.path

        await Product.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    name,
                    price,
                    image,
                    description,
                },
            }
        )
        res.status(200).json({ message: 'Product has been updated' })
    } catch (err) {
        res.status(400).json({ message: err })
    }
})

export default router
