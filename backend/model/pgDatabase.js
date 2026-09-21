const Pool = require('pg').Pool;

// const pool = new Pool({
//     host: process.env.PG_HOST,
//     user: process.env.PG_USER,
//     password: process.env.PG_PASS,
//     database: process.env.PG_DB,
//     port: process.env.PG_PORT
// });

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "postgres",
    database: "proyectoFinal",
    port: 5432
});

// PG_HOST=localhost
// PG_USER=postgres
// PG_PASS=postgres
// PG_DB=proyectoFinal
// PG_PORT=5432



module.exports = pool;