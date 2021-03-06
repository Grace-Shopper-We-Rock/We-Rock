'use strict'

const {
	db,
	models: { User, Product, ProductInOrder, Order, Review, ShippingAddress },
} = require('../server/db')

const products = require('./productData')
const users = require('./userData')
const productInOrders = require('./productInOrderData')
const orders = require('./orderData')
const reviews = require('./reviewData')
const addresses = require('./shippingAddressData')
const { ContactsTwoTone } = require('@material-ui/icons')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
	try {
		await db.sync({ force: true }) // clears db and matches models to tables
		console.log('db synced!')

		// Creating Addresses
		const addressInstances = await Promise.all(
			addresses.map((address) => {
				return ShippingAddress.create(address)
			})
		)

		// Creating Products
		const productInstances = await Promise.all(
			products.map((product) => {
				return Product.create(product)
			})
		)

		// Creating Users
		const userInstances = await Promise.all(
			users.map((user) => {
				return User.create(user)
			})
		)

		// Creating Product In Orders
		const productInOrderInstances = await Promise.all(
			productInOrders.map((productInOrder) => {
				return ProductInOrder.create(productInOrder)
			})
		)

		// Creating Orders
		const orderInstances = await Promise.all(
			orders.map((order) => {
				return Order.create(order)
			})
		)

		// Creating Reviews
		const reviewInstances = await Promise.all(
			reviews.map((review) => {
				return Review.create(review)
			})
		)

		const [User1, User2, User3, User4, User5, User6] = userInstances
		const [
			Order1,
			Order2,
			Order3,
			Order4,
			Order5,
			Order6,
			Order7,
			Order8,
			Order9,
			Order10,
			Order11,
			Order12,
			Order13,
			Order14,
			Order15,
		] = orderInstances
		const [
			ProductInOrder1,
			ProductInOrder2,
			ProductInOrder3,
			ProductInOrder4,
			ProductInOrder5,
			ProductInOrder6,
			ProductInOrder7,
			ProductInOrder8,
			ProductInOrder9,
			ProductInOrder10,
			ProductInOrder11,
			ProductInOrder12,
			ProductInOrder13,
			ProductInOrder14,
			ProductInOrder15,
			ProductInOrder16,
			ProductInOrder17,
			ProductInOrder18,
			ProductInOrder19,
			ProductInOrder20,
			ProductInOrder21,
			ProductInOrder22,
			ProductInOrder23,
			ProductInOrder24,
			ProductInOrder25,
			ProductInOrder26,
			ProductInOrder27,
			ProductInOrder28,
			ProductInOrder29,
			ProductInOrder30,
		] = productInOrderInstances
		const [
			Product1,
			Product2,
			Product3,
			Product4,
			Product5,
			Product6,
			Product7,
			Product8,
			Product9,
			Product10,
			Product11,
			Product12,
			Product13,
			Product14,
			Product15,
			Product16,
			Product17,
			Product18,
			Product19,
			Product20,
			Product21,
			Product22,
			Product23,
			Product24,
			Product25,
			Product26,
			Product27,
			Product28,
			Product29,
			Product30,
		] = productInstances
		const [
			Address1,
			Address2,
			Address3,
			Address4,
			Address5,
			Address6,
			Address7,
			Address8,
			Address9,
			Address10,
			Address11,
			Address12,
			Address13,
			Address14,
			Address15,
			Address16,
			Address17,
			Address18,
			Address19,
			Address20,
			Address21,
			Address22,
			Address23,
			Address24,
			Address25,
			Address26,
			Address27,
			Address28,
			Address29,
			Address30,
			Address31,
			Address32,
			Address33,
			Address34,
			Address35,
			Address36,
			Address37,
			Address38,
			Address39,
			Address40,
			Address41,
			Address42,
			Address43,
			Address44,
			Address45,
			Address46,
			Address47,
			Address48,
			Address49,
			Address50,
		] = addressInstances

		// Create associations between Shipping Address and Orders
		await Address1.setOrders([1])
		await Address2.setOrders([2])
		await Address3.setOrders([3])
		await Address4.setOrders([4])
		await Address5.setOrders([5])
		await Address6.setOrders([6])
		await Address7.setOrders([7])
		await Address8.setOrders([8])
		await Address9.setOrders([9])
		await Address10.setOrders([10])
		await Address11.setOrders([11])
		await Address12.setOrders([12])
		await Address13.setOrders([13])
		await Address14.setOrders([14])
		await Address15.setOrders([15])

		// Create associations between Users and Orders
		await User1.setOrders([1, 7])
		await User2.setOrders([3])
		await User3.setOrders([2, 10, 12])
		await User4.setOrders([9, 19])
		await User5.setOrders([14])
		await User6.setOrders([15, 16, 17, 18])

		// Create associations between Orders and ProductInOrder
		await Order1.setProductInOrders([1, 2, 3])
		await Order2.setProductInOrders([4, 5])
		await Order3.setProductInOrders([8])
		await Order4.setProductInOrders([9, 10, 13])
		await Order5.setProductInOrders([11])
		await Order6.setProductInOrders([12])
		await Order7.setProductInOrders([15, 16])
		await Order8.setProductInOrders([20])
		await Order9.setProductInOrders([18, 19])
		await Order10.setProductInOrders([22])
		await Order11.setProductInOrders([17])
		await Order12.setProductInOrders([23])
		await Order13.setProductInOrders([6, 7])
		await Order14.setProductInOrders([21])
		await Order15.setProductInOrders([14])

		// Create associations between ProductInOrder and Products
		await ProductInOrder1.setProduct([1])
		await ProductInOrder2.setProduct([5])
		await ProductInOrder3.setProduct([3])
		await ProductInOrder4.setProduct([8])
		await ProductInOrder5.setProduct([15])
		await ProductInOrder6.setProduct([24])
		await ProductInOrder7.setProduct([28])
		await ProductInOrder8.setProduct([29])
		await ProductInOrder9.setProduct([17])
		await ProductInOrder10.setProduct([23])
		await ProductInOrder11.setProduct([12])
		await ProductInOrder13.setProduct([19])
		await ProductInOrder14.setProduct([10])
		await ProductInOrder15.setProduct([27])
		await ProductInOrder16.setProduct([24])
		await ProductInOrder17.setProduct([23])
		await ProductInOrder18.setProduct([12])
		await ProductInOrder19.setProduct([2])
		await ProductInOrder20.setProduct([13])
		await ProductInOrder21.setProduct([14])
		await ProductInOrder22.setProduct([2])
		await ProductInOrder23.setProduct([3])

		// Create associations between Products and Reviews
		await Product1.setReviews([1, 2, 3, 4, 5, 6, 7, 8])
		await Product2.setReviews([9, 10, 11])
		await Product3.setReviews([12, 13, 14])
		await Product4.setReviews([15, 16, 17, 18])
		await Product5.setReviews([19, 20])
		await Product6.setReviews([21, 22])
		await Product7.setReviews([23, 24, 25])
		await Product8.setReviews([26, 27, 28])
		await Product9.setReviews([29])
		await Product10.setReviews([30])
		await Product11.setReviews([31, 32, 33, 34, 35, 36, 37, 38])
		await Product12.setReviews([39, 40, 41])
		await Product13.setReviews([42, 43, 44])
		await Product14.setReviews([45, 46, 47, 48])
		await Product15.setReviews([49, 50])
		await Product16.setReviews([51, 52])
		await Product17.setReviews([53, 54, 55])
		await Product18.setReviews([56, 57, 58])
		await Product19.setReviews([59])
		await Product20.setReviews([60])
		await Product21.setReviews([61, 62, 63, 64, 65, 66, 67, 68])
		await Product22.setReviews([69, 70, 71])
		await Product23.setReviews([72, 73, 74])
		await Product24.setReviews([75, 76, 77, 78])
		await Product25.setReviews([79, 80])
		await Product26.setReviews([81, 82])
		await Product27.setReviews([83, 84, 85])
		await Product28.setReviews([86, 87, 88])
		await Product29.setReviews([89])
		await Product30.setReviews([90])
		// Create associates between Users and Reviews

		const arrayOf200 = Array.from(Array(200).keys())

		await User1.setReviews(arrayOf200.slice(0, 50))
		await User2.setReviews(arrayOf200.slice(51, 80))
		await User3.setReviews(arrayOf200.slice(81, 120))
		await User4.setReviews(arrayOf200.slice(121, 170))
		await User5.setReviews(arrayOf200.slice(171, 200))
	} catch (err) {
		console.log(err)
	}

	console.log(`seeded ${users.length} users`)
	console.log(`seeded ${products.length} products`)
	console.log(`seeded ${productInOrders.length} product in orders`)
	console.log(`seeded ${orders.length} orders`)
	console.log(`seeded ${reviews.length} reviews`)
	console.log(`seeded ${addresses.length} shipping addresses`)
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
