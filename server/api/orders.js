const router = require('express').Router()
const {
	models: { User, Product, ProductInOrder, Order, ShippingAddress },
} = require('../db')
module.exports = router

//GET ROUTES:
// admin & protected middleware
router.get('/', async (req, res, next) => {
	try {
		const orders = await Order.findAll({
			include: [
				{ model: User },
				{ model: ProductInOrder, include: { model: Product } },
				{ model: ShippingAddress },
			],
		})
		res.json(orders)
	} catch (err) {
		next(err)
	}
})

// get orders for specific user
router.get('/user/:userId', async (req, res, next) => {
	try {
		const orders = await Order.findAll({
			where: {
				userId: req.params.userId,
			},
			include: [
				{ model: User },
				{ model: ProductInOrder, include: { model: Product } },
				{ model: ShippingAddress },
			],
		})
		res.json(orders)
	} catch (err) {
		next(err)
	}
})

//user auth middleware
router.get('/:orderId', async (req, res, next) => {
	try {
		const order = await Order.findByPk(req.params.orderId, {
			include: [
				{ model: User },
				{ model: ProductInOrder, include: { model: Product } },
				{ model: ShippingAddress },
			],
		})
		if (order) res.json(order)
		else
			next({
				status: 404,
				message: "Sorry! We can't find this order!",
			})
	} catch (err) {
		next(err)
	}
})

//POST ROUTES:

router.post('/', async (req, res, next) => {
	try {
		res.status(201).send(
			await Order.create(req.body, {
				include: [
					{ model: User },
					{ model: ProductInOrder, include: { model: Product } },
					{ model: ShippingAddress },
				],
			})
		)
	} catch (error) {
		next(error)
	}
})

//PUT ROUTES:
//UPDATE ORDER
router.put('/:orderId', async (req, res, next) => {
	try {
		const order = await Order.findByPk(req.params.orderId, {
			include: [
				{ model: User },
				{ model: ProductInOrder, include: { model: Product } },
				{ model: ShippingAddress },
			],
		})
		res.send(await order.update(req.body))
	} catch (error) {
		next(error)
	}
})

//creating a new address and associating with order - also associates address w/ User id provided
//needs orderId in params, userId is optional - req.body includes new address information
router.put('/:orderId/address/:userId', async (req, res, next) => {
	try {
		const [address, wasCreated] = await ShippingAddress.findOrCreate({
			where: req.body,
		})

		//const address = await ShippingAddress.create(req.body)
		const order = await Order.findByPk(req.params.orderId)
		await address.addOrder(order)
		if (req.params.userId) {
			const user = await User.findByPk(Number(req.params.userId))
			await user.addShippingAddress(address)
		}
		res.json(address)
	} catch (error) {
		next(error)
	}
})

//finds a users existing address OR creates a new address if there are changes and associates with the order
router.put('/:orderId/:addressId', async (req, res, next) => {
	try {
		const address = await ShippingAddress.findByPk(
			Number(req.params.address.id)
		)
		const order = await Order.findByPk(Number(req.params.orderId))
		await address.addOrder(order)
		res.status(200).json(address)
	} catch (error) {
		next(error)
	}
})

//DELETE ROUTES:
router.delete('/:orderId', async (req, res, next) => {
	try {
		const order = await Order.findByPk(req.params.orderId)
		await order.destroy()
		res.json(Order)
	} catch (error) {
		next(error)
	}
})
