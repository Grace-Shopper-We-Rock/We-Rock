'use strict'

const { db, models: { User, Product, Order } } = require('../server/db')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all([
    User.create({
      email: 'tika@gmail.com',
      firstName: 'Tika',
      lastName: 'Llyn',
      password: 'tpass',
    }),
    User.create({
      email: 'alex@gmail.com',
      firstName: 'Alex',
      lastName: 'Fox',
      password: 'apass',
    }),
    User.create({
      email: 'julia@gmail.com',
      firstName: 'Julia',
      lastName: 'Crooijmans',
      password: 'jpass',
    }),
    User.create({
      email: 'anna@gmail.com',
      firstName: 'Anna',
      lastName: 'Strasser',
      password: 'apass',
    }),
    User.create({
      email: 'sarah@gmail.com',
      firstName: 'Sarah',
      lastName: 'Zhao',
      password: 'spass',
    }),
    User.create({
      email: 'shirley@gmail.com',
      firstName: 'Shirley',
      lastName: 'Cheung',
      password: 'spass',
    }),
    User.create({
      email: 'hannah@gmail.com',
      firstName: 'Hannah',
      lastName: 'Kemp',
      password: 'hpass',
    }),
    User.create({
      email: 'katie@gmail.com',
      firstName: 'Katie',
      lastName: 'Wawro',
      password: 'kpass',
    }),
    User.create({
      email: 'em@gmail.com',
      firstName: 'Em',
      lastName: 'Comeau',
      password: 'epass',
    }),
    User.create({
      email: 'orlando@gmail.com',
      firstName: 'Orlando',
      lastName: 'Caraballo',
      password: 'opass',
    }),
  ])

  // Creating Products
  const products = await Promise.all([
    Product.create({
      name: 'Rocky',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id lorem leo. Nunc a vestibulum purus.',
      size: 'small',
      price: 10.00,
      stockQuantity: 5,
    }),
    Product.create({
      name: 'Boulder',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id lorem leo. Nunc a vestibulum purus.',
      size: 'large',
      imageUrl: 'https://images2.minutemediacdn.com/image/upload/c_fill,g_auto,h_1248,w_2220/v1555444935/shape/mentalfloss/pet-rock_1.png?itok=zqi23tia',
      price: 80.00,
      stockQuantity: 33,
    }),
    Product.create({
      name: 'Mountain',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id lorem leo. Nunc a vestibulum purus.',
      size: 'large',
      imageUrl: 'https://pbs.twimg.com/profile_images/1380267127744122881/aXZCLDBK_400x400.jpg',
      price: 200.00,
      stockQuantity: 3,
    }),
    Product.create({
      name: 'Sandy',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id lorem leo. Nunc a vestibulum purus.',
      size: 'small',
      imageUrl: 'https://www.lauraradniecki.com/wp-content/uploads/2020/05/2020-05-04_0188.jpg',
      price: 0.99,
      stockQuantity: 100000,
    }),
    Product.create({
      name: 'Pebbles',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id lorem leo. Nunc a vestibulum purus.',
      size: 'medium',
      imageUrl: 'https://hypixel.net/attachments/1680172/',
      price: 7.25,
      stockQuantity: 19,
    }),
    Product.create({
      name: 'Everest',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id lorem leo. Nunc a vestibulum purus.',
      size: 'large',
      imageUrl: 'https://www.thegreenhead.com/imgs/googly-eyed-rock-pool-float-2.jpg',
      price: 999.99,
      stockQuantity: 1,
    }),
    Product.create({
      name: 'Cobble',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id lorem leo. Nunc a vestibulum purus.',
      size: 'small',
      imageUrl: 'https://pbs.twimg.com/media/D-9O0T8W4AMPKZg.jpg',
      price: 8.12,
      stockQuantity: 2,
    }),
    Product.create({
      name: 'Slab',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id lorem leo. Nunc a vestibulum purus.',
      size: 'large',
      price: 67.00,
      stockQuantity: 44,
    }),
    Product.create({
      name: 'Stone',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id lorem leo. Nunc a vestibulum purus.',
      size: 'medium',
      price: 11.11,
      stockQuantity: 123,
    }),
    Product.create({
      name: 'Earth',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id lorem leo. Nunc a vestibulum purus.',
      size: 'large',
      price: 25.25,
      stockQuantity: 1,
    }),
  ])

  // Creating Orders
  const orders = await Promise.all([
    Order.create({
    }),
    Order.create({
    }),
    Order.create({
    }),
    Order.create({
    }),
    Order.create({
    }),
    Order.create({
    }),
    Order.create({
    }),
    Order.create({
    }),
    Order.create({
    }),
    Order.create({
    }),
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded ${orders.length} orders`)
  console.log(`seeded successfully`)
  return {
    users: {
      tika: users[0],
      alex: users[1],
      julia: users[2],
      anna: users[3],
      sarah: users[4],
      shirley: users[5],
      hannah: users[6],
      katie: users[7],
      em: users[8],
      orlando: users[9]
    },
    products: {
      rocky: products[0],
      boulder: products[1],
      mountain: products[2],
      sandy: products[3],
      pebbles: products[4],
      everest: products[5],
      cobble: products[6],
      slab: products[7],
      stone: products[8],
      earth: products[9]
    },
    orders: {
      order1: orders[0],
      order2: orders[1],
      order3: orders[2],
      order4: orders[3],
      order5: orders[4],
      order6: orders[5],
      order7: orders[6],
      order8: orders[7],
      order9: orders[8],
      order10: orders[9]
    }
  }
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
