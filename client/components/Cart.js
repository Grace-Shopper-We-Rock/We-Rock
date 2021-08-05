import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchProducts } from '../store/products'


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
import ProductInCart from './ProductInCart'

class Cart extends Component {
    constructor() {
        super()
        this.state = {
            loading: true,
            productsInOrder: [{ productId: 1, quantity: 1 }, { productId: 2, quantity: 3 }],
            totalAmount: 0,
            status: 'cart',
            addressId: null,
        }
    }

    componentDidMount() {
        this.props.getProducts()
        this.setState({ loading: false })
    }

    render() {
        const { classes, products } = this.props

        if (this.state.loading) return <p> Loading...</p>
        else return (
            this.props.products.length && //For now I have this bc it was trying to map before products loaded??
            <Container className={classes.cardGrid} maxWidth="sm">
                {this.state.productsInOrder.map(product =>
                    <ProductInCart
                        key={product.productId} quantity={product.quantity}
                        product={products.find(prod => prod.id === product.productId)}
                    />
                )}
                <Card className={classes.card}>
                    <CardHeader
                        title={`Order Summary`}
                        style={{ textAlign: 'center' }}
                    />
                    <CardContent className={classes.cardContent}>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            total price $
                        </Typography>
                        <Typography align="center" color="textSecondary" paragraph>
                            Ready to meet your new friends?
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" color="primary">
                            CheckOut
                        </Button>
                    </CardActions>
                </Card>
            </Container>
        )
    }
}

const mapState = (state) => {
    return {
        cart: state.cart,
        products: state.products
    }
}

const mapDispatch = (dispatch) => {
    return {
        getProducts: () => dispatch(fetchProducts()),
        // loadCart: (userId) => dispatch(fetchCart(userId))
    }
}

export default connect(mapState, mapDispatch)(withStyles(useStyles)(Cart))