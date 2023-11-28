const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const User = require('../models/user.model');
const { createAccessToken } = require('../libs/jwt.sign')

const createUser = async (req, res) => {

    const { firstName, lastName, username, email, password, admin } = req.body

    try {

        const userExists = await User.findOne({ username })
        const emailExists = await User.findOne({ email })
        if (userExists) {
            return res.status(400).json({
                message: 'Nombre de usuario ya registrado.'
            })
        };

        if (emailExists) {
            return res.status(400).json({
                message: 'Email ya registrado.'
            })
        }

        if (password.length < 4){
            return res.status(400).json({
                message: 'contraseña debe ser mayor a 4 carácteres.'
            })
        }

        const passwordHash = await bcrypt.hash(password, 10)

        const user = await new User({
            firstName: firstName,
            lastName: lastName,
            username,
            email,
            password: passwordHash,
            admin
        });
        console.log(user)
        const newUser = await user.save();

        //*****TOKEN */
        const token = await createAccessToken({id: newUser._id})
        // res.cookie('token', token)
        if (newUser) {
            return res.json(
                {
                    message: "user created succesfully",
                    detail: {
                        id: newUser._id,
                        username: newUser.username,
                        email: newUser.email,
                        firstName: newUser.firstName,
                        lastName: newUser.lastName,
                        token: token

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

    // if (email )

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
        // res.cookie('token', token)
        return res.json({
            message: `${userFound.username} ha hecho login con exito`,
            detail: {
                id: userFound._id,
                username: userFound.username,
                email: userFound.email,
                firstName: userFound.firstName,
                lastName: userFound.lastName,
                token: token
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
        return res.status(200).send({
            id: user._id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email

        })
    } catch (error) {
        return res.json({
            message: "error on getUser",
            detail: error.message
        })
    }
}

const updateUser = async (req, res) => {

    //campos que puede actualizar 
    const { firstName, lastName } = req.body

try {

    if (firstName === "" || lastName === "" ){
        return res.status(400).json({
            message: 'Campo no puede estar vacío.'
        })
    }

    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(400).send({
            message: 'invalid user ID, cannot edit user'
        })
    }
    const user = await User.findByIdAndUpdate(req.params.id, {firstName, lastName }, {new: true} )
    res.status(200).send({
        message: 'User successfully updated',
        detail: {
            id: user._id,
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
        }
    })

} catch (error) {
    return res.json({
        message: 'Error at updateUser',
        detail: error.message
    })
}
}

const updateUserEmail = async (req, res) => {

    const { email } = req.body

    try {

        const emailExists = await User.findOne({ email })
        const emailRegEx = (/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/g.test(email))

        if (emailExists) {
            return res.status(400).json({
                message: "Email ya registrado."
            })
        }

        if (!emailRegEx){
            return res.status(400).json({
                message: "formato de email no válido."
            })
        }

        const user = await User.findByIdAndUpdate(req.params.id, { email }, {new: true});
        res.status(200).send({
            message: 'email actualizado con exito.',
            detail: {
                id: user._id,
                username: user.username,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            }
        })
        
    } catch (error) {
        return res.json({
            message: 'error updating email',
            detail: error.message
        })
    }
}
const updateUserPassword = async (req, res) => {
    const { password } = req.body;

    try {

        if (password.length < 4){
            return res.status(400).json({
                message: 'contraseña debe ser mayor a 4 carácteres.'
            })
        }
        
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).send({
                message: 'invalid user ID, cannot update password'
            })
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const userPassword = await User.findByIdAndUpdate(req.params.id, {password: hashPassword}, {new: true})
        res.status(200).send({
            message: 'password updated successfully',
            detail: userPassword
        })

    } catch (error) {
        return res.json({
            message: 'Error at passUpdate',
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

module.exports = {getUsers, getUser, createUser, updateUser, deleteUser, login, logout, updateUserPassword, updateUserEmail}