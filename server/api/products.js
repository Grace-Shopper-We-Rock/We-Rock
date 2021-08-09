const router = require('express').Router()
const {
  models: {User, Product, Review, ProductInOrder},
} = require('../db')
module.exports = router
const {requireToken, isAdmin} = require('../securityMiddleware')

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
      include: [{model: Review, include: User}, {model: ProductInOrder}],
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

    // o: you can also send this to the error handler
    if (!product) {
      // return res.status(404).send(`Product with id ${productId} not found.`)
      next({
        status: 404,
        message: `Product with id ${productId} not found.`,
      })
    }

    // o: you can do updates in one request
    const [updatedCount, [updatedItems]] = Product.update({where: {
			producId: productId
		}}, req.body)

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
      // o: you can also send this to the error handler
      return res.status(400).send('Invalid product id.')
    }

    // o: you can do this in one line
    const deletedProducts = await Product.destroy({
      where: {
        id: productId,
      },
    })
    if (!deletedProducts) {
      // o: you can also send this to the error handler
      res.status(404).send(`Product with id ${productId} not found.`)
    } else {
      res.sendStatus(204)
    }
  } catch (error) {
    next(error)
  }
})
