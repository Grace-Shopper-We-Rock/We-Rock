import React from 'react'

//Imported UI elements:
import useStyles from '../../public/useStyles'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import { StyledRating } from '../../public/useStyles'
import FavoriteIcon from '@material-ui/icons/Favorite'

const Reviews = (props) => {
    const { classes } = props
    const reviews = props.reviews

    return (
        !reviews.length ? (
            <Container>
                <div>
                    No Reviews Yet!
                </div>
            </Container>
        ) : (
            <Container className={classes.cardGrid} maxWidth="sm">
                <Grid container spacing={4}>
                    {reviews.map(review => (
                        <Grid item key={review.id} xs={12} sm={12} md={12}>
                            <Card className={classes.card}>
                                <CardContent className={classes.cardContent}>
                                    {review.text}
                                </CardContent>
                                <CardActions>
                                    <StyledRating
                                        name="customized-color"
                                        defaultValue={0}
                                        value={review.rating} readOnly
                                        icon={<FavoriteIcon fontSize="small" />}
                                    />
                                    by {review.user.firstName} {review.user.lastName[0]}.
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container >

        )
    )
}

export default withStyles(useStyles)(Reviews)
