'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('OrderServices', {
      orderId: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      serviceId: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('OrderServices')
  },
}
