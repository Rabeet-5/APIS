const express = require('express')
const Route = express.Router()
const { SendResponse } = require('../Helper/helper')
const StudentModel = require('../Model/studentModel')

Route.get('/', async (res, req) => {
    try {
        const result = await StudentModel.find()
        if (!result) {
            res.send(SendResponse(false, null, 'No data Found')).status(404)
        }
        else {
            res.send(SendResponse(true, result)).status(200)
        }

    } catch (error) {
        res.send(SendResponse(false, null, 'Internal server error')).status(400)
    }
 console.log('Got Student Data')
})


Route.get('/:id', (res, req) => {
    console.log('got student Data by id')
})


Route.post('/id',async (res, req) => {

    let { firstname, lastname, contact, course } = req.body
    try {
        let Arr = [];
        if (!firstname) {
            res.send('Required : firstname')
        }
        if (!lastname) {
            res.send('Required : lastname')
        }
        if (!contact) {
            res.send('Required : contact')
        }
        if (!course) {
            res.send('Required : course')
        }
        if (Arr > 0) {
            res.send(SendResponse(false, Arr, null, 'Required all fields')).status(400)
        }
        else {
            let obj = { firstname, lastname, contact, course };
            let students = StudentModel(obj);
            await students.save();
            if (!students) {
                res.send(SendResponse(false, null, 'Internal server error')).status(400)
            }
            else {
                res.send(SendResponse(true, students, 'saved successfully')).status(200)
            }

        }

    } catch (error) {
        res.send(SendResponse(false, null, 'Server error'))
    }
})


Route.put('/', (res, req) => {
    console.log(' putted Studnet  Data')
})


Route.delete('/', (res, req) => {
    console.log(res, 'Deleted student Data')
})

module.exports = Route;