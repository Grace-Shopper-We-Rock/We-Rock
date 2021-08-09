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
export const UserHome = (props) => {
	const { classes, user, isLoggedIn } = props

	return (
		<div className={classes.heroContent}>
			<Container maxWidth='md'>
				<Typography
					component='h1'
					variant='h2'
					align='center'
					color='textPrimary'
					gutterBottom
				>
					Welcome, {user.firstName}!
				</Typography>
				<Typography variant='h5' align='center' color='textSecondary' paragraph>
					Maybe a little intro text?
				</Typography>
				<div className={classes.heroButtons}>
					<Grid
						container
						spacing={3}
						justifyContent='center'
						alignItems='center'
					>
						<Grid item sm={5}>
							<Link to='/cart'>
								<Button variant='contained' color='primary'>
									Pick up where you left off!
								</Button>
							</Link>
						</Grid>
						<Grid item sm={4}>
							<Button variant='contained' color='primary'>
								Previous Orders!
							</Button>
						</Grid>
						<Grid item sm={3}>
							<Link to='/editProfile'>
								<Button variant='contained' color='primary'>
									Edit Profile
								</Button>
							</Link>
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
const mapState = (state) => {
	return {
		user: state.auth,
	}
}

export default withStyles(useStyles)(connect(mapState)(UserHome))
