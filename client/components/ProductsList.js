import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProductListItem from './ProductListItem'
import Welcome from './Welcome'

//Imported UI elements:
import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import useStyles from '../../public/useStyles'

//dummy product data: (delete when we get the seed running)
const products = [
    {
        id: 1,
        name: 'Jimmy',
        description: 'I am the friendliest Rock that ever Rocked',
        size: 'large',
        imageUrl: '/defaultImage.jpg',
        price: 5,
        stockQuantity: 10
    },
    {
        id: 2,
        name: 'Henry',
        description: 'I am the friendliest Rock that ever Rocked',
        size: 'large',
        imageUrl: '/defaultImage.jpg',
        price: 30,
        stockQuantity: 10
    },
    {
        id: 3,
        name: 'Phillis',
        description: 'I am the friendliest Rock that ever Rocked',
        size: 'large',
        imageUrl: '/defaultImage.jpg',
        price: 10,
        stockQuantity: 10
    },
    {
        id: 4,
        name: 'Felicia',
        description: 'I am the friendliest Rock that ever Rocked',
        size: 'large',
        imageUrl: '/defaultImage.jpg',
        price: 5,
        stockQuantity: 10
    },
    {
        id: 5,
        name: 'Pikachu',
        description: 'I am the friendliest Rock that ever Rocked',
        size: 'large',
        imageUrl: '/defaultImage.jpg',
        price: 30,
        stockQuantity: 10
    },
    {
        id: 6,
        name: 'Loki',
        description: 'I am the friendliest Rock that ever Rocked',
        size: 'large',
        imageUrl: '/defaultImage.jpg',
        price: 10,
        stockQuantity: 10
    }
]

class ProductsList extends Component {
    constructor() {
        super()
        this.state = {
            loading: true,
        }
    }

    componentDidMount() {
        //these will happen when we link up to the redux store::
        // this.props.getProducts()
        // this.props.clearProject()
        this.setState({ loading: false })
    }

    render() {
        const { classes } = this.props
        return (
            <main>
                <Welcome />

                {this.state.loading ? (<p> Loading...</p >) : (
                    <Container className={classes.cardGrid} maxWidth="md">
                        {/* End Intro */}
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
        projects: state.products
    }
}

const mapDispatch = (dispatch) => {
    return {
        clearProducts: () => dispatch(setSingleProduct({})),
        getProjects: () => dispatch(fetchProducts()),
    }
}


export default connect(mapState, mapDispatch)(withStyles(useStyles)(ProductsList))