const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
require('./config/config');


app.use(bodyParser.urlencoded({ extended: false }));

// Configuracion global de rutas
app.use(require('./routes/index'));

// parse application/json
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, '../public')));
// const dbpath = "mongodb://localhost:27017/cafe";

console.log(path.resolve(__dirname, '../public'));
const dbpath = process.env.URLDB;

mongoose
    .connect(dbpath, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => console.log('DB Connected!'))
    .catch(err => {
        console.log(`DB Connection Error: ${err.message}`);
    })




app.listen(process.env.PORT);
console.log('Escuchando el puerto 3000');

// app.listen(process.env.PORT, () => {
//     console.log(`Server is listening on port ${PORT}`);
// });