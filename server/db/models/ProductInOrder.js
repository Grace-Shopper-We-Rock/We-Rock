const Sequelize = require('sequelize')
const db = require('../db')

module.exports = db.define("productInOrder", {
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
});