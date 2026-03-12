import knex from "knex";
const db = knex({
  client: "pg",
  connection: {
   host: "host.docker.internal",
    user: "postgres",
    password: "Prema",
    database: "figma_dashboard",
  },
});
export default db;