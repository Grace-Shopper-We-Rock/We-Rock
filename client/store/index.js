import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import auth from './auth'
import products from './products'
import singleProduct from './singleProduct'
import singleOrder from './singleOrder'
import cartItems from './cartItems'
import userAddresses from './address'

const reducer = combineReducers({
	auth,
	products,
	singleProduct,
	cartItems,
	userAddresses,
})


<<<<<<< HEAD
const reducer = combineReducers({ auth, products, singleProduct, singleOrder, cartItems })
=======
>>>>>>> 6ae27072408c0b51944c8c9e6f2ce28f0aa05ee7
const middleware = composeWithDevTools(
	applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)
const store = createStore(reducer, middleware)

export default store
export * from './auth'
