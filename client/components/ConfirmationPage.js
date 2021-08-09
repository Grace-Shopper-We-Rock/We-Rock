import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchSingleOrder } from '../store/singleOrder'

//Matieral-UI elements:
import useStyles from '../../public/useStyles'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CardHeader from '@material-ui/core/CardHeader'
import FavoriteIcon from '@material-ui/icons/Favorite'
import Box from '@material-ui/core/Box'
import Rating from '@material-ui/lab/Rating'
import Grid from '@material-ui/core/Grid'

class ConfirmationPage extends Component {
    constructor() {
        super()
        this.state = {
            loading: true,
        }
    }

    componentDidMount() {
        try {
            this.props.loadSingleOrder(this.props.match.params.orderId)
            this.setState({ loading: false })
            console.log(this.props)
        } catch (err) {
            console.error(err)
        }
    }

    render() {
        const { classes } = this.props
        const order = this.props.singleOrder
        const shippingAddress = order.shippingAddress

        // const productsInOrder = order.productInOrders

        if (this.state.loading) return <p> Loading...</p>
        if (!order.id) return <p> Order Not Found! </p>
        return (
            <div className={classes.heroContent}>
                <Container maxWidth="sm">
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                        Thank you, your order has been confirmed!
                    </Typography>
                    <Typography variant="h5" align="center" color="textSecondary" paragraph>
                        Your order number is {order.id}
                    </Typography>
                    <Typography variant="h5" align="center" color="textSecondary" paragraph>
                        Delivery address: {shippingAddress.firstName} {shippingAddress.lastName}, {shippingAddress.streetAddress}, {shippingAddress.city}, {shippingAddress.state}, {shippingAddress.zipCode}
                    </Typography>
                    <Typography variant="h5" align="center" color="textSecondary" paragraph>
                        An email will be sent containing information about your purchase. If you have any questions about your purchase please email us at customerservice@yourock.com.
                    </Typography>
                    {/* <main>
                        {this.state.loading ? (<p> Loading...</p >) : (
                            <Container className={classes.cardGrid} maxWidth="md">
                                <Grid container spacing={4}>
                                    {productsInOrder.map((product) => (
                                        <ProductListItem key={product.id} product={product} />
                                    ))}
                                </Grid>
                            </Container>
                        )}
                    </main > */}
                    <div className={classes.heroButtons}>
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item>
                                <Button variant="outlined" color="primary">
                                    View more pet rocks!
                                </Button>
                                <Button variant="outlined" color="primary">
                                    Check my order status
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
        singleOrder: state.singleOrder
    }
}

const mapDispatch = (dispatch) => {
    return {
        loadSingleOrder: (id) => dispatch(fetchSingleOrder(id))
    }
}

export default connect(mapState, mapDispatch)(withStyles(useStyles)(ConfirmationPage))