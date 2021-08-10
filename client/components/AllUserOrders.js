import React, { Component } from 'react'
import { fetchUserOrders } from '../store/orders'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

// Matieral-UI elements:
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

class AllUserOrders extends Component {
    constructor() {
        super()
        this.state = {
            loading: true,
        }
    }

    componentDidMount() {
        try {
            this.props.loadUserOrders(this.props.match.params.userId)
            this.setState({ loading: false })
        } catch (err) {
            console.error(err)
        }
    }

    render() {
        const { classes } = this.props
        const orders = this.props.userOrders

        if (this.state.loading) return <p> Loading...</p>
        if (!orders) return <p> Order Not Found! </p>
        return (
            <div className={classes.heroContent}>
                <Container maxWidth="sm">
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                        Your orders:
                    </Typography>
                    <main>
                        {this.state.loading ? (<p> Loading...</p >) : (
                            <Container>
                                <Grid container spacing={2}>
                                    {orders ? (
                                        orders.map(order =>
                                            <Card className={classes.card} key={order.id}>
                                                <CardContent className={classes.cardContent}>
                                                    <Typography gutterBottom variant="h5" component="h2">
                                                        Order #{order.id}
                                                    </Typography>
                                                    <Typography>
                                                        {order.productInOrders.length} types of rocks inside!
                                                    </Typography>
                                                    <Typography>
                                                        Total: ${order.totalAmount / 100}
                                                    </Typography>
                                                </CardContent>
                                                <CardActions>
                                                    <Link to={`/orders/${order.id}`}>
                                                        <Button size="small" color="primary">
                                                            More information
                                                        </Button>
                                                    </Link>
                                                </CardActions>
                                            </Card>

                                        )
                                    ) : (
                                        <Card className={classes.card}>
                                            <CardContent>
                                                No orders found!
                                            </CardContent>
                                        </Card>
                                    )}
                                </Grid>
                            </Container>
                        )}
                    </main >
                    <div className={classes.heroButtons}>
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item>
                                <Link to={`/home`}>
                                    <Button variant="outlined" color="primary">
                                        Return to my profile
                                    </Button>
                                </Link>
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
        userOrders: state.userOrders
    }
}

const mapDispatch = (dispatch) => {
    return {
        loadUserOrders: (userId) => dispatch(fetchUserOrders(userId))
    }
}

export default connect(mapState, mapDispatch)(withStyles(useStyles)(AllUserOrders))