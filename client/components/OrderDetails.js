import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchSingleOrder } from '../store/singleOrder'
import OrderProductList from './OrderProductList'

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

class OrderDetails extends Component {
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
        } catch (err) {
            console.error(err)
        }
    }

    render() {
        const { classes } = this.props
        const order = this.props.singleOrder

        if (this.state.loading) return <p> Loading...</p>
        // if (!order.id) return <p> Order Not Found! </p>
        return (
            <div className={classes.heroContent}>
                <Container maxWidth="sm">
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                        Order #{order.id}
                    </Typography>
                    <Typography variant="h5" align="center" color="textSecondary" paragraph>
                        Your order is {order.status}
                    </Typography>
                    <Typography variant="h5" align="center" color="textSecondary" paragraph>
                        Delivery address: {order.shippingAddress.streetAddress}, {order.shippingAddress.city}, {order.shippingAddress.state}, {order.shippingAddress.zipCode}
                    </Typography>
                    <Typography variant="h5" align="center" color="textSecondary" paragraph>
                        Order details:
                    </Typography>
                    <main>
                        {this.state.loading ? (<p> Loading...</p >) : (
                            <Container className={classes.cardGrid} maxWidth="md">
                                <Grid container spacing={2} >
                                    <Grid item xs={10} sm={10} md={10}>
                                        <OrderProductList />
                                    </Grid>
                                </Grid>
                            </Container>
                        )}
                    </main >
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