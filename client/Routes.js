import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch, Redirect } from 'react-router-dom'

import { Login } from './components/AuthForm'
import SignUp from './components/SignUp'
import store, { me } from './store'
import ProductsList from './components/ProductsList'
import SingleProduct from './components/SingleProduct'
import Cart from './components/Cart'
import Home from './components/Home'
import Welcome from './components/Welcome'
import ConfirmationPage from './components/ConfirmationPage'
import Reviews from './components/Reviews'
import Checkout from './components/CheckoutPage'
import EditProfile from './components/EditProfile'
import OrderDetails from './components/OrderDetails'
import AllUserOrders from './components/AllUserOrders'
import { fetchCart } from './store/cart'

/**
 * COMPONENT
 */
class Routes extends Component {
	constructor(props) {
		super(props)

		this.saveCartToLocalStorage = this.saveCartToLocalStorage.bind(this)
	}
	componentDidMount() {
		this.props.loadInitialData()
		!this.props.isLoggedIn && this.loadCartFromLocalStorage()
	}

	saveCartToLocalStorage() {
		if (this.props.cart.id) {
			let myStorage = window.localStorage
			myStorage.removeItem('orderId')
			myStorage.setItem('orderId', this.props.cart.id)
		}
	}
	/*updates the data item on refresh*/

	loadCartFromLocalStorage() {
		if (window.localStorage.orderId) {
			window.data = window.localStorage.getItem('orderId')
			this.props.loadCart(null, window.data)
		}
		setInterval(this.saveCartToLocalStorage, 3000)
	}

	render() {
		const { isLoggedIn } = this.props

		return (
			<div>
				<Switch>
					<Route path='/' exact component={Welcome} />
					<Route path='/products' exact component={ProductsList} />
					<Route path='/products/:productId' component={SingleProduct} />
					<Route path='/cart' component={Cart} />
					<Route
						path='/confirmationpage/:orderId'
						component={ConfirmationPage}
					/>
					<Route path='/orders/user/:userId' exact component={AllUserOrders} />
					<Route path='/orders/:orderId' component={OrderDetails} />
					<Route path='/checkout' component={Checkout} />
					{!isLoggedIn ? (
						<React.Fragment>
							<Route path='/login' component={Login} />
							<Route path='/signup' component={SignUp} />
						</React.Fragment>
					) : (
						<React.Fragment>
							<Route path='/home' exact component={Home} />
							<Route path='/editProfile' component={EditProfile} />
						</React.Fragment>
					)}
				</Switch>
			</div>
		)
	}
}

/**
 * CONTAINER
 */
const mapState = (state) => {
	return {
		// Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
		// Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
		isLoggedIn: !!state.auth.id,
		user: state.auth,
		cart: state.cart,
	}
}

const mapDispatch = (dispatch) => {
	return {
		loadInitialData() {
			dispatch(me())
		},
		loadCart: (userId, orderId) => dispatch(fetchCart(userId, orderId)),
	}
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))
