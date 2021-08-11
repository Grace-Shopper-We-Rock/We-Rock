import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchProducts } from '../store/products'

//Matieral-UI elements:
import useStyles from '../../public/useStyles'
import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import ProductListItem from './ProductListItem'
import { addCartItemThunk, fetchCart, deleteCartItemThunk } from '../store/cart'

class CartItems extends Component {
	constructor() {
		super()
		this.state = {
			loading: true,
		}
	}

	componentDidMount() {
		this.setState({ loading: false })
	}

	render() {
		const { classes } = this.props

		if (this.state.loading) return <p> Loading...</p>
		else
			return this.props.cart.productInOrders &&
				this.props.cart.productInOrders.length ? (
				(this.props.cart.productInOrders.map((prodInOrder) =>
					<ProductListItem
						key={prodInOrder.productId}
						product={prodInOrder.product}
					/>
				))
			) : (
				<Card className={classes.card}>
					<CardContent>No Items In Cart!</CardContent>
				</Card>
			)
	}
}

const mapState = (state) => {
	return {
		products: state.products,
		cart: state.cart,
	}
}

const mapDispatch = (dispatch) => {
	return {
		getProducts: () => dispatch(fetchProducts()),
		loadCart: (userId) => dispatch(fetchCart(userId)),
	}
}

export default connect(mapState, mapDispatch)(withStyles(useStyles)(CartItems))
