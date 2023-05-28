const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const StuRoutes = require('./Routes/StudentRoute')

app.use('/api/students', StuRoutes)
app.use(express.json())

//Sources Link
const DBlink = process.env.MONGO_URI
const Port = process.env.PORT;

mongoose.connect(DBlink).
    then(() => {
        console.log('Database connected and server is Running')
    })
    .catch((err) => {
        console.log(err)
    })

app.listen(Port, () => {
    console.log('server Started')
})

