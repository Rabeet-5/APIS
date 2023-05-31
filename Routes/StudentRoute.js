const express = require('express')
const Route = express.Router()
const { SendResponse } = require('../Helper/helper')
const StudentModel = require('../Model/studentModel')

Route.get('/', async (req ,res ) => {
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


Route.get('/search', async (req ,res) => {

    let { firstname, lastname } = req.body;
    if (firstname) {
        let result = await StudentModel.find({
            firstname: firstname,
            lastname: lastname,
        })
        if (!result) {
            res.send(SendResponse(false, null, 'NO data found')).status(404)
        }
        else {
            res.send(SendResponse(true, result)).status(200)
        }
    }

})


Route.get('/:id', async (req ,res) => {
    try {

        let id = req.params.id;
        const result = await StudentModel.findById(id);

        if (!result) {
            res.send(SendResponse(false, null, 'No Data Found')).status(404)
        }
        else {
            res.send(SendResponse(true, result)).status(200)
        }

    } catch (e) {
        res.send(SendResponse(false, null, 'Internal server Error')).status(400)
        console.log(e)
    }

})

Route.post('/', async (req ,res) => {

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
            return;
        }
        else {
            let obj = { firstname, lastname, contact, course };
            let students = new StudentModel(obj);
            await students.save();
            if (!students) {
                res.send(SendResponse(false, null, 'Internal server error')).status(400)
            }
            else {
                res.send(SendResponse(true, students, 'saved successfully')).status(200)
            }

        }
        console.log('Data Posted')
    } catch (error) {
        res.send(SendResponse(false, null, 'Server error'))
    }
})


Route.put('/:id', async (req ,res) => {
    try {
        let id = req.params.id;
        let result = await StudentModel.findById(id);

        if (!result) {
            res.send(SendResponse(false, null, 'No data Found')).status(404)
        }
        else {
            let updateResult = StudentModel.findByIdAndUpdate(id, req.body, {
                new: true,
            })
            if (!updateResult) {
                res.send(SendResponse(false, null, 'Error')).status(404)
            }
            else {
                res.send(SendResponse(true, updateResult)).status(200)
            }
        }
    } catch (error) {
        res.send(SendResponse(false, null, 'Internal server Error')).status(400)
    }
})


Route.delete('/:id', async (req ,res) => {
    try{
        let id  = req.params.id;
        let result = await StudentModel.findById(id);
        if(!result){
            res.send(SendResponse(false,null,'No data On this id')).status(404)
        }
        else{
            let deleteById = await StudentModel.findByIdAndDelete(id);
            if(!deleteById){
                res.send(SendResponse(false,null,'No data on this id')).status(404)
            }
            else{
                res.send(SendResponse(true,null,'Data Deleted')).status(200)
            }
        }
    }
    catch(e){
        console.log(e)
        res.send(SendResponse(false,null,'Internal server error')).status(400)
    }
})

module.exports = Route;