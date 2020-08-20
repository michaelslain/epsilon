import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
        trim: true,
    },
    totalPayment: {
        type: Number,
        required: false,
        trim: false,
    },
    items: [
        {
            name: {
                type: String,
                required: true,
                trim: true,
            },
            payment: {
                type: Number,
                required: false,
                trim: false,
            },
            size: {
                type: String,
                required: true,
                trim: true,
            },
        },
    ],
})

export default mongoose.model('Order', orderSchema)
