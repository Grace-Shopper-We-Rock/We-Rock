import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchSingleOrder } from '../store/singleOrder'
import OrderProductList from './OrderProductList'

// Matieral-UI elements:
import useStyles from '../../public/useStyles'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

class OrderDetails extends Component {
	constructor() {
		super()
		this.state = {
			loading: true,
		}
	}

	componentDidMount() {
		try {
			this.props.loadSingleOrder(this.props.match.params.orderId)
			this.setState({ loading: false })
		} catch (err) {
			console.error(err)
		}
	}

	render() {
		const { classes } = this.props
		const order = this.props.singleOrder

		if (this.state.loading) return <p> Loading...</p>
		if (!order.id) return <p> Order Not Found! </p>
		let orderStatus = ''
		if (order.status === 'inCart') {
			orderStatus = 'is awaiting payment'
		} else if (order.status === 'inProcess') {
			orderStatus = 'is being processed'
		} else {
			orderStatus = 'has been delivered'
		}
		return (
			<div className={classes.heroContent}>
				<Container maxWidth='sm'>
					<Typography
						component='h1'
						variant='h2'
						align='center'
						color='textPrimary'
						gutterBottom
						className={classes.specialTypography}>
						Order details
					</Typography>
					<Typography
						variant='h6'
						align='center'
						color='textSecondary'
						paragraph
					>
						Your order (#{order.id}) {orderStatus}
					</Typography>
					<Typography
						variant='body1'
						align='center'
						color='textSecondary'
						paragraph
					>
						If you have any questions about your purchase please email us at
						customerservice@yourock.com.
					</Typography>
					{order.status === 'inCart' ? null : (
						<React.Fragment>
							<Typography
								variant='h6'
								align='center'
								color='textSecondary'
								paragraph
							>
								Delivery address:
							</Typography>
							<Typography
								variant='body1'
								align='center'
								color='textSecondary'
								paragraph
							>
								{order.shippingAddress.firstName}{' '}
								{order.shippingAddress.lastName},{' '}
								{order.shippingAddress.streetAddress},{' '}
								{order.shippingAddress.city}, {order.shippingAddress.state}{' '}
								{order.shippingAddress.zipCode}
							</Typography>
						</React.Fragment>
					)}
					<Typography
						variant='h6'
						align='center'
						color='textSecondary'
						paragraph
					>
						Order summary:
					</Typography>
					<main>
						{this.state.loading ? (
							<p> Loading...</p>
						) : (
							<Container>
								<OrderProductList order={order} />
							</Container>
						)}
					</main>
					{this.props.isLoggedIn ? (
						<div className={classes.heroButtons}>
							<Grid container spacing={2} justifyContent='center'>
								<Grid item>
									<Link to={`/orders/user/${order.user.id}`}>
										<Button variant='outlined' color='primary'>
											Return to all orders
										</Button>
									</Link>
								</Grid>
							</Grid>
						</div>
					) : null}
				</Container>
			</div>
		)
	}
}

const mapState = (state) => {
	return {
		singleOrder: state.singleOrder,
		isLoggedIn: !!state.auth.id,
	}
}

const mapDispatch = (dispatch) => {
	return {
		loadSingleOrder: (id) => dispatch(fetchSingleOrder(id)),
	}
}

export default connect(
	mapState,
	mapDispatch
)(withStyles(useStyles)(OrderDetails))
