const Sequelize = require('sequelize')
const db = require('../db')

const ShippingAddress = db.define('shippingAddress', {
	email: {
		type: Sequelize.STRING,
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
			is: /^[0-9]{5}(?:-[0-9]{4})?$/,
			isNumeric: true,
		},
	},
})

module.exports = ShippingAddress
