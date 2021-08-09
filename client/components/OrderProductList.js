import React, { Component } from 'react'
import { connect } from 'react-redux'
import OrderProductListItem from './OrderProductListItem'
import { fetchProducts } from '../store/products'
import { setSingleProduct } from '../store/singleProduct'
//Imported UI elements:
import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import useStyles from '../../public/useStyles'

class OrderProductList extends Component {
    constructor() {
        super()
        this.state = {
            loading: true,
        }
    }

    componentDidMount() {
        this.props.getProducts()
        this.props.clearProduct()
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
                                <OrderProductListItem key={product.id} product={product} />
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
    }
}


export default connect(mapState, mapDispatch)(withStyles(useStyles)(OrderProductList))