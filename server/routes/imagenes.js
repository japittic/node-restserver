const express = require('express');
const fs = require('fs');
const path = require('path');
let app = express();
const { verificaTokenImg } = require('../middlewares/autenticacion');

app.get('/imagen/:tipo/:img', verificaTokenImg, (req, res) => {

    let tipo = req.params.tipo;
    let img = req.params.img;
    let noimagePath = path.resolve(__dirname, '../assets/r.jpg');

    // let pathImg = `./uploads/${tipo}/${img}`;
    let pathImagen = path.resolve(__dirname, `../../uploads/${tipo}/${img}`)

    if (fs.existsSync(pathImagen)) {
        res.sendFile(noimagePath);

    } else {
        let noimagePath = path.resolve(__dirname, '../assets/r.jpg');
        res.sendFile(noimagePath);
    }

})

module.exports = app;