const router = require('express').Router()
const {
	models: { User, ShippingAddress },
} = require('../db')
module.exports = router
const { requireToken } = require('../securityMiddleware')

router.post('/login', async (req, res, next) => {
	try {
		const { email, password } = req.body
		res.send({ token: await User.authenticate({ email, password }) })
	} catch (err) {
		next(err)
	}
})

router.post('/signup', async (req, res, next) => {
	try {
		const {
			email,
			password,
			firstName,
			lastName,
			streetAddress,
			city,
			zipCode,
			state,
		} = req.body
		let address
		if (streetAddress) {
			address = await ShippingAddress.create({
				email,
				firstName,
				lastName,
				streetAddress,
				city,
				state,
				zipCode,
			})
		}
		const user = await User.create({ email, firstName, lastName, password })
		user.addShippingAddress(address)
		res.send({ token: await user.generateToken() })
	} catch (err) {
		if (err.name === 'SequelizeUniqueConstraintError') {
			next({
				status: 401,
				message: 'User account with this email address already exists.',
			})
		} else if (err.name === 'SequelizeValidationError') {
			let message = ''
			let errors = err.errors
			for (const error of errors) {
				if (error.path === 'email') {
					message += ' Please provide valid email address. '
				}
				if (error.path === 'zipCode' && !message.includes('zip code')) {
					message += ' Please provide valid zip code. '
				}
			}
			next({
				status: 401,
				message: message,
			})
		} else {
			next(err)
		}
	}
})

router.get('/me', requireToken, async (req, res, next) => {
	try {
		res.send(req.user)
	} catch (ex) {
		next(ex)
	}
})
