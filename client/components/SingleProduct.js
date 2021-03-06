import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchSingleProduct } from '../store/singleProduct'
import Reviews from './Reviews'

//Matieral-UI elements:
import useStyles from '../../public/useStyles'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CardHeader from '@material-ui/core/CardHeader'
import FavoriteIcon from '@material-ui/icons/Favorite'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import { StyledRating } from '../../public/useStyles'
import DeleteIcon from '@material-ui/icons/Delete'
import {
	updateCartThunk,
	deleteCartItemThunk,
	addCartItemThunk,
	updateCartItemThunk,
} from '../store/cart'
import { formatter } from './Cart'
class SingleProduct extends Component {
	constructor() {
		super()
		this.state = {
			loading: true,
			seeReviews: false,
			quantity: 1,
			productInCartId: null,
		}
		this.handleReviewsClick = this.handleReviewsClick.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	async componentDidMount() {
		try {
			await this.props.loadSingleProduct(this.props.match.params.productId)
			this.setState({ loading: false })
			if (this.props.cart.productInOrders) {
				const product = await this.props.cart.productInOrders.find(
					(prodInOrder) => {
						return prodInOrder.product.id === this.props.singleProduct.id
					}
				)
				if (product) {
					this.setState({
						quantity: product.quantity,
						productInCartId: product.id,
					})
				}
			}
		} catch (err) {
			console.error(err)
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
	}
	async handleDelete() {
		await this.props.deleteCartItem(this.state.productInCartId)
		this.setState({
			quantity: 1,
			productInCartId: null,
		})
		this.updateTotal(this.props.cart.id)
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
				{
					quantity: this.state.quantity,
					productId: this.props.singleProduct.id,
				},
				cartId,
				this.props.singleProduct
			)
			this.setState({ productInCartId: this.props.singleProduct.id })
			this.updateTotal(this.props.cart.id || null)
		}
	}
	handleReviewsClick() {
		this.setState({
			seeReviews: !this.state.seeReviews,
		})
		console.log(this.state.seeReviews)
	}

	render() {
		const { classes } = this.props
		const product = this.props.singleProduct

		if (this.state.loading) return <p> Loading...</p>
		if (!product.id) return <p> Rock Not Found! </p>
		return (
			<Container className={classes.cardGrid} maxWidth='sm'>
				<Card>
					<CardHeader
						title={`Hi, my name is ${product.name}!`}
						style={{ textAlign: 'center' }}
					/>
					<CardMedia
						className={classes.cardMedia}
						image={product.imageUrl}
						title='Image title'
					/>
					<CardContent className={classes.cardContent}>
						<Typography
							variant='h5'
							align='center'
							color='textSecondary'
							paragraph
						>
							{product.description}
							<hr />
							{formatter.format(product.price / 100)}
						</Typography>
						<Box
							component='fieldset'
							mb={3}
							borderColor='transparent'
							align='center'
						>
							<Typography component='legend'>Avg Support Rating</Typography>
							<StyledRating
								name='customized-color'
								defaultValue={0}
								value={
									product.reviews.reduce((acc, curr) => {
										return acc + curr.rating
									}, 0) / product.reviews.length
								}
								readOnly
								icon={<FavoriteIcon fontSize='inherit' />}
							/>
						</Box>
						<Typography align='center' color='textSecondary' paragraph>
							Would you like to take me home?
						</Typography>
					</CardContent>
					<CardActions>
						<select value={this.state.quantity} onChange={this.handleChange}>
							{[1, 2, 3, 4, 5].map((val) => (
								<option value={val}>{val}</option>
							))}
						</select>
						{this.state.productInCartId ? (
							<React.Fragment>
								<Button
									size='small'
									color='primary'
									onClick={(evt) => this.handleSubmit(evt, this.props.cart.id)}
								>
									Update Cart
								</Button>

								<DeleteIcon
									fontSize='small'
									onClick={() => this.handleDelete()}
								/>
							</React.Fragment>
						) :
							product.stockQuantity > 0 ?
								(<Button
									variant='contained'
									color='primary'
									onClick={(evt) => this.handleSubmit(evt, this.props.cart.id)}>
									Take Me Home!
								</Button>)
								:
								(<Button variant="contained" color="red">
									Out Of Stock!
								</Button>)
						}
						<Button
							variant='outlined'
							color='primary'
							onClick={() => this.handleReviewsClick()}
						>
							See Reviews
						</Button>
					</CardActions>
				</Card>
				{this.state.seeReviews && <Reviews reviews={product.reviews} />}
			</Container>
		)
	}
}

const mapState = (state) => {
	return {
		singleProduct: state.singleProduct,
		cart: state.cart,
		user: state.auth,
	}
}

const mapDispatch = (dispatch) => {
	return {
		loadSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
		updateCart: (update, orderId) => dispatch(updateCartThunk(update, orderId)),
		deleteCartItem: (productInOrderId) =>
			dispatch(deleteCartItemThunk(productInOrderId)),
		addToCart: (newProductInOrder, cartId, product) =>
			dispatch(addCartItemThunk(newProductInOrder, cartId, product)),
		updateProductInCart: (update, productInOrderId) =>
			dispatch(updateCartItemThunk(update, productInOrderId)),
	}
}

export default connect(
	mapState,
	mapDispatch
)(withStyles(useStyles)(SingleProduct))
