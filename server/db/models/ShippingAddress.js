const Sequelize = require('sequelize')
const db = require('../db')

const ShippingAddress = db.define('shippingAddress', {
	email: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false,
		validate: {
			isEmail: true,
		},
	},
	firstName: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true,
		},
	},
	lastName: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true,
		},
	},
	streetAddress: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true,
		},
	},
	city: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true,
			isAlphanumeric: true,
		},
	},
	state: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			len: [2],
		},
	},
	zipCode: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true,
			len: [5],
			isNumeric: true,
		},
	},
})

module.exports = ShippingAddress
