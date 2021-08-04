const router = require('express').Router()
const { models: { Product } } = require('../db')
module.exports = router

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
        const product = await Product.findByPk(req.params.productId)
        if (product) res.json(product)
        else res.status(404).json('Sorry! We can\'t find this rock!')
    }
    catch (err) {
        next(err)
    }
})