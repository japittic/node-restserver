const express = require('express');
const { verificaToken } = require('../middlewares/autenticacion');
let Producto = require('../models/producto');
let app = express();

// Obtener Productos

app.get('/productos', verificaToken, (req, res) => {
        let desde = req.query.desde || 0;
        desde = Number(desde);
        // let hasta =req.query.hasta ||;
        // populate : cargar usuario y categoria 
        // paginado

        Producto.find({ disponible: true })
            .skip(desde)
            .limit(5)
            .sort('descripcion')
            .populate('usuario', 'nombre email')
            .populate('categoria', 'descripcion')
            .exec((err, productos) => {

                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err: err
                    });
                }

                res.json({

                    ok: true,
                    productos
                });
            })


    }) //fin get

app.get('/productos/:id', verificaToken, (req, res) => {

    // populate : cargar usuario y categoria 


    let id = req.params.id;

    Producto.findById(id)
        .populate('usuario', 'nombre email')
        .populate('usuario', 'nombre')
        .exec((err, productoDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err: err
                });
            }



            if (!productoDB) {
                return res.status(400).json({
                    ok: false,
                    err: { message: 'id no existe' }
                });
            }
            res.json({
                ok: true,
                producto: productoDB
            });


        });







}); //fin get x id

app.get('/productos/buscar/:termino', verificaToken, (req, res) => {
    let termino = req.params.termino;
    let regex = new RegExp(termino, 'i');
    Producto.find({ nombre: regex })
        .populate('categoria', 'nombre')
        .exec((err, productos) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err: err
                });

            }
            res.json({
                ok: true,
                productos
            })
        })

});


app.post('/productos', verificaToken, (req, res) => {

        // Actualizar  usuario
        // grabar una categoria del listado

        let body = req.body;
        let producto = new Producto({
            nombre: body.nombre,
            precioUni: body.precioUni,
            descripcion: body.descripcion,
            categoria: body.categoria,
            disponible: body.disponible,
            usuario: req.usuario._id

        });
        producto.save((err, productoDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err: err
                });

            }



            res.status(201).json({
                ok: true,
                producto: productoDB
            });

        });

    }) //fin post

app.put('/productos/:id', verificaToken, (req, res) => {

        // grabar usuario
        // grabar una categoria del listado

        let id = req.params.id;
        let body = req.body;
        let producto = new Producto({
            nombre: body.nombre,
            precioUni: body.precioUni,
            descripcion: body.descripcion,
            categoria: body.categoria,
            disponible: body.disponible,


        });

        Producto.findById(id, (err, productoDB) => {


            if (err) {
                return res.status(500).json({
                    ok: false,
                    err: err
                });

            }

            if (!productoDB) {
                return res.status(400).json({
                    ok: false,
                    err: { message: 'No existe el id' }
                });

            }
            productoDB.nombre = body.nombre;
            productoDB.precioUni = body.precioUni;
            productoDB.descripcion = body.descripcion;
            productoDB.categoria = body.categoria;
            productoDB.disponible = body.disponible;

            productoDB.save((err, productoGuardado) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err: err
                    });

                }

                res.json({
                    ok: true,
                    producto: productoGuardado
                })
            });
        });
    }) //fin post


app.delete('/productos/:id', verificaToken, (req, res) => {

        // borrar un producto por estado disponible = false
        // grabar una categoria del listado
        let id = req.params.id;
        Producto.findById(id, (err, productoDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err: err
                });

            }


            if (!productoDB) {
                return res.status(400).json({
                    ok: false,
                    err: { message: 'Id no existe' }
                });

            }

            productoDB.disponible = false;
            productoDB.save((err, productoBorrado) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err: err
                    });

                }

                res.json({
                    ok: true,
                    producto: productoBorrado,
                    message: 'Producto borrado'

                });

            })

        })

    }) //fin delete

module.exports = app;