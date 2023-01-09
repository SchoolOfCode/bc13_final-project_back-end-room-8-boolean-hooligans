import * as pg from "pg";
const { Pool } = pg.default;

const pool = new Pool({connectionString: process.env.POSTGRES_CONNECTION_URL});
// console.log(process.env.POSTGRES_CONNECTION_URL)
//if statement to check .env setup

export default function query(text, params) {
    return pool.query(text, params);
}