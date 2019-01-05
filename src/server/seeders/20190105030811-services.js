'use strict'

const uuidv4 = require('uuid/v4')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Services', [
      {id: uuidv4(), name: 'Garantia Extendida'},
      {id: uuidv4(), name: 'Instalação'},
    ])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Services', null, {})
  },
}
