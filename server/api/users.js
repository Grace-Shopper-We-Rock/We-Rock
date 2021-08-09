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
			next(error)
		}
	}
)

router.put(
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
			if (!addresses.length) {
				const newAddress = await ShippingAddress.create(req.body)
				req.user.addShippingAddress(newAddress)
				res.json([newAddress])
			} else {
				const updatedAddress = await addresses[0].update(req.body)
				const allAddresses = await ShippingAddress.findAll({
					where: {
						userId: id,
					},
				})
				res.json(allAddresses)
			}
		} catch (error) {
			next(error)
		}
	}
)
