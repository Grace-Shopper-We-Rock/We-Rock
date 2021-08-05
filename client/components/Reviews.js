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

const Reviews = (props) => {
    const { classes } = props
    const reviews = props.reviews
    console.log(props)
    return (
        <Container>
            {!reviews.length ? (
                <Grid item xs={12} sm={6} md={4}>
                    <div>
                        No Reviews Yet!
                    </div>
                </Grid>
            ) : (
                reviews.map(review => (
                    <Container className={classes.cardGrid} maxWidth="sm">
                        <Card className={classes.card}>
                            <CardContent className={classes.cardContent}>
                                {review.text}
                            </CardContent>
                            <CardActions>
                                {review.rating}*
                                {review.user.firstName}
                            </CardActions>
                        </Card>
                    </Container>
                ))
            )}
        </Container>
    )
}

export default withStyles(useStyles)(Reviews)
