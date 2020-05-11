process.env.PORT = process.env.PORT || 3000;
process.env.Caducidad_token = 60 * 60 * 24 * 30;
// let mitoken;
process.env.seed_token = 'secret';
let seed;
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

process.env.seed = process.env.seed || 'secret';
let urlDb;


if (process.env.NODE_ENV === 'dev') {

    urlDb = 'mongodb://localhost:27017/cafe'
} else {
    // urlDb = process.env.MONGO_URI;
    urlDb = 'mongodb://japittic:exJC9awL3VgYKOD8@cluster0-si9da.mongodb.net:13209/cafe'

}
// urlDb = 'mongodb+srv://japittic:exJC9awL3VgYKOD8@cluster0-si9da.mongodb.net/cafe'
// "mongodb://japittic:exJC9awL3VgYKOD8@cluster0-si9da.mongodb.net:27017/cafe"
// urlDb = 'mongodb://japittic:exJC9awL3VgYKOD8@cluster0-si9da.mongodb.net:27017/cafe'
// const uri = "mongodb+srv://japittic:exJC9awL3VgYKOD8@cluster0-si9da.mongodb.net/test?retryWrites=true&w=majority";

process.env.URLDB = urlDb;