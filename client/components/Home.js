import React from 'react'
import { connect } from 'react-redux'
import useStyles from '../../public/useStyles'
import { Link } from 'react-router-dom'

//Imported UI elements:
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

/**
 * COMPONENT
 */
export const UserHome = props => {
  console.log(props)
  const { classes, user, isLoggedIn } = props

  return (
    <div className={classes.heroContent}>
      <Container maxWidth="sm">
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          <h3>Welcome, {user.firstName}!</h3>
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          Maybe a little intro text?
        </Typography>
        <div className={classes.heroButtons}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Link to='/cart'>
                <Button variant="contained" color="primary">
                  Pick up where you left off!
                </Button>
              </Link>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary">
                Previous Orders!
              </Button>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.auth,
  }
}

export default withStyles(useStyles)(connect(mapState)(UserHome))
