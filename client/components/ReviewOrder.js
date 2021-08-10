import React from 'react'
import OrderProductList from './OrderProductList'
import Container from '@material-ui/core/Container'

export const ReviewOrder = (props) => {
	console.log(props)
	return (
		<Container>
			<OrderProductList order={props.order} />
		</Container>
	)
}

