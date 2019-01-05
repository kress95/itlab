'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      clientName: {
        type: Sequelize.STRING,
      },
      date: {
        type: Sequelize.DATE,
      },
      value: {
        type: Sequelize.DECIMAL(10, 2),
      },
      applianceId: {
        type: Sequelize.UUID,
        references: {model: 'Appliances', key: 'id'},
      },
      paymentMethodId: {
        type: Sequelize.UUID,
        references: {model: 'PaymentMethods', key: 'id'},
      },
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Orders')
  },
}
