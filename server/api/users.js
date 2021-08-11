const router = require('express').Router()
const {
	models: { User, ShippingAddress },
} = require('../db')

const {
	requireToken,
	tokenMatchRequest,
	isAdmin,
} = require('../securityMiddleware')

module.exports = router

router.get('/', requireToken, isAdmin, async (req, res, next) => {
	try {
		const users = await User.findAll({
			// explicitly select only the id and username fields - even though
			// users' passwords are encrypted, it won't help if we just
			// send everything to anyone who asks!
			attributes: ['id', 'email'],
		})
		res.json(users)
	} catch (err) {
		next(err)
	}
})

router.get(
	'/:userId/addresses',
	requireToken,
	tokenMatchRequest,
	async (req, res, next) => {
		try {
			const { id } = req.user
			const addresses = await ShippingAddress.findAll({
				where: {
					userId: id,
				},
			})
			res.json(addresses)
		} catch (error) {
			next(error)
		}
	}
)

router.put(
	'/:userId',
	requireToken,
	tokenMatchRequest,
	async (req, res, next) => {
		try {
			const { id } = req.user
			const user = req.user
			const { firstName, lastName, email, password } = req.body
			const updatedUser = await user.update({
				firstName,
				lastName,
				email,
				password,
			})
			res.json(updatedUser)
		} catch (error) {
			if (error.name === 'SequelizeUniqueConstraintError') {
				next({
					status: 401,
					message: 'User account with this email address already exists.',
				})
			} else if (error.name === 'SequelizeValidationError') {
				next({
					status: 401,
					message: 'Please provide valid email address.',
				})
			}
			next(error)
		}
	}
)

//EDIT TO USE FIND OR CREATE
router.put(
	'/:userId/addresses',
	requireToken,
	tokenMatchRequest,
	async (req, res, next) => {
		try {
			const { id, email } = req.user
			if (!req.body.email) {
				req.body.email === email
			}

			const [address, wasCreated] = await ShippingAddress.findOrCreate({
				where: {
					userId: id,
				},
				defaults: req.body,
			})

			if (wasCreated) {
				req.user.addShippingAddress(address)
				res.json(address)
			} else {
				const updatedAddress = await address.update(req.body)
				res.json(updatedAddress)
			}
		} catch (error) {
			if (error.name === 'SequelizeValidationError') {
				let message = ''
				let errors = error.errors
				console.log('ERRORS ARRAY: ', error.errors)

				for (const error of errors) {
					if (error.path === 'zipCode' && !message.includes('zip code')) {
						message += 'Please provide valid zip code.'
					}
					if (error.path === 'email') {
						message += 'Please provide valid email address.'
					}
				}
				next({
					status: 401,
					message: message,
				})
			} else {
				next(error)
			}
		}
	}
)
