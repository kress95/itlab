'use strict'

const uuidv4 = require('uuid/v4')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [
      {id: uuidv4(), name: 'Ventilador'},
      {id: uuidv4(), name: 'Ducha'},
      {id: uuidv4(), name: 'Filtro de Água'},
      {id: uuidv4(), name: 'Ar Condicionado'},
    ])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {})
  },
}
