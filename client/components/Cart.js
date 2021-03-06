import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

//Matieral-UI elements:
import useStyles from '../../public/useStyles'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import CartItems from './CartItems'
import { fetchCart, updateCartThunk } from '../store/cart'

export const formatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
});

class Cart extends Component {
	constructor() {
		super()
		this.state = {
			loading: true,
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
	componentDidMount() {
		if (this.props.cart.id) {
			this.updateTotal(this.props.cart.id)
		}
		this.setState({ loading: false })
	}

	render() {
		const { classes, cart } = this.props

		if (this.state.loading) return <p> Loading...</p>
		return (
			<Container className={classes.cartGrid}>
				<Container maxWidth='md'>
					<Grid container justify='center' spacing={2} className={classes.cartList}>
						<CartItems />
					</Grid>
				</Container>

				<Box width={450} maxHeight={300}>
					<Card className={classes.cartCard}>
						<CardHeader
							title={`Order Summary`}
							style={{ textAlign: 'center' }}
						/>
						{cart.totalAmount ? (
							<React.Fragment>
								<CardContent className={classes.cardContent}>
									<Typography
										variant='h5'
										align='center'
										color='textSecondary'
										paragraph
									>
										{formatter.format(cart.totalAmount / 100)}
									</Typography>
									<Typography align='center' color='textSecondary' paragraph>
										Ready to meet your new friends?
									</Typography>
								</CardContent>
								<CardActions>
									<Link to='/checkout'>
										<Button variant='contained' color='primary'>
											CheckOut
										</Button>
									</Link>
								</CardActions>
							</React.Fragment>
						) : (
							<CardContent className={classes.cardContent}>
								<Typography align='center' color='textSecondary' paragraph>
									You have no friends to take home!
								</Typography>

							</CardContent>
						)}
					</Card>
				</Box>
			</Container>
		)
	}
}

const mapState = (state) => {
	return {
		cart: state.cart,
		products: state.products,
		user: state.auth,
	}
}

const mapDispatch = (dispatch) => {
	return {
		// addToCart: (newProductInOrder) => dispatch(addCartItemThunk(newProductInOrder)),
		updateCart: (update, orderId) => dispatch(updateCartThunk(update, orderId)),
		loadCart: (userId, orderId) => dispatch(fetchCart(userId, orderId)),
	}
}

export default connect(mapState, mapDispatch)(withStyles(useStyles)(Cart))
