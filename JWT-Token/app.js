const express = require('express');
const JWT = require('jsonwebtoken');
const app = express();
const key = 'secretkey'

app.get('/', (req, res) => {
    res.json({
        message: 'a sample api'
    })
})

app.post(('/login'), (req, res) => {
    const user = {
        id: '1',
        name: 'Rabeet',
        password: '1234',
        email: 'rabeet@gmail.com'
    }

    JWT.sign({ user }, key, { expiresIn: 300 }, (err, token) => {
        res.json({
            token
        })
    })
})

app.post('/profile', verifyToken, (req, res) => {
    JWT.verify(req.token, key, (err, authData) => {
        if (err) {
            res.send({ result: 'Token expired' });
        } else {
            res.json({
                message: 'Succeeded',
                authData,
            });
        }
    });
});

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const header = bearerHeader.split(' ');
        const token = header[1];
        req.token = token;
        next();
    } else {
        res.send({
            result: 'Token is invalid',
        });
    }
}


app.listen(5000, () => {
    console.log('Server running')
})
