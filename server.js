const express = require('express')
require('dotenv').config()
const app = express()

const PORT = process.env.PORT


app.get('/hi', (req, res) => {
    res.send("Hello from get")
})

app.post('/hi', (req, res) => {
    res.send("Hello from post")
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})