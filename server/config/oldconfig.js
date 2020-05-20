process.env.ID_CLIENT = process.env.ID_CLIENT || '753166329400-qigghtm35pts1ant8pmm77af5nio62j5.apps.googleusercontent.com';


process.env.PORT = process.env.PORT || 3000;
// process.env.Caducidad_token = 60 * 60 * 24 * 30;
process.env.Caducidad_token = '48d'
    // let mitoken;
process.env.seed_token = 'secret';

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

process.env.seed = process.env.seed || 'secret';
let urlDb;


if (process.env.NODE_ENV === 'dev') {

    urlDb = 'mongodb://localhost:27017/cafe'
} else {
    // urlDb = process.env.MONGO_URI;
    // urlDb = 'mongodb://japittic:exJC9awL3VgYKOD8@cluster0-si9da.mongodb.net:13209/cafe?authSource=admin&ssl=true'
    // urlDb = 'mongodb://japittic:exJC9awL3VgYKOD8@cluster0-shard-00-01-si9da.mongodb.net:27017/cafe'
    urlDb = 'mongodb+srv://japittic:exJC9awL3VgYKOD8@cluster0-si9da.mongodb.net/test?retryWrites=true&w=majority'
}
// urlDb = 'mongodb+srv://japittic:exJC9awL3VgYKOD8@cluster0-si9da.mongodb.net/cafe'
// "mongodb://japittic:exJC9awL3VgYKOD8@cluster0-si9da.mongodb.net:27017/cafe"
// urlDb = 'mongodb://japittic:exJC9awL3VgYKOD8@cluster0-si9da.mongodb.net:27017/cafe'
// const uri = "mongodb+srv://japittic:exJC9awL3VgYKOD8@cluster0-si9da.mongodb.net/test?retryWrites=true&w=majority";

process.env.URLDB = urlDb;

process.env.ID_CLIENT = process.env.ID_CLIENT || '753166329400-qigghtm35pts1ant8pmm77af5nio62j5.apps.googleusercontent.com';

DATABASE_URI=mongodb://username:password@host:port/database?authSource=admin&ssl=true

 urlDb = 'mongodb://japittic:exJC9awL3VgYKOD8@cluster0-si9da.mongodb.net/test?retryWrites=true&w=majority'
}

"Not a valid origin for the client: https://rocky-temple-41537.herokuapp.com has not been whitelisted for client ID 219758474264-vh1bibcphgvbc32km508lubtqkanikf1.apps.googleusercontent.com. Please go to https://console.developers.google.com/ and whitelist this origin for your project's client ID."


const express = require('express');
let { verificaToken, verificaAdminRole } = require('../middlewares/autenticacion');
let Categoria = require('../models/categoria')
let app = express();