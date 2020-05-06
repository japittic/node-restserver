const express = require('express');
const app = express();

const mongoose = require('mongoose');

const bodyParser = require('body-parser');
require('./config/config');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('./routes/usuario'));
// parse application/json
app.use(bodyParser.json());
// const dbpath = "mongodb://localhost:27017/cafe";
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