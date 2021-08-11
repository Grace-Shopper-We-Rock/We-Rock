import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProductListItem from './ProductListItem'
import Welcome from './Welcome'
import { fetchProducts } from '../store/products'
import { setSingleProduct } from '../store/singleProduct'
//Imported UI elements:
import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Pagination from '@material-ui/lab/Pagination';
import Grid from '@material-ui/core/Grid'
import useStyles from '../../public/useStyles'
import { fetchCart } from '../store/cart'

class ProductsList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: true,
			page: 1,
		}
	}

	async componentDidMount() {
		this.props.getProducts()
		this.props.clearProduct()
		this.setState({ loading: false })
	}

	render() {
		const setPage = (val) => {
			this.setState({ page: val })
		}
		const productPerPage = 9
		const indexOfLastProduct = this.state.page * productPerPage
		const indexOfFirstProduct = indexOfLastProduct - productPerPage
		const { classes, products, cart, isLoggedIn } = this.props
		return (
			<main>
				{this.state.loading ? (
					<p> Loading...</p>
				) : (
					<Container className={classes.cardGrid} maxWidth='md'>
						<Grid container spacing={4}>
							{products.slice(indexOfFirstProduct, indexOfLastProduct).map((product) => (
								<ProductListItem key={product.id} product={product} />
							))}
						</Grid>
					</Container>
				)}
				<Container className={classes.paginationGrid} maxWidth='md'>
					<Grid container justify="center" padding={10} margin={5}>
						<Pagination count={products.length % productPerPage === 0 ? products.length / productPerPage : Math.floor(products.length / productPerPage) + 1} page={this.page} onChange={(event, val) => setPage(val)} />
					</Grid>
				</Container>
			</main>
		)
	}
}

const mapState = (state) => {
	return {
		products: state.products,
		cart: state.cart,
		isLoggedIn: !!state.auth.id,
	}
}

const mapDispatch = (dispatch) => {
	return {
		clearProduct: () => dispatch(setSingleProduct({})),
		getProducts: () => dispatch(fetchProducts()),
		loadCart: (userId, orderId) => dispatch(fetchCart(userId, orderId)),
	}
}

export default connect(
	mapState,
	mapDispatch
)(withStyles(useStyles)(ProductsList))
