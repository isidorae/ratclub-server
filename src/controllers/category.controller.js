const Category = require('../models/category.model')


const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        return res.status(200).send(categories)
    } catch (error) {
        return res.json({
            message: 'Error finding categories',
            detail: error.message
        })
    }
}

const getCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        return res.status(200).send(category) 
     } catch (error) {
         return res.json({
             message: 'Error finding category',
             detail: error.message
         })
     }
}

const addCategory = async (req, res) => {
    try {
        let category = new Category(req.body)
        const resp = await category.save()
        return res.json({
            message: "category successfully created",
            detail: resp
        })
    } catch (error) {
        return res.json({
            message: 'Error creating category',
            detail: error.message
        })
    }
}

const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id)
        if(category)
        {
            return res.json({
                message: 'category successfully deleted',
                detail: category
            })
        } else {
            return res.status(400).send({
                message: "id not found!",
                detail: "error 400"
            })
        }
    } catch (error) {
        return res.json({
            message: 'Error deleting category',
            detail: error.message
        })
    }
}

const editCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id,
            { name: req.body.name },
            { new: true}
        )
        res.status(200).send({
            message: "Category succesfully updated",
            detail: category
        });
        
    } catch (error) {
        return res.json({
            message: 'Error updating category',
            detail: error.message
        })
    }
}

module.exports = {getCategories, getCategory, addCategory, deleteCategory, editCategory}