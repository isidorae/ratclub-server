const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const morgan = require('morgan');
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express()

const router = require('./src/routers/routers')

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI
const apiUrl = process.env.API_URL

const corsOptions = {
    origin: ['https://isidorae.github.io', 'http://localhost:5173'],
    // origin: 'https://isidorae.github.io/rat-club-store/#',
    credentials: true
}

app.use(cors(corsOptions))
app.use(express.json());
app.use(morgan('tiny'));
app.use(cookieParser())


app.use(`${apiUrl}/`, router)
app.get('/', (req, res) => {
    res.send(
        {products: "https://ratclub.onrender.com/rat-club-api/v1/products",
        categories: "https://ratclub.onrender.com/rat-club-api/v1/categories",
        foodProducts: "https://ratclub.onrender.com/rat-club-api/v1/products/collection/alimentos",
        accessoryProducts:"https://ratclub.onrender.com/rat-club-api/v1/products/collection/accesorios",
        toyProducts: "https://ratclub.onrender.com/rat-club-api/v1/products/collection/juguetes",
        homeProducts: "https://ratclub.onrender.com/rat-club-api/v1/products/collection/hogar",
        featuredProducts: "https://ratclub.onrender.com/rat-club-api/v1/products/featured/all"

    })
})


mongoose.connect(MONGO_URI).then(() => console.log('connected!'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})