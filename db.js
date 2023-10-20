import pg from 'pg'

// const pool = new pg.Pool({
//     user: process.env.PGUSER,
//     password: process.env.PGPASSWORD,
//     host: process.env.PGHOST,
//     port: process.env.PGPORT,
//     database: process.env.PGDATABASE
// })

const pool = new pg.Pool({
    user: "postgres",
    password: "admin",
    host: "localhost",
    port: 5432,
    database: "api_halloween"
})
export default pool