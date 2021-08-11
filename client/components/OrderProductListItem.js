import React from 'react'
import useStyles from '../../public/useStyles'
import { Link } from 'react-router-dom'

//Imported UI elements:
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'


const OrderProductListItem = (props) => {
    const { product, key, quantity, classes } = props
    return (
        <Card className={classes.card} key={key}>
            <CardMedia
                className={classes.cardMedia}
                image={product.imageUrl}
                title={product.name}
            />
            <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                    {product.name}
                </Typography>
                <Typography>
                    ${product.price / 100}
                </Typography>
                <Typography>
                    Quantity: {quantity}
                </Typography>
            </CardContent>
            <CardActions>
                <Link to={`/products/${product.id}`}>
                    <Button size="small" color="primary">
                        More information
                    </Button>
                </Link>
            </CardActions>
        </Card>
    )
}

export default withStyles(useStyles)(OrderProductListItem)