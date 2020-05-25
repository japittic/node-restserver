const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');

const Usuario = require('../models/usuario');
const Producto = require('../models/producto');
// default options
app.use(fileUpload({ useTempFiles: true }));

app.put('/upload/:tipo/:id', (req, res) => {

    let tipo = req.params.tipo;
    let id = req.params.id;

    if (!req.files) {
        return res.status(400)
            .json({
                ok: false,
                err: {
                    message: 'no se ha seleccionado archivo alguno'
                }
            });
    }



    let tiposValidos = ['productos', 'usuarios'];

    if (tiposValidos.indexOf(tipo) < 0) {
        return res.status(400).json({

            ok: false,
            err: {
                message: 'Los tipos permitidos son:' + tiposValidos.join(', ')

            }
        })

    }

    let archivo = req.files.archivo;
    let nombreCortado = archivo.name.split('.');
    let extension = nombreCortado[nombreCortado.length - 1];


    let extensionesValidas = ['png', 'jpg', 'gif', 'jpeg']


    if (extensionesValidas.indexOf(extension) < 0) {
        return res.status(400).json({

            ok: false,
            err: {
                message: 'Las extensiones permitidas son:' + extensionesValidas.join(', '),
                ext: extension
            }
        })
    }

    // Cambiar el nombre del archivo

    let nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extension}`



    // Use the mv() method to place the file somewhere on your server
    archivo.mv(`uploads/${tipo}/${ nombreArchivo }`, function(err) {
        if (err)
            return res.status(500).json({
                ok: false,
                err
            })

        // res.json({
        //     ok: true,
        //     message: 'Imagen subida correctamente'
        // });

        if (tipo == 'usuarios') {
            imagenUsuario(id, res, nombreArchivo);
        } else {
            imagenProducto(id, res, nombreArchivo);
        }

    });

});



function imagenUsuario(id, res, nombreArchivo) {
    Usuario.findById(id, (err, usuarioDB) => {

        if (err) {
            borraArchivo(usuarioDB, 'usuario');
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!usuarioDB) {
            borraArchivo(usuarioDB, 'usuario');
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no existe'
                }
            })
        }
        borraArchivo(usuarioDB, 'usuario');


        usuarioDB.img = nombreArchivo;
        usuarioDB.save((err, usuarioDB) => {

            res.json({
                ok: true,
                usuario: usuarioDB, // usuarioGuardado,
                img: nombreArchivo
            });


        });
    });

}



function borraArchivo(nombreImagen, tipo) {
    let pathImagen = path.resolve(__dirname, `../../uploads/${tipo}/${nombreImagen}`)
    if (fs.existsSync(pathImagen))

        fs.unlinkSync(pathImagen);
}

function imagenProducto(id, res, nombreArchivo) {

    Producto.findById(id, (err, productoDB) => {

        if (err) {
            borraArchivo(nombreArchivo, 'productos');

            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            borraArchivo(nombreArchivo, 'productos');
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'productos no existe'
                }
            })
        }
        borraArchivo(productoDB.img, 'productos');


        productoDB.img = nombreArchivo;
        productoDB.save((err, productoGuardado) => {

            res.json({
                ok: true,
                producto: productoGuardado, // usuarioGuardado,
                img: nombreArchivo
            });


        });
    });
}
module.exports = app;