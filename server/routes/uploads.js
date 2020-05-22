const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');

// default options
app.use(fileUpload({ useTempFiles: true }));

app.put('/upload', (req, res) => {
    if (!req.files) {
        return res.status(400)
            .json({
                ok: false,
                err: {
                    message: 'no se ha seleccionado archivo alguno'
                }
            });
    }
    let archivo = req.files.archivo;
    let nombrearchivo = archivo.name.split('.');
    let extensionesValidas = ['png', 'jpg', 'gif', 'jpeg']


    // Use the mv() method to place the file somewhere on your server
    archivo.mv('uploads/filename.jpg', function(err) {
        if (err)
            return res.status(500).json({
                ok: false,
                err
            })

        res.json({
            ok: true,
            message: 'Imagen subida correctamente'
        });

    });

});
module.exports = app;