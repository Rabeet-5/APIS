const express = require('express');
const route = express.Router();
const UserModel = require('../Model/UserModel');
const { SendResponse } = require('../Helper/helper');
const bcrypt = require('bcryptjs')



// route.post('/signup', async (req, res) => {

//         const { email, userName, password } = req.body
//         let obj = { email, password, userName };
//         let reqArray = ['email', 'password', 'userName'];
//         let errArr = [];

//         reqArray.forEach((objects) => {
//             if (!obj[objects]) {
//                 errArr.push(objects)
//             }
//         })

//         if (errArr > 0) {
//             res.send(SendResponse(false, null, 'Some fields are missing')).status(403)
//         }

//         else {
//             const hashpassword = await bcrypt.hash(obj.password, 10)
//             obj.password = hashpassword;

//             const ExistingUser = await UserModel.findOne({ email });

//             if (ExistingUser) {
//                 res.send(SendResponse(false, null, 'this email is already in use')).status(404)
//             }
//             else {
//                 UserModel.create(obj)
//                     .then((user) => {
//                         res.send(SendResponse(true, user, 'User Created ')).status(200)
//                     })
//                     .catch((err) => {
//                         res.send(SendResponse(false, null, 'Cridentials Error', err)).status(404)
//                     })
//             }

//         }
//     })

route.post('/signup', async (req, res) => {
    const { email, userName, password } = req.body;
    let reqArray = ['email', 'password', 'userName'];
    let errArr = [];

    // Validate the request payload
    if (!email || !userName || !password) {
        res.status(400).send(SendResponse(false, null, 'Missing required fields'));
        return;
    }
    console.log('Received request:', email, userName, password);

    reqArray.forEach((objects) => {
        if (!obj[objects]) {
            errArr.push(objects)
        }
    })

    if (errArr > 0) {
        res.send(SendResponse(false, null, 'Some fields are missing')).status(403)
    }

    else {
        const hashpassword = await bcrypt.hash(obj.password, 10)
        obj.password = hashpassword;

        const ExistingUser = await UserModel.findOne({ email });

        if (ExistingUser) {
            res.send(SendResponse(false, null, 'this email is already in use')).status(404)
        }
        else {
            UserModel.create(obj)
                .then((user) => {
                    res.send(SendResponse(true, user, 'User Created ')).status(200)
                })
                .catch((err) => {
                    res.send(SendResponse(false, null, 'Cridentials Error', err)).status(404)
                })
        }
    }
});
//   By implementing these steps and examining the debug information, you should be able to identify and resolve the issue causing the "Illegal arguments" error.








route.post('/login', async (req, res) => {
    const { email, password } = req.body;
    let obj = { email, password };

    UserModel.findOne({ email })
        .then(async (x) => {
            const compare = await bcrypt.compare(obj.password, x.password)
            if (compare) {
                res.send(SendResponse(true, x, 'User Founded And Logged in')).status(200)
            }
            else {
                res.send(SendResponse(false, null, 'No user Exist on this email')).status(403)
            }
        })
        .catch((err) => {
            res.send(SendResponse(false, null, 'internal server Error', err)).status(404)
        })
})


module.exports = route;