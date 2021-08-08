import React from 'react'
import { connect } from 'react-redux'
import { Link as ReactLink } from 'react-router-dom'
import { authenticate, clearAuth } from '../store'
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
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import { makeStyles } from '@material-ui/core/styles'
import { NameEmailForm } from './NameEmailForm'
import { AddressForm } from './AddressForm'
import { PasswordForm } from './PasswordForm'

//build in form validation/error handling if input is not allowed, passwords don't match, etc.
//build onSubmit function - redirect user to login page after successful account creation?
//connect component to needed areas of store

export class SignUp extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			confirmPassword: '',
			streetAddress: '',
			city: '',
			zipCode: '',
			state: '',
			errors: [],
		}
		this.validateFormData = this.validateFormData.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.handleSelect = this.handleSelect.bind(this)
	}
	handleChange(evt) {
		this.setState({
			[evt.target.name]: evt.target.value,
		})
	}
	handleSelect(evt) {
		this.setState({
			state: evt.target.value,
		})
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
	async validateFormData(userInfo) {
		// console.log('validateFormData called')
		let errors = []

		if (userInfo.password !== this.state.confirmPassword) {
			errors.push('Passwords do not match.')
		}

		let requiredInfo = [
			userInfo.firstName,
			userInfo.lastName,
			userInfo.password,
			this.state.confirmPassword,
		]
		if (requiredInfo.includes('')) {
			errors.push('Please fill out all required fields.')
		}

		//if array of address values includes undefined/"" and not every item in the array is undefined/''
		let addressInfo = [
			userInfo.streetAddress,
			userInfo.city,
			userInfo.zipCode,
			userInfo.state,
		]
		if (addressInfo.includes('')) {
			for (let i = 0; i < addressInfo.length; i++) {
				if (addressInfo[i] !== '') {
					errors.push('Please provide all address information.')
					break
				}
			}
		}

		let regexZipCode = /^[0-9]{5}(?:-[0-9]{4})?$/
		if (userInfo.zipCode !== '' && !regexZipCode.test(userInfo.zipCode)) {
			errors.push('Please provide a valid zip code.')
		}

		await this.setState({
			errors: errors,
		})
	}
	async handleSubmit(evt) {
		evt.preventDefault()
		// console.log('handleSubmit called')
		const email = evt.target.email.value
		const password = evt.target.password.value
		const firstName = evt.target.firstName.value
		const lastName = evt.target.lastName.value
		const streetAddress = evt.target.streetAddress.value
		const city = evt.target.city.value
		const zipCode = evt.target.zipCode.value
		const state = evt.target.state.value
		const userInfo = {
			email,
			password,
			firstName,
			lastName,
			streetAddress,
			city,
			state,
			zipCode,
		}
		await this.validateFormData(userInfo)
		if (!this.state.errors.length) {
			this.props.authenticate(userInfo, 'signup')
		}
	}
	componentWillUnmount() {
		if (this.props.error) {
			this.props.clearAuth()
		}
	}
	render() {
		const classes = this.useStyles()
		const { error } = this.props
		const {
			firstName,
			lastName,
			email,
			password,
			confirmPassword,
			streetAddress,
			city,
			zipCode,
			state,
		} = this.state

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
							<PersonAddIcon />
						</Avatar>
						<Typography component='h1' variant='h5'>
							Make an Account
						</Typography>
					</Grid>
					<form
						className={classes.form}
						noValidate
						name='signUp'
						onSubmit={this.handleSubmit}
					>
						{/* if there are errors, map the errors and display them here */}
						<Grid container spacing={2} style={{ padding: 10 }}>
							<Typography component='h4' color='error'>
								{error ? error.response.data : ''}
							</Typography>
							{this.state.errors.length
								? this.state.errors.map((error, index) => (
										<Typography key={index} color='error' component='h4'>
											{error}
										</Typography>
								  ))
								: ''}
						</Grid>
						<Grid container spacing={2} style={{ padding: 10 }}>
							<NameEmailForm
								firstName={firstName}
								lastName={lastName}
								handleChange={this.handleChange}
								required
							/>
							<PasswordForm
								password={password}
								confirmPassword={confirmPassword}
								handleChange={this.handleChange}
								required
							/>
							<Typography component='h4'>Address</Typography>
							<AddressForm
								streetAddress={streetAddress}
								handleChange={this.handleChange}
								city={city}
								zipCode={zipCode}
								state={state}
								handleSelect={this.handleSelect}
							/>
						</Grid>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							color='primary'
							className={classes.submit}
						>
							Sign Up
						</Button>
						<Grid container justifyContent='flex-end' style={{ padding: 10 }}>
							<Grid item>
								<ReactLink to='/login'>
									<Link variant='body2'>Already have an account? Sign in</Link>
								</ReactLink>
							</Grid>
						</Grid>
					</form>
				</div>
			</Container>
		)
	}
}

const mapState = (state) => {
	return {
		error: state.auth.error,
	}
}

const mapDispatch = (dispatch) => {
	return {
		authenticate: (userInfo, method) =>
			dispatch(authenticate(userInfo, method)),
		clearAuth: () => dispatch(clearAuth()),
	}
}

export default connect(mapState, mapDispatch)(SignUp)
