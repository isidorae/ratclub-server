const Item = require('../models/item.model')
const Category = require('../models/category.model')
const mongoose = require('mongoose')

const getItems = async (req, res) => {
    try {
        const items = await Item.find().select('-description -rating -numReviews').populate('category');
        if (items.length === 0)
        {
            return res.json({ message: "no products yet added"})
        }
        return res.status(200).send(items)
    } catch (error) {
        return res.json({
            message: 'Error finding products',
            detail: error.message
        })
    }
}

const getItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id).select('name price description img').populate('category');
        return res.status(200).send(item) 
     } catch (error) {
         return res.json({
             message: 'Error finding item',
             detail: error.message
         })
     }
}

// const getItemForWeb = async (req, res) => {
//     try {
//         const items = await Item.find().select('name description price category img');
//         return res.send(items)
//     } catch (error) {
//         return res.json({
//             message: 'Error finding products',
//             detail: error.message
//         })
//     }
// }

const addItem = async (req, res) => {
    try {
        //find category of product by ID
        const category = await Category.findById(req.body.category)
        //validate category exists
        if(!category) return res.status(400).send({ message: 'invalid category'})
        const item = new Item(req.body)
        const resp = await item.save()
        return res.status(200).send({
            message: "New Product created successfully",
            detail: resp
        })
    } catch (error) {
        return res.json({
            message: 'Error creating product',
            detail: error.message
        })
    }
}

const editItem = async (req, res) => {
    try {
        //validate id submitted on url
        if (!mongoose.isValidObjectId(req.params.id)){
            return res.status(400).send({
                message: 'invalid product ID, cannot edit invalid product'
            })
        }
        //validate category
        const category = await Category.findById(req.body.category)
        if(!category) return res.status(400).send({
            message: 'invalid category'
        })

        const item = await Item.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true})
        res.status(200).send({
            message: "Product successfully updated",
            detail: item
        })
    } catch (error) {
        return res.json({
            message: 'Error updating product',
            detail: error.message
        })
    }
}

const deleteItem = async (req, res) => {
    try {
        //validate id submitted on url
        if (!mongoose.isValidObjectId(req.params.id)){
           return res.status(400).send({
               message: 'invalid product ID, cannot delete invalid product'
           })
       }
       //delete
       const item = await Item.findByIdAndDelete(req.params.id)
       return res.status(200).send({
           message: 'product successfuly deleted',
           detail: item
       })

   } catch (error) {
       return res.json({
           message: 'Error deleting product',
           detail: error.message
       })
   }
}


//************************** GET'S CON FILTROS */

const getFeaturedItems = async (req, res) => {
    try {
        //n' of featured products we wanna bring
        const count = req.params.count
        // ? req.params.count
        // : 0
        // find featured products = true
        const featuredItems = await Item.find({
            isFeatured: true
        }).limit(+count)
    
        if(!featuredItems) {
            res.status(500).send({
                message: "cant find featured item"
            })
        }
    
        res.send(featuredItems)
        } catch (error) {
            res.json({
                message: 'error getting featured product/s',
                detail: error.message
            })
        }
}

const itemsByCategory = async (req, res) => {
    try {
        //obtener valor de param :category
        const collection = req.params.category
        console.log(collection)
        //variable que almacena valor de ID de categoria que es igual al param
        let categoryId;
    
        switch(collection) {
            case "alimentos":
                categoryId = "652eabc9c391ac2f7c645cc4";
                break;
            case "juguetes":
                categoryId = "652eabcec391ac2f7c645cc6";
                break;
            case "hogar":
                categoryId = "652eabd1c391ac2f7c645cc8";
                break;
            case "accesorios":
                categoryId = "652ecaed58a5b653a8abee47";
                break;
            default: res.status(404)('invalid category')
                break;
        }
    
        const items = await Item.find({category: categoryId}).populate('category').select('name description price category img');
        return res.send(items)
    } catch (error) {
        res.json({
            message: 'error filtering by category',
            detail: error.message
        })
        
    }
}

module.exports = {getItems, getItem, addItem, editItem, deleteItem, getFeaturedItems, itemsByCategory }