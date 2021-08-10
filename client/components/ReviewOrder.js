import React from 'react'
import OrderProductList from './OrderProductList'

export const ReviewOrder = (props) => {
	console.log(props)
	return (
		<Container>
			<OrderProductList order={props.order} />
		</Container>
	)
}

