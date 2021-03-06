// ============================
//  Puerto
// ============================
process.env.PORT = process.env.PORT || 3000;
// process.env.PORT = 8080;
process.env.seed_token = 'secret';
// ============================
//  Entorno
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// ============================
//  Vencimiento del Token
// ============================
// 60 segundos
// 60 minutos
// 24 horas
// 30 días
process.env.CADUCIDAD_TOKEN = '144h'; //90 * 60 * 120 * 30;


// ============================
//  SEED de autenticación
// ============================
process.env.SEED = process.env.SEED || 'secret';

// ============================
//  Base de datos
// ============================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {

    // urlDB = process.env.MONGO_URI;
    // urlDb = 'mongodb://japittic:exJC9awL3VgYKOD8@cluster0-si9da.mongodb.net:13209/cafe?authSource=admin&ssl=true'
    // urlDB = 'mongodb+srv://alx_admin:SuperAdmin@serapeum-edlmi.mongodb.net/test'
    var user = 'japittic';
    var pass = 'exJC9awL3VgYKOD8';
    var DataBaseName = 'cafe';
    urlDB = `mongodb+srv://${user}:${pass}@cluster0-si9da.mongodb.net/${DataBaseName}?retryWrites=true&w=majority`
}
process.env.URLDB = urlDB;

// ============================
//  Google Client ID
// ============================
process.env.ID_CLIENT = process.env.ID_CLIENT || '753166329400-qigghtm35pts1ant8pmm77af5nio62j5.apps.googleusercontent.com';