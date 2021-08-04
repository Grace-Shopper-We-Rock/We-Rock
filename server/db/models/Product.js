const Sequelize = require('sequelize')
const db = require('../db')

module.exports = db.define("product", {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    size: {
        type: Sequelize.ENUM("small", "medium", "large"),
        defaultValue: "medium",
    },
    imageUrl: {
        type: Sequelize.STRING,
        defaultValue: "https://townsquare.media/site/723/files/2015/04/Pet-Rock-12.jpg?w=980&q=75",
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    stockQuantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
});