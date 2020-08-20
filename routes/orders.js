import express from 'express'
import Order from '../models/order.model.js'

const router = express.Router()

// GET
router.get('/get', async (req, res) => {
    try {
        const orders = await Order.find()
        res.json(orders)
    } catch (err) {
        res.status(400).json({ message: err })
    }
})

// POST
router.post('/post', async (req, res) => {
    const { payment, address, totalPayment } = req.body

    try {
        const newOrder = new Order({ payment, address, totalPayment })

        await newOrder.save()
        res.status(200).json({ message: 'Order added' })
    } catch (err) {
        res.status(400).json({ message: err })
    }
})

// DELETE
router.delete('/delete/:id', async (req, res) => {
    try {
        await Order.remove({ _id: req.params.id })
        res.status(200).json({ message: 'Order has been removed' })
    } catch (err) {
        res.status(400).json({ message: err })
    }
})

// UPDATE
router.patch('/update/:id', async (req, res) => {
    try {
        const { payment, address, totalPayment } = req.body

        await Order.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    payment,
                    address,
                    totalPayment,
                },
            }
        )
        res.status(200).json({ message: 'Order has been updated' })
    } catch (err) {
        res.status(400).json({ message: err })
    }
})

export default router
