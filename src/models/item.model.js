const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        description: {type: String, required: true},
        price: {type: Number, required: true},
        //store in particular category 
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'category',
            required: true},
        img: {type: String, required: true},
        // imgs:[{ type: String}],
        quantity: {
            type: Number,
            min: 0,
            max: 500},
        rating: {
            type: Number,
        },
        numReviews: {
            type: Boolean,
            default: false,
        },
        isFeatured: {
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true,
    }
)

const Item = mongoose.model('item', itemSchema);

module.exports = Item;