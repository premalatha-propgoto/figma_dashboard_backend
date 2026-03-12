export default {
  development: {
    client: "pg",
    connection: {
      host: "host.docker.internal",
      user: "postgres",
      password: "Prema",
      database: "figma_dashboard",
    },
    migrations: {
      directory: "./migrations",
    },
  },
};
