const Sequelize = require('sequelize')
const db = require('../db')

module.exports = db.define("review", {
    date: {
        type: Sequelize.DATE,
        validate: {
            isDate: true,
        },
    },
    text: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
            max: 10,
        },
    }
})
