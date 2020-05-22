const express = require('express');
let { verificaToken, verificaAdminRole } = require('../middlewares/autenticacion');
let Categoria = require('../models/categoria')
let app = express();

// Mostrar todas las Catgorias

app.put('/categoria/:id', (req, res) => {

    let id = req.params.id;
    let body = req.body;

    let descCategoria = {

        descripcion: body.descripcion
    };
    Categoria.findByIdAndUpdate(id, descCategoria, { new: true, runValidators: true }, (err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err: err
            });

        }

        if (!categoriaDB) {
            return res.status(500).json({
                ok: false,
                err: err
            });

        }
        res.json({
            ok: true,
            categoria: categoriaDB
        })

    });




}); //fin del get

// Le vamos a quitar el validatoken para ver si funciona en heroku
// app.post('/categoria', verificaToken, (req, res) => {
app.post('/categoria', verificaToken, (req, res) => {
    let body = req.body;
    let categoria = new Categoria({

        descripcion: body.descripcion,
        usuario: req.usuario._id

    });
    categoria.save((err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err: err
            });

        }

        if (!categoriaDB) {
            return res.status(500).json({
                ok: false,
                err: err
            });

        }

        res.json({
            ok: true,
            categoria: categoriaDB
        })

    });




})

app.get('/categoria', verificaToken, (req, res) => {
    Categoria.find({})
        .sort('descripcion')
        .populate('usuario', 'nombre descripcion')
        .exec((err, categorias) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err: err
                });
            }

            res.json({

                ok: true,
                categorias
            });
        })
});
// Mostrar categorias por ID 
app.get('/categoria/:id', verificaToken, (req, res) => {

    Categoria.findOne({})
        .exec((err, categorias) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err: err
                });
            }

            res.json({

                ok: true,
                categorias
            });
        })

});


app.delete('/categoria/:id', [verificaToken, verificaAdminRole], (req, res) => {

    let id = req.params.id;

    Categoria.findByIdAndRemove(id, (err, categoriaDB) => {



        if (err) {
            return res.status(400).json({
                ok: false,
                err: err
            });

        }
        if (!categoriaDB) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'El id no existe'
                }
            });

        }
        res.json({
            ok: true,
            message: 'Categoria Borrada'
        })

    });


});

module.exports = app;