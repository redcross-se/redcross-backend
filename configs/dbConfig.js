module.exports = {
  development: {
    username: process.env.SQL_USER || "root",
    password: process.env.SQL_PASS || "W7301@jqir#",
    database: process.env.SQL_DATABASE||"red_cross",
    host: process.env.SQL_HOST||"localhost",
    port: 3306,
    dialect: "mysql",
  },
};
