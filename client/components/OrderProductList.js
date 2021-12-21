import React from 'react'
import OrderProductListItem from './OrderProductListItem'

//Imported UI elements:
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import useStyles from '../../public/useStyles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

const OrderProductList = (props) => {
	const { classes, order } = props
	return (
		<Grid container spacing={2}>
			{Object.keys(order).length ? (
				order.productInOrders.map((product) => (
					<OrderProductListItem
						key={product.productId}
						quantity={product.quantity}
						product={product.product}
					/>
				))
			) : (
				<Card className={classes.card}>
					<CardContent>No items in order!</CardContent>
				</Card>
			)}
		</Grid>
	)
}

export default withStyles(useStyles)(OrderProductList)
