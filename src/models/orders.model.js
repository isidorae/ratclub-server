const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        items: [{type: String, required: true}],
        total: {type: Number, required: true},
        userId: {type: String, required: true},
        receiver: {type: String, required: true},
        region: {type: String, required: true},
        address: {type: String, required: true},
        extra: {type: String}
    },
    {
        timestamps: true,
    }
)

const Order = mongoose.model('order', orderSchema);

module.exports = Order;