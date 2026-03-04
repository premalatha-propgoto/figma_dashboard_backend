import knex from "knex";
import knexfile from "../knexfile.js";
const config = knexfile.development;
const db = knex(config);
export default db;