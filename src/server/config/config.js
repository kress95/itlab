const fs = require('fs')

const user =
  process.env.DB_USERNAME || process.env.USER || process.env.USERNAME || ''
const pass = process.env.DB_PASSWORD || ''
const host = process.env.DB_HOSTNAME || '127.0.0.1'

module.exports = {
  development: {
    username: user,
    password: pass,
    database: 'itlab_development',
    host: host,
    dialect: 'postgres',
  },
  test: {
    username: user,
    password: pass,
    database: 'itlab_test',
    host: host,
    dialect: 'postgres',
  },
  production: {
    username: user,
    password: pass,
    database: process.env.DB_NAME || 'itlab_production',
    host: host,
    dialect: 'postgres',
    dialectOptions: {
      ssl: true,
    },
  },
}
