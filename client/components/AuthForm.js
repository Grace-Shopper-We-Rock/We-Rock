import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { authenticate, clearAuth } from '../store'
import { Link as ReactLink } from 'react-router-dom'
import {
	Button,
	Container,
	CssBaseline,
	TextField,
	Link,
	Grid,
	Typography,
	Avatar,
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { makeStyles } from '@material-ui/core/styles'

/**
 * COMPONENT
 */

//set-up error handling and rendering of same
//set-up/test store connection and relation to back-end request
//does the user token get stored?

class AuthForm extends React.Component {
	constructor(props) {
		super(props)
	}
	useStyles() {
		return makeStyles((theme) => ({
			paper: {
				marginTop: theme.spacing(8),
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
			},
			avatar: {
				margin: theme.spacing(1),
				backgroundColor: theme.palette.secondary.main,
			},
			form: {
				width: '100%',
				marginTop: theme.spacing(3),
			},
			submit: {
				margin: theme.spacing(3, 0, 2),
			},
		}))
	}
	async componentWillUnmount() {
		// console.log('this.props.error: ', this.props.error)
		// console.log('this.props.auth.id: ', this.props.auth.id)
		console.log('clear auth running now')
		if (this.props.error) {
			await this.props.clearAuth()
		}
	}
	render() {
		const { handleSubmit, error } = this.props
		const classes = this.useStyles()

		return (
			<Container component='main' maxWidth='xs' style={{ padding: 20 }}>
				<CssBaseline />
				<div className={classes.paper}>
					<Grid
						container
						direction='column'
						justifyContent='center'
						alignItems='center'
						style={{ padding: 20 }}
					>
						<Avatar className={classes.Avatar}>
							<LockOutlinedIcon />
						</Avatar>
						<Typography component='h1' variant='h5'>
							Log In to Your Account
						</Typography>
					</Grid>
					<form
						className={classes.form}
						noValidate
						autoComplete='off'
						name='logIn'
						onSubmit={handleSubmit}
					>
						<Typography component='h4' style={{ padding: 10 }} color='error'>
							{error ? error.response.data : ''}
						</Typography>
						<Grid container spacing={2} style={{ padding: 10 }}>
							<Grid item xs={12}>
								<TextField
									required
									name='email'
									variant='outlined'
									fullWidth
									id='email'
									label='Email Address / Username'
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									name='password'
									variant='outlined'
									fullWidth
									id='password'
									type='password'
									label='Password'
								/>
							</Grid>
						</Grid>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							color='primary'
							className={classes.submit}
						>
							Log In
						</Button>
						<Grid container justifyContent='flex-end' style={{ padding: 10 }}>
							<Grid item>
								<ReactLink to='/signup'>
									<Link variant='body2'>Don't have an account? Sign up</Link>
								</ReactLink>
							</Grid>
						</Grid>
					</form>
				</div>
			</Container>
		)
	}
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
	return {
		error: state.auth.error,
		auth: state.auth,
	}
}

const mapDispatch = (dispatch) => {
	return {
		async handleSubmit(evt) {
			evt.preventDefault()
			const email = evt.target.email.value
			const password = evt.target.password.value
			console.log('authenticate running now')
			await dispatch(authenticate({ email, password }, 'login'))
		},
		clearAuth: () => dispatch(clearAuth()),
	}
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
//export const Signup = connect(mapSignup, mapDispatch)(AuthForm)
