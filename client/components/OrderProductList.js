import React, { Component } from 'react'
import { connect } from 'react-redux'
import OrderProductListItem from './OrderProductListItem'
// import { fetchOrder } from '../store/orders'
import { fetchSingleOrder } from '../store/singleOrder'
//Imported UI elements:
import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import useStyles from '../../public/useStyles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'


const OrderProductList = (props) => {
    const { classes, order } = props
    return (
        <Grid container spacing={2}>
            {Object.keys(order).length ? (
                order.productInOrders.map(product =>
                    < OrderProductListItem
                        key={product.productId} quantity={product.quantity}
                        product={product.product}
                    />
                )
            ) : (
                <Card className={classes.card}>
                    <CardContent>
                        No items in order!
                    </CardContent>
                </Card>
            )}
        </Grid>
    );
}

export default withStyles(useStyles)(OrderProductList)