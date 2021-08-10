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
		const user = await User.create({ email, firstName, lastName, password })
		if (streetAddress) {
			const address = await ShippingAddress.create({
				email,
				firstName,
				lastName,
				streetAddress,
				city,
				state,
				zipCode,
			})
			//associate the address with the user - magic methods
			user.addShippingAddress(address)
		}
		res.send({ token: await user.generateToken() })
	} catch (err) {
		if (err.name === 'SequelizeUniqueConstraintError') {
			res
				.status(401)
				.send('User account with this email address already exists.')
		} else if (err.name === 'SequelizeValidationError') {
			let message = ''
			let errors = err.errors
			for (const error of errors) {
				if (error.path === 'email') {
					message += ' Please provide valid email address. '
				}
				if (error.path === 'zipCode') {
					message += ' Please provide valid zip code. '
				}
			}
			res.status(401).send(message)
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
