import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import useStyles from '../../public/useStyles'

//Imported UI elements:
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

//dummy product data:
const dummyProduct = {
    id: 1,
    name: 'Jimmy',
    description: 'I am the friendliest Rock that ever Rocked',
    size: 'large',
    imageUrl: '/defaultImage.jpg',
    price: 5,
    stockQuantity: 10
}

class SingleProduct extends Component {
    constructor() {
        super()
        this.state = {
            loading: true
        }

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const productId = this.props.match.params.productId
        //This factors for if someone tries to go to a page that doesn't exist:
        // if ((isNaN(Number(productId)))) {
        //     this.props.loadSingleProduct(0)
        //     this.setState({ loading: false })
        // } else {
        //     this.props.loadSingleProduct(productId)
        //     this.setState({ loading: false })
        // }
        // but for now we'll just setloading to false:
        this.setState({ loading: false })
    }

    render() {
        const { classes } = this.props
        const product = this.props.singleProduct
        return (
            this.state.loading ? (<p> Loading...</p >) : (
                !product ? (<p> Product Not Found </p>) : (
                    <div className={classes.heroContent} >
                        <Container maxWidth="sm">
                            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                                Hi, my name is {product.name}!
                            </Typography>
                            <Typography variant="h5" align="center" color="textSecondary" paragraph>
                                {product.description}
                            </Typography>
                            <div className={classes.heroButtons}>
                                <Grid container spacing={2} justifyContent="center">
                                    <Grid item>
                                        <Button variant="contained" color="primary">
                                            Take Me Home!
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button variant="outlined" color="primary">
                                            Remove From Cart
                                        </Button>
                                    </Grid>
                                </Grid>
                            </div>
                        </Container>
                    </div>
                )
            )
        )
    }
}

const mapState = (state) => {
    return {
        singleProduct: dummyProduct,
        // products: state.products
    }
}

const mapDispatch = (dispatch) => {
    return {
        loadSingleProduct: (id) => dispatch(fetchSingleProduct(id))
    }
}

export default connect(mapState, mapDispatch)(withStyles(useStyles)(SingleProduct))