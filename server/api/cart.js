const router = require('express').Router()
// o: some of these are not being used
const { models: { User, Product, Review, ProductInOrder, Order, ShippingAddress } } = require('../db')
module.exports = router

//CART GET ROUTES:
// admin & protected middleware
router.get('/', async (req, res, next) => {
    try {
        const carts = await Order.findAll({
            where: { status: 'inCart' },
            include: [{ model: User }, { model: ProductInOrder, include: { model: Product } }]
        })
        res.json(carts)
    } catch (err) {
        next(err)
    }
})

//add auth user
router.get('/:userId', async (req, res, next) => {
    try {
        const order = await Order.findOrCreate({
            where: { userId: req.params.userId, status: 'inCart' },
            include: [{ model: User }, { model: ProductInOrder, include: { model: Product } }]
        })
        // o: you can also send this to the error handler
        if (order) res.json(order[0])
        else res.status(404).json('Sorry! We can\'t find this order!')
    }
    catch (err) {
        next(err)
    }
})

//POST ROUTES:
//Create a new ProductInCart:
router.post('/products', async (req, res, next) => {
    try {
        // o: does ProductInCart exist? => should be ProductInOrder
        res.status(201).send(await ProductInCart.create(req.body));
    } catch (error) {
        next(error);
    }
});


//PUT ROUTES:
//UPDATE ProductInCart:
router.put('/products/:productInCartId', async (req, res, next) => {
    try {
        // o: you can do this in one request
        const order = await ProductInCart.findByPk(req.params.productInCartId);
        res.send(await order.update(req.body))
    } catch (error) {
        next(error);
    }
});

//DELETE ROUTES:
//delete ProductInCart:
router.delete('/products/:productInCartId', async (req, res, next) => {
    try {
        // o: you can do this in one request
        const product = await ProductInCart.findByPk(req.params.productInCartId);
        await product.destroy();
        res.json(product);
    } catch (error) {
        next(error);
    }
});
