const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()
const morgan = require('morgan');

const router = require('./src/routers/routers')

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI
const apiUrl = process.env.API_URL

app.use(express.json());
app.use(morgan('tiny'));


app.use(`${apiUrl}/`, router)


mongoose.connect(MONGO_URI).then(() => console.log('connected!'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})