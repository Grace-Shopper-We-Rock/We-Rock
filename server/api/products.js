const router = require('express').Router()
const {
	models: { User, Product, Review, ProductInOrder },
} = require('../db')
module.exports = router
const { requireToken, isAdmin } = require('../securityMiddleware')

//GET ROUTES:
router.get('/', async (req, res, next) => {
	try {
		const products = await Product.findAll()
		res.json(products)
	} catch (err) {
		next(err)
	}
})

router.get('/:productId', async (req, res, next) => {
	try {
		const product = await Product.findByPk(req.params.productId, {
			include: [{ model: Review, include: User }, { model: ProductInOrder }],
		})
		if (product) res.json(product)
		else res.status(404).json("Sorry! We can't find this rock!")
	} catch (err) {
		next(err)
	}
})

//POST Request - admin add new product to system
router.post('/', requireToken, isAdmin, async (req, res, next) => {
	try {
		// const { name, description, price, stockQuantity, size, imageUrl } = req.body
		// const newProductInfo = { name, description, price, stockQuantity }
		// if (size) {
		// 	newProductInfo.size = size
		// }
		// if (imageUrl) {
		// 	newProductInfo.imageUrl = imageUrl
		// }
		const newProduct = await Product.create(req.body)
		res.json(newProduct)
	} catch (error) {
		next(error)
	}
})

//PUT Request - admin edit product in system
router.put('/:productId', requireToken, isAdmin, async (req, res, next) => {
	try {
		const productId = Number(req.params.productId)
		const product = await Product.findByPk(productId)
		if (!product) {
			return res.status(404).send(`Product with id ${productId} not found.`)
		}
		const updatedProduct = await product.update(req.body)
		res.json(updatedProduct)
	} catch (error) {
		next(error)
	}
})

//DELETE Request - admin delete product in system
router.delete('/:productId', requireToken, isAdmin, async (req, res, next) => {
	try {
		const productId = Number(req.params.productId)
		if (isNaN(productId)) {
			return res.status(400).send('Invalid product id.')
		}
		const deletedProducts = await Product.destroy({
			where: {
				id: productId,
			},
		})
		if (!deletedProducts) {
			res.status(404).send(`Product with id ${productId} not found.`)
		} else {
			res.sendStatus(204)
		}
	} catch (error) {
		next(error)
	}
})
