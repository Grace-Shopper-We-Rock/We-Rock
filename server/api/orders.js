const router = require('express').Router()
const { models: { User, Product, ProductInOrder, Order, ShippingAddress } } = require('../db')
module.exports = router

//GET ROUTES:
// admin & protected middleware
router.get('/', async (req, res, next) => {
    try {
        const orders = await Order.findAll({
            include: [{ model: User }, { model: ProductInOrder, include: { model: Product } }, { model: ShippingAddress }]
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
            include: [{ model: User }, { model: ProductInOrder, include: { model: Product } }, { model: ShippingAddress }]

        })
        if (order) res.json(order)
        else res.status(404).json('Sorry! We can\'t find this order!')
    }
    catch (err) {
        next(err)
    }
})

router.get('/:userId/', async (req, res, next) => {
    try {
        const order = await Order.findByPk(req.params.orderId, {
            include: [{ model: User }, { model: ProductInOrder, include: { model: Product } }, { model: ShippingAddress }]

        })
        if (order) res.json(order)
        else res.status(404).json('Sorry! We can\'t find this order!')
    }
    catch (err) {
        next(err)
    }
})

//POST ROUTES:

router.post('/', async (req, res, next) => {
    try {
        res.status(201).send(await Order.create(req.body));
    } catch (error) {
        next(error);
    }
});

//PUT ROUTES:
//DEFAULT UPDATE CART ROUTE
router.put('/:orderId', async (req, res, next) => {
    try {
        const order = await Order.findByPk(req.params.orderId)
        res.send(await order.update(req.body))
    } catch (error) {
        next(error);
    }
});

//DELETE ROUTES:
router.delete('/:orderId', async (req, res, next) => {
    try {
        const order = await Order.findByPk(req.params.orderId);
        await order.destroy();
        res.json(Order);
    } catch (error) {
        next(error);
    }
});
