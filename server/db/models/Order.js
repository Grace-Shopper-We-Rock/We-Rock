const Sequelize = require('sequelize')
const db = require('../db')

module.exports = db.define("order", {
    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        validate: {
            isDate: true,
        },
    },
    totalAmount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    status: {
        type: Sequelize.ENUM("inCart", "inProcess", "completed"),
        defaultValue: "inCart",
    },
});
