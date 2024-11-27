module.exports = {
  development: {
    username: process.env.SQL_USER,
    password: process.env.SQL_PASS,
    database: process.env.SQL_DATABASE,
    host: process.env.SQL_HOST,
    port: 3306,
    dialect: "mysql",
  },
};
