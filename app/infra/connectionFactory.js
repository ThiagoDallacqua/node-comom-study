var mysql = require('mysql');

function createDBConnection(app) {
  if (!process.env.NODE_ENV) {
    return mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '1234',
      database: 'casadocodigo_nodejs'
    });
  }

  if (process.env.NODE_ENV == 'test') {
    return mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '1234',
      database: 'casadocodigo_nodejs_test'
    });
  }
}

module.exports = function() {
  return createDBConnection;
}
