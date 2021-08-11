import React, { Component } from 'react'
import useStyles from '../../public/useStyles'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

//Imported UI elements:
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import DeleteIcon from '@material-ui/icons/Delete'
import cart, {
	addCartItemThunk,
	fetchCart,
	deleteCartItemThunk,
	updateCartThunk,
	updateCartItemThunk,
} from '../store/cart'

class ProductListItem extends Component {
	constructor(props) {
		super(props)
		this.state = {
			quantity: 0,
			productInCartId: null,
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	async componentDidMount() {
		//Is this product in our cart??
		if (this.props.cart.productInOrders) {
			const product = await this.props.cart.productInOrders.find(
				(prodInOrder) => {
					return prodInOrder.product.id === this.props.product.id
				}
			)
			if (product)
				this.setState({
					quantity: product.quantity,
					productInCartId: product.id,
				})
		}
	}

	async updateTotal(cartId) {
		let newTotal = this.props.cart.productInOrders.reduce(
			(acc, curr) => acc + curr.product.price * curr.quantity,
			0
		)
		await this.props.updateCart(
			{ totalAmount: newTotal },
			cartId,
			this.props.user.id
		)
		//this.props.loadCart(undefined, cartId)
	}

	async handleDelete() {
		await this.props.deleteCartItem(this.state.productInCartId)
		this.updateTotal(this.props.cart.id)
		this.setState({
			quantity: 1,
			productInCartId: null,
		})
	}

	handleChange(evt) {
		this.setState({ quantity: evt.target.value })
	}

	async handleSubmit(evt, cartId) {
		evt.preventDefault()

		if (this.state.productInCartId) {
			await this.props.updateProductInCart(
				{ quantity: this.state.quantity },
				this.state.productInCartId
			)
			this.updateTotal(cartId)
		} else {
			await this.props.addToCart(
				{ quantity: this.state.quantity, productId: this.props.product.id },
				cartId,
				this.props.product
			)
			this.setState({
				productInCartId: this.props.product.id,
			})
			this.updateTotal(this.props.cart.id || null)
		}
	}

	render() {
		const { classes, cart, product } = this.props
		const { handleChange } = this
		const { productInCartId, quantity } = this.state

		return (
			<Grid item key={product.id} xs={12} sm={6} md={4}>
				<Card className={classes.card}>
					<CardMedia
						className={classes.cardMedia}
						image={product.imageUrl}
						title={product.name}
					/>
					<CardContent className={classes.cardContent}>
						<Typography gutterBottom variant='h5' component='h2'>
							{product.name}
							<br />
							<Link to={`/products/${product.id}`}>
								<Button size='small' color='primary'>
									Get To Know Me!
								</Button>
							</Link>
						</Typography>

						<hr />
						<Typography>
							{product.price / 100}$
							<br />
							{productInCartId &&
								'Total: ' + (product.price * quantity) / 100 + '$'}
						</Typography>
					</CardContent>
					<CardActions>
						<select value={this.state.quantity} onChange={handleChange}>
							{[1, 2, 3, 4, 5].map((val) => (
								<option value={val}>{val}</option>
							))}
						</select>
						{productInCartId ? (
							<React.Fragment>
								<Button
									size='small'
									color='primary'
									onClick={(evt) => this.handleSubmit(evt, cart.id)}
								>
									Update Cart
								</Button>

								<DeleteIcon
									fontSize='small'
									onClick={() => this.handleDelete()}
								/>
							</React.Fragment>
						) : (
							<Button
								size='small'
								color='primary'
								onClick={(evt) => this.handleSubmit(evt, cart.id)}
							>
								Add to Cart!
							</Button>
						)}
					</CardActions>
				</Card>
			</Grid>
		)
	}
}

const mapState = (state) => {
	return {
		cart: state.cart,
		user: state.auth,
	}
}

const mapDispatch = (dispatch) => {
	return {
		addToCart: (newProductInOrder, cartId, product) =>
			dispatch(addCartItemThunk(newProductInOrder, cartId, product)),
		updateCart: (update, orderId) => dispatch(updateCartThunk(update, orderId)),
		loadCart: (userId, orderId) => dispatch(fetchCart(userId, orderId)),
		updateProductInCart: (update, productInOrderId) =>
			dispatch(updateCartItemThunk(update, productInOrderId)),
		deleteCartItem: (productInOrderId) =>
			dispatch(deleteCartItemThunk(productInOrderId)),
	}
}

export default connect(
	mapState,
	mapDispatch
)(withStyles(useStyles)(ProductListItem))
