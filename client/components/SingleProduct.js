import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchSingleProduct } from '../store/singleProduct'
import Reviews from './Reviews'

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
import { StyledRating } from '../../public/useStyles'
class SingleProduct extends Component {
    constructor() {
        super()
        this.state = {
            loading: true,
            seeReviews: false,
        }
        this.handleReviewsClick = this.handleReviewsClick.bind(this)
    }

    componentDidMount() {
        try {
            this.props.loadSingleProduct(this.props.match.params.productId)
            this.setState({ loading: false })
        } catch (err) {
            console.error(err)
        }
    }

    handleReviewsClick() {
        this.setState({
            seeReviews: !this.state.seeReviews,
        })
        console.log(this.state.seeReviews)
    }


    render() {
        const { classes } = this.props
        const product = this.props.singleProduct

        if (this.state.loading) return <p> Loading...</p>
        if (!product.id) return <p> Rock Not Found! </p>
        return (
            <Container className={classes.cardGrid} maxWidth="sm">
                <Card>
                    <CardHeader
                        title={`Hi, my name is ${product.name}!`}
                        style={{ textAlign: 'center' }}
                    />
                    <CardMedia
                        className={classes.cardMedia}
                        image="/images/defaultPetRock.jpg"
                        title="Image title"
                    />
                    <CardContent className={classes.cardContent}>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            {product.description}
                            <hr />
                            {product.price / 100}$
                        </Typography>
                        <Box component="fieldset" mb={3} borderColor="transparent" align="center">
                            <Typography component="legend">Avg Support Rating</Typography>
                            <StyledRating
                                name="customized-color"
                                defaultValue={0}
                                value={product.reviews.reduce((acc, curr) => { return acc + curr.rating }, 0) / (product.reviews.length)} readOnly
                                icon={<FavoriteIcon fontSize="inherit" />}
                            />
                        </Box>
                        <Typography align="center" color="textSecondary" paragraph>
                            Would you like to take me home?
                        </Typography>

                    </CardContent>
                    <CardActions>
                        <Button variant="contained" color="primary">
                            Take Me Home!
                        </Button>
                        <Button variant="outlined" color="primary">
                            Remove From Cart
                        </Button>
                        <Button variant="outlined" color="primary"
                            onClick={() => this.handleReviewsClick()}>
                            See Reviews
                        </Button>
                    </CardActions>
                </Card>
                {this.state.seeReviews && <Reviews reviews={product.reviews} />}
            </Container>
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