const express = require('express');
const route = express.Router();
const UserModel = require('../Model/UserModel');
const { SendResponse } = require('../Helper/helper');
const bcrypt = require('bcryptjs')


route.post(('/'), async (req, res) => {

    const { userName, email, password } = req.body
    const obj = { userName, email, password }
    let requiredArr = ['userName', 'email', 'password']
    let errArr = [];

    requiredArr.forEach((x) => {
        if (!obj[x]) {
            errArr.push(x);
        }
    })

    if (errArr > 0) {
        res.send(SendResponse(false, null, 'some Fields are missing', errArr)).status(400)
        return;
    }
    else {

        const hashpass = await bcrypt.hash(obj.password);
        obj.password = hashpass;

        const existingUser = await UserModel.findOne({ email })

        if (existingUser) {
             res.send(SendResponse(false, null, 'this email is already in use')).status(403)
        }

        else {
            UserModel.create(obj)
                .then((results) => {
                    res.send(SendResponse(true, results, 'User Created Succesffuly')).status(200);
                    console.log('Success')
                })
                .catch((err) => {
                    res.send(SendResponse(false, err, 'Internal Server Error')).status(404)
                    console.log('ERROR')
                })
        }
    }

})


module.exports = route;