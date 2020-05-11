const express = require('express');
const app = express();
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const jwt = require('jsonwebtoken');


app.post('/login', (req, res) => {


    let body = req.body;
    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o contraseña Incorrectos'

                }
            });


        }

        if (bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o contraseña Incorrectos'

                }
            });

        }

        let token = jwt.sign({
            usuario: usuarioDB
        }, process.env.seed, { expiresIn: process.env.Caducidad_token });


        res.json({

            ok: true,
            usuario: usuarioDB,
            token: token
        });



    });

});



module.exports = app;