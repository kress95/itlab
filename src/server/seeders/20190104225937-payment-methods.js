'use strict'

const uuidv4 = require('uuid/v4')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('PaymentMethods', [
      {id: uuidv4(), name: 'Boleto'},
      {id: uuidv4(), name: 'Cartão de Crédito'},
      {id: uuidv4(), name: 'Depósito'},
    ])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('PaymentMethods', null, {})
  },
}
