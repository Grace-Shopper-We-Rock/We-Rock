import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import useStyles from '../../public/useStyles'
import { fetchSingleProduct } from '../store/singleProduct'

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
    }

    componentDidMount() {
        try {
            this.props.loadSingleProduct(this.props.match.params.productId)
            this.setState({ loading: false })
        } catch (err) {
            console.error(err)
        }
    }

    render() {
        const { classes } = this.props
        const product = this.props.singleProduct
        if (this.state.loading) return <p> Loading...</p>
        if (!product.id) return <p> {JSON.stringify(product)} </p>
        else return (
            <div className={classes.heroContent} >
                <Container maxWidth="sm">
                    <img src={'/images/defaultPetRock.jpg'} />
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                        Hi, my name is {product.name}!
                    </Typography>
                    <Typography variant="h5" align="center" color="textSecondary" paragraph>
                        {product.description}
                    </Typography>
                    <Typography align="center" color="textSecondary" paragraph>
                        Would you like to take me home?
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
    }
}

const mapState = (state) => {
    return {
        singleProduct: state.singleProduct
    }
}

const mapDispatch = (dispatch) => {
    return {
        loadSingleProduct: (id) => dispatch(fetchSingleProduct(id))
    }
}

export default connect(mapState, mapDispatch)(withStyles(useStyles)(SingleProduct))