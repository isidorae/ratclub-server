// const mongoose = require('mongoose');
const Order = require('../models/orders.model')

const createOrder = async (req, res) => {

    const { items, total, userId, receiver, region, address, extra } = req.body

    try {

        if (items === "" || total === "") {
            return res.status(400).json({
                message: 'Sin items en carrito..'
            })
        }

        if (region === "") {
            return res.status(400).json({
                message: 'Debes seleccionar una región.'
            })
        }

        if (receiver.length < 3 || address.length < 3) {
                return res.status(400).json({
                    message: 'Debes rellenar todos los campos obligatorios.'
                })
        }

        const newOrder = new Order({
            items,
            total,
            userId,
            region,
            receiver,
            address,
            extra
        });
        const savedOrder = await newOrder.save();
        console.log(savedOrder)
        console.log(newOrder)
        return res.status(200).json({
            message: 'Orden realizada.',
            detail: newOrder
        })

        
    } catch (error) {
        return res.json({
            message: 'Error creando orden',
            detail: error.message
        })
    }
}

const getOrders = async (req, res) => {

    try {
        console.log(req.body)
        console.log(req.body.userId)
        const orders = await Order.find({
            userId: req.body.userId
        })
        if(!req.body.userId) {
            res.status(404).send({
                message: 'userId not found'
            })
        }

        res.json({
            message: "successful getting orders",
            detail: orders
        })

    } catch (error) {
        return res.json({
            message: 'error finding orders',
            detail: error.message
        })
    }
}

const getOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
        if(!order){
            return res.status(404).res.json({
                message: 'order not found'
            })
        }
        return res.status(200).send({
            order
        })
        
    } catch (error) {
        return res.json({
            message: 'error finding order',
            detail: error.message
        })
    }
}


module.exports = {createOrder, getOrders, getOrder}