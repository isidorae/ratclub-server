const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const User = require('../models/user.model');
const { createAccessToken } = require('../libs/jwt.sign')

const createUser = async (req, res) => {

    const { firstName, lastName, username, email, password, admin } = req.body

    try {

        const userExists = await User.findOne({ username })
        if (userExists) {
            return res.status(400).json({
                message: 'Nombre de usuario ya registrado.'
            })
        };

        if (password.length < 4){
            return res.status(400).json({
                message: 'contraseña debe ser mayor a 4 carácteres.'
            })
        }

        const passwordHash = await bcrypt.hash(password, 10)

        const user = await new User({
            firstName,
            lastName,
            username,
            email,
            password: passwordHash,
            admin
        });
        console.log(user)
        const newUser = await user.save();

        //*****TOKEN */
        const token = await createAccessToken({id: newUser._id})
        res.cookie('token', token)
        if (newUser) {
            return res.json(
                {
                    message: "user created succesfully",
                    detail: {
                        _id: newUser._id,
                        username: newUser.username,
                        email: newUser.email
                    }
                }
            )
        } else {
            return res.status(400).json({
                message: "user creation failed",
                detail: "unable to create user."
            })
        }
    } catch (error) {
        return res.json({
            message: "error on createUser",
            detail: error.message
        })
    }
}

const login = async (req, res) => {

    //user va a hacer login con email y password
    const { email, password } = req.body

    if (email )

    try {
        const userFound = await User.findOne({ email })
        if (!userFound) {
            return res.status(400).json({
                message: 'email no registrado.'
            })
        };

        const isMatch = await bcrypt.compare(password, userFound.password);

        if (!isMatch) {
            return res.status(400).json({
                message: 'contraseña incorrecta'
            })
        }

        const token = await createAccessToken({id: userFound._id})
        res.cookie('token', token)
        return res.json({
            message: `${userFound.username} ha hecho login con exito`,
            detail: {
                id: userFound._id,
                username: userFound.username,
                email: userFound.email
            }
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const logout = async (req, res) => {
    try {
        res.cookie('token', "")
        return res.status(200).json({
            message: "sesión cerrada con exito."
        })
    } catch (error) {
        return res.json({
            message: "error in logout",
            detail: error.message
        })
    }
}

const profile = async (req, res) => {
    try {
        const userFound = await User.findById(req.userData.id)

        if(!userFound){
            return res.json(401).json({
                message: 'user not found.'
            })
        }
        return res.json({
            id: userFound._id,
            username: userFound.username,
            nombre: userFound.firstName,
            apellido: userFound.lastName,
            email: userFound.message
        })

    } catch (error) {
        return res.json({
            message: 'error in profile',
            detail: error.message
        })
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (users.length === 0) {
            return res.json({message: 'no users added yet. '})
        }
        return res.status(200).send(users)
    } catch (error) {
        return res.json({
            message: "error on getUsers",
            detail: error.message
        })
    }
}
const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!req.body) {
            return res.status(404).res.json({message: 'user not found'})
        }
        return res.status(200).send(user)
    } catch (error) {
        return res.json({
            message: "error on getUser",
            detail: error.message
        })
    }
}

const updateUser = async (req, res) => {

    //campos que puede actualizar 
    const { firstName, lastName, email, password } = req.body

try {

    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(400).send({
            message: 'invalid user ID, cannot edit user'
        })
    }

    //necesario que envie password para update user... 
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.findByIdAndUpdate(req.params.id, {firstName, lastName, email, password: hashPassword }, {new: true} )
    res.status(200).send({
        message: 'Product successfully updated',
        detail: user
    })

} catch (error) {
    return res.json({
        message: 'Error at updateUser',
        detail: error.message
    })
}
}

const deleteUser = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)){
            return res.status(400).send({
                message: 'invalid user ID, cannot delete'
            })
        }
        const user = await User.findByIdAndDelete(req.params.id)
        return res.status(200).send({
            message: 'user successfuly deleted',
            detail: user
        })
    } catch (error) {
        return res.json({
            message: 'error deleting user',
            detail: error.message
        })
    }
}

module.exports = {getUsers, getUser, createUser, updateUser, deleteUser, login, logout, profile}