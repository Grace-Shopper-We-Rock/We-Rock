import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchProducts } from '../store/products'


//Matieral-UI elements:
import useStyles from '../../public/useStyles'
import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import ProductInCartListItem from './ProductInCartListItem'

class CartItems extends Component {
    constructor() {
        super()
        this.state = {
            loading: true,
            productsInOrder: [{ productId: 1, quantity: 1 }, { productId: 2, quantity: 3 }],
        }
    }

    componentDidMount() {
        this.props.getProducts()
        this.setState({ loading: false })
    }

    render() {
        const { classes, products } = this.props

        // o: is this an either or situation
        if (this.state.loading) return <p> Loading...</p>
        return (
            this.props.products.length ? (
                this.state.productsInOrder.map(product =>
                    <ProductInCartListItem
                        key={product.productId} quantity={product.quantity}
                        product={products.find(prod => prod.id === product.productId)}
                    />
                )
            ) : (
                <Card className={classes.card}>
                    <CardContent>
                        No Items In Cart!
                    </CardContent>
                </Card>
            )
        )
    }
}

const mapState = (state) => {
    return {
        products: state.products
    }
}

const mapDispatch = (dispatch) => {
    return {
        getProducts: () => dispatch(fetchProducts()),
    }
}

export default connect(mapState, mapDispatch)(withStyles(useStyles)(CartItems))