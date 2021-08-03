import React from 'react'
import useStyles from '../../public/useStyles'

//Imported UI elements:
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'


const Welcome = (props) => {
    const { classes } = props
    return (
        <div className={classes.heroContent}>
            <Container maxWidth="sm">
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    YOU ROCK!
                </Typography>
                <Typography variant="h5" align="center" color="textSecondary" paragraph>
                    Emotional support pet rocks for when you need a reminder about how amazing you are! Come meet all of our friends.
                </Typography>
                <div className={classes.heroButtons}>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item>
                            <Button variant="contained" color="primary">
                                Browse Rocks
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" color="primary">
                                Meet a Random Rock
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </div>
    )
}

export default withStyles(useStyles)(Welcome)