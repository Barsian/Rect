const mariadb = require('mariadb');
const logger = require('./logging');
const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  //password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  connectionLimit: 5
});
module.exports = {
  getConnection: () => {
    return new Promise((resolve, reject) => {
      pool
        .getConnection()
        .then((connection) => {
          logger.info('Connected to MariaDB...');
          resolve(connection);
        }).catch((error) => {
          logger.error('Connection Faild to MariaDB!')
          reject(error);
        });
    });
  }
}