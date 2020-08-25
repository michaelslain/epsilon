import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
        trim: true,
    },
    totalPayment: {
        type: Number,
        required: true,
    },
    items: {
        type: Array,
        required: true,
    },
})

export default mongoose.model('Order', orderSchema)
