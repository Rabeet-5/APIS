const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const StuRoutes = require('./Routes/StudentRoute')
const UserRoute = require('./Routes/UserRoutes')

const app = express()
app.use(express.json())

app.use('/api/students', StuRoutes)
app.use('/api/user',UserRoute);



//Sources Link
const DBlink = process.env.MONGO_URI;
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

