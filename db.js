import pg from 'pg'

const pool = new pg.Pool({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.YOUR_ENV_VAR_GOES_HERE,
    database: process.env.YOUR_ENV_VAR_GOES_HERE
})

export default pool