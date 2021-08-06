import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch, Redirect } from 'react-router-dom'

import { Login } from './components/AuthForm'
import SignUp from './components/SignUp'
import Home from './components/Home'
import { me } from './store'
import ProductsList from './components/ProductsList'
import SingleProduct from './components/SingleProduct'
import ConfirmationPage from './components/ConfirmationPage'
import Reviews from './components/Reviews'
import Checkout from './components/CheckoutPage'

/**
 * COMPONENT
 */
class Routes extends Component {
	componentDidMount() {
		this.props.loadInitialData()
	}

	render() {
		const { isLoggedIn } = this.props

		return (
			<div>
				{isLoggedIn ? (
					<Switch>
						<Route path='/home' component={Home} />
						<Redirect to='/home' />
					</Switch>
				) : (
					<Switch>
						<Route path='/' exact component={ProductsList} />
						<Route path='/products/:productId' component={SingleProduct} />
						<Route path='/login' component={Login} />
						<Route path='/signup' component={SignUp} />
						<Route path='/confirmationpage/:orderId' component={ConfirmationPage} />
						<Route path='/checkout' component={Checkout} />

    	    </Switch>
				)}
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
	}
}

const mapDispatch = (dispatch) => {
	return {
		loadInitialData() {
			dispatch(me())
		},
	}
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))
