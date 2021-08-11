import React from 'react'
import OrderProductList from './OrderProductList'
import Container from '@material-ui/core/Container'

export const ReviewOrder = (props) => {
	console.log('ORDER ID: ', props.orderId)
	return (
		<Container>
			<OrderProductList orderId={props.orderId} />
		</Container>
	)
}
