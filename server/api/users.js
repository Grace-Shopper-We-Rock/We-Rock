const router = require('express').Router()
const {
	models: { User, ShippingAddress },
} = require('../db')
const { requireToken } = require('../securityMiddleware')
module.exports = router

router.get('/', async (req, res, next) => {
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

router.get('/:userId/addresses', requireToken, async (req, res, next) => {
	try {
		const { id } = req.user
		if (id !== Number(req.params.userId)) {
			return res.status(403).send('Access not permitted.')
		}
		const addresses = await ShippingAddress.findAll({
			where: {
				userId: id,
			},
		})
		res.json(addresses)
	} catch (error) {
		next(error)
	}
})
