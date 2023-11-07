const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        items: [{type: String, required: true}],
        total: {type: String, required: true},
        userId: {type: String, required: true}
    },
    {
        timestamps: true,
    }
)

const Order = mongoose.model('order', orderSchema);

module.exports = Order;