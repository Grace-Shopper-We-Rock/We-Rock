//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Order = require('./models/Order')
const Product = require('./models/Product')
const ProductInOrder = require('./models/ProductInOrder')
const Review = require('./models/Review')
const ShippingAddress = require('./models/ShippingAddress')

//associations could go here!

// foreign key: userId
User.hasMany(Review)
Review.belongsTo(User)

// foreign key: productId
Product.hasMany(Review)
Review.belongsTo(Product)

// foreign key: productId
Product.hasMany(ProductInOrder)
ProductInOrder.belongsTo(Product)

// foreign key: orderId
Order.hasMany(ProductInOrder)
ProductInOrder.belongsTo(Order)

// foreign key: addressId
ShippingAddress.hasMany(Order)
Order.belongsTo(ShippingAddress, { through: 'OrderDetail', foreignKey: 'shippingAddressId' })

// foreign key: addressId
// ShippingAddress.belongsToMany(User, { through: 'UserShipping' })
// User.belongsToMany(ShippingAddress, { through: 'UserShipping', foreignKey: 'addressId' })

User.hasMany(ShippingAddress)
ShippingAddress.belongsTo(User)

// foreign key: userId
User.hasMany(Order)
Order.belongsTo(User)

module.exports = {
  db,
  models: {
    User,
    Order,
    Product,
    ProductInOrder,
    Review,
    ShippingAddress,
  },
}
