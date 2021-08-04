const router = require('express').Router()
const {
	models: { User, ShippingAddress },
} = require('../db')
module.exports = router

router.post('/login', async (req, res, next) => {
	try {
		res.send({ token: await User.authenticate(req.body) })
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
				.send('User account with this email address already exists')
		} else {
			next(err)
		}
	}
})

router.get('/me', async (req, res, next) => {
	try {
		res.send(await User.findByToken(req.headers.authorization))
	} catch (ex) {
		next(ex)
	}
})
