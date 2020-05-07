process.env.PORT = process.env.PORT || 3000;

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urlDb;
if (process.env.NODE_ENV === 'dev') {

    urlDb = 'mongodb://localhost:27017/cafe'
} else {
    urlDb = process.env.MONGO_URI;
}
// urlDb = 'mongodb+srv://japittic:exJC9awL3VgYKOD8@cluster0-si9da.mongodb.net/cafe'

process.env.URLDB = urlDb;