'use strict'

const { db, models: { User, Product, Order } } = require('../server/db')

const products = require('./productData')
const users = require('./userData')
const orders = require('./orderData')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  try {
    await db.sync({ force: true }) // clears db and matches models to tables
    console.log('db synced!')

    // Creating Products
    const productInstances = await Promise.all(products.map(product => {
      return Product.create(product);
    }));

    // Creating Users
    const userInstances = await Promise.all(users.map(user => {
      return User.create(user);
    }))

    // Creating Orders
    const orderInstances = await Promise.all(orders.map(order => {
      return Order.create(order);
    }))

    const [User1, User2, User3, User4, User5, User6] = userInstances;
    const [Order1, Order2, Order3, Order4, Order5, Order6] = orderInstances;

    // Create associations between Users and Orders
    await User1.setOrders([1, 7])
    await User2.setOrders([3])
    await User3.setOrders([2, 10, 12])
    await User4.setOrders([9, 19])
    await User5.setOrders([14])
    await User6.setOrders([15, 16, 17, 18])

    // Create associations between Orders and Products
    // await Order1.setUser([1, 7, 4, 7])
    // await Order2.setUser([30, 30, 31])
    // await Order3.setUser([2, 10, 12, 44, 73])
    // await Order4.setUser([89, 19, 39, 21, 44, 76, 42, 23, 45])
    // await Order5.setUser([5])
    // await Order6.setOrders([15, 12, 27, 50, 99, 99])

  } catch (err) {
    console.log(err);
  }

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded ${orders.length} orders`)
  console.log(`seeded successfully`)
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
