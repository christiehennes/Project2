module.exports = {
  "development": {
    "username": process.env.DEV_DB_USER || "root",
    "password": process.env.DEV_DB_PASSWORD || "password",
    "database": "rentee_db",
    "host": "localhost",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "testdb",
    "host": "localhost",
    "dialect": "mysql",
    "logging": false
  },
  "production": {
    "use_env_variable": "JAWSDB_URL",
    "dialect": "mysql"
  }
}
