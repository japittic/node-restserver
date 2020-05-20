const express = require('express');
const app = express();
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const _ = require('underscore');

const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
const { verificaToken, verificaAdminRole } = require('../middlewares/autenticacion');
// const mongoose = require('mongoose');

// const bodyParser = require('body-parser');
// require('./config/config');

app.get('/usuario', verificaToken, (req, res) => {



    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({ estado: true }, 'nombre email role estado google img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {


            if (err) {
                return res.status(400).json({
                    ok: false,
                    err: err
                });

            }
            Usuario.count({ estado: true }, (err, conteo) => {


                res.json({
                    ok: true,
                    usuarios,
                    cuantos: conteo

                })

            })


        })


});

const salt = bcrypt.genSaltSync(saltRounds);
// const hash = bcrypt.hashSync(myPlaintextPassword, salt);
// app.post('/usuario', function(req, res) {

app.post('/usuario', [verificaToken, verificaAdminRole], (req, res) => {
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);


    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        // password: bcrypt.hashSync(body.password, 10,
        //     function(err, hash) {
        //         // Store hash in your password DB.
        //     }),
        password: bcrypt.hashSync(myPlaintextPassword, salt),
        img: body.img,
        role: body.role

    });

    usuario.save((err, usuarioDB) => {
        if (err) {

            return res.status(400).json({

                ok: false,
                err: err
            })
        }

        usuarioDB.password = null;

        res.json({

            ok: true,
            usuario: usuarioDB
        })

    });






});



// app.put('/usuario/:id', function(req, res) {
app.put('/usuario/:id', [verificaToken, verificaAdminRole], (req, res) => {
    let id = req.params.id;

    let body = req.body;

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {

            return res.status(400).json({

                ok: false,
                err: err
            });
        }


        res.json({
            ok: true,
            Usuario: usuarioDB
        });
    })

});

// app.delete('/usuario/:id', function(req, res) {
app.delete('/usuario/:id', [verificaToken, verificaAdminRole], (req, res) => {

    let id = req.params.id;



    let cambiaEstado = {

        estado: false
    }

    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {


        if (err) {

            return res.status(400).json({
                ok: false,
                err: err
            });
        };

        if (usuarioBorrado == null) {

            return res.status(400).json({

                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            usuarios: usuarioBorrado
        });

    });



});


module.exports = app;