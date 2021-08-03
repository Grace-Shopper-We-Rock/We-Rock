import React from 'react'
import useStyles from '../../public/useStyles'

//Imported UI elements:
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'


const ProductListItem = (props) => {
    const { product, classes } = props
    return (
        <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                />
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {product.name}
                    </Typography>
                    <Typography>
                        {product.price}$
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary">
                        View
                    </Button>
                    <Button size="small" color="primary">
                        Add to Cart
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default withStyles(useStyles)(ProductListItem)