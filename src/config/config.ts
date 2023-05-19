export default () => ({
  database_url: process.env.DB_CONNECTION_STRING,
  jwtSecret: process.env.JWT_SECRET,
});
