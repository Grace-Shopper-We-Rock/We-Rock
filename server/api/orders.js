const router = require('express').Router()
const orders = require('../../script/orderData')
const { models: { User, Product, Review, ProductInOrder, Order, ShippingAddress } } = require('../db')
module.exports = router

//GET ROUTES:
router.get('/', async (req, res, next) => {
    try {
        const orders = await Order.findAll({
            include: [{ model: User }, { model: ProductInOrder }, { model: ShippingAddress }]
        })
        res.json(orders)
    } catch (err) {
        next(err)
    }
})

router.get('/:orderId', async (req, res, next) => {
    try {
        const order = await Order.findByPk(req.params.orderId, {
            include: [{ model: User }, { model: ProductInOrder }, { model: ShippingAddress }]
        })
        if (order) res.json(order)
        else res.status(404).json('Sorry! We can\'t find this order!')
    }
    catch (err) {
        next(err)
    }
})

router.get('/cart/:userId', async (req, res, next) => {
    try {
        const order = await Order.findOne({ where: { userId: req.params.userId }, status: 'cart' }, {
            include: [{ model: User }, { model: ProductInOrder }, { model: ShippingAddress }]
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
router.put('/:orderId', async (req, res, next) => {
    try {
        const order = await Order.findByPk(req.params.orderId);
        res.send(await order.update(req.body))
    } catch (error) {
        next(error);
    }
});

router.put('/cart/:userId/:productId', async (req, res, next) => {
    try {
        const order = await Order.findOne({ where: { userId: req.params.userId, status: 'cart' } }, {
            include: [{ model: ProductInOrder }]
        });
        //still figuring out logic!
        const product = await ProductInOrder.findByPk(req.params.productId)
        order.removeProductInOrder(product)
        res.send(await order.update(order))
    } catch (error) {
        next(error);
    }
});


//DELETE ROUTES:
router.delete('/:robotId', async (req, res, next) => {
    try {
        const robot = await Robot.findByPk(req.params.robotId);
        await robot.destroy();
        res.json(robot);
    } catch (error) {
        next(error);
    }
});
