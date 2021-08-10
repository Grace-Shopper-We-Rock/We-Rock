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
import { addCartItemThunk, fetchCart, deleteCartItemThunk, updateCartThunk } from '../store/cart'



class ProductInCartListItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
        }
    }

    async updateTotal() {
        let newTotal = this.props.cart.productInOrders.reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0)
        await this.props.updateCart({ totalAmount: newTotal }, this.props.cart.id)
        this.props.loadCart(undefined, 3)
    }

    render() {
        const { classes, product, quantity } = this.props

        return (
            <Grid item key={product.id} md={8}>
                <Card className={classes.card}>
                    <CardMedia
                        className={classes.cardMedia}
                        image="/images/defaultPetRock.jpg"
                        title="Image title"
                    />
                    <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                            {product.name}
                        </Typography>
                        <Typography>
                            {product.price / 100}$
                            <br />
                            {(product.price * quantity) / 100}$
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button
                            size="small" color="primary"
                            onClick={() => this.updateTotal()}>
                            Update quantity
                        </Button>
                        <Button size="small" color="primary">
                            Remove
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        )
    }
}

const mapState = (state) => {
    return {
        cart: state.cart,
        products: state.products,
    }
}

const mapDispatch = (dispatch) => {
    return {
        addToCart: (newProductInOrder) => dispatch(addCartItemThunk(newProductInOrder)),
        updateCart: (update, orderId) => dispatch(updateCartThunk(update, orderId)),
        loadCart: (userId, orderId) => dispatch(fetchCart(userId, orderId))
    }
}

export default connect(mapState, mapDispatch)(withStyles(useStyles)(ProductInCartListItem))