export default {
  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'postgres',
      password: 'Prema',
      database: 'figma_dashboard'
    },
    migrations: {
      directory: './migrations'
    }
  }
};