'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PaymentMethods', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      name: {
        type: Sequelize.STRING,
      },
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('PaymentMethods')
  },
}
