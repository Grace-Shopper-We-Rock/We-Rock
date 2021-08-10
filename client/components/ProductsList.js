import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProductListItem from './ProductListItem'
import Welcome from './Welcome'
import { fetchProducts } from '../store/products'
import { setSingleProduct } from '../store/singleProduct'
//Imported UI elements:
import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import useStyles from '../../public/useStyles'
import { fetchCart } from '../store/cart'

class ProductsList extends Component {
    constructor() {
        super()
        this.state = {
            loading: true,
        }
    }

    async componentDidMount() {
        this.props.getProducts()
        this.props.clearProduct()
        await this.props.loadCart(undefined, 3)
        this.setState({ loading: false })
    }

    render() {
        const { classes, products } = this.props
        return (
            <main>
                {this.state.loading ? (<p> Loading...</p >) : (
                    <Container className={classes.cardGrid} maxWidth="md">
                        <Grid container spacing={4}>
                            {products.map((product) => (
                                <ProductListItem key={product.id} product={product} />
                            ))}
                        </Grid>
                    </Container>
                )}
            </main >
        );
    }
}

const mapState = (state) => {
    return {
        products: state.products
    }
}

const mapDispatch = (dispatch) => {
    return {
        clearProduct: () => dispatch(setSingleProduct({})),
        getProducts: () => dispatch(fetchProducts()),
        loadCart: (userId, orderId) => dispatch(fetchCart(userId, orderId))
    }
}


export default connect(mapState, mapDispatch)(withStyles(useStyles)(ProductsList))