import React from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import {
	Button,
	Paper,
	Container,
	CssBaseline,
	TextField,
	Grid,
	Typography,
	Snackbar,
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core/styles'
import { NameEmailForm } from './NameEmailForm'
import { AddressForm } from './AddressForm'
import { PasswordForm } from './PasswordForm'
import { fetchUserAddresses, updateUserAddress } from '../store/address'
import { updateUserInfo } from '../store/auth'

export class EditProfile extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			confirmPassword: '',
			addressFirstName: '',
			addressLastName: '',
			streetAddress: '',
			city: '',
			zipCode: '',
			state: '',
			errors: [],
			snackbarOpen: false,
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSelect = this.handleSelect.bind(this)
		this.handleClose = this.handleClose.bind(this)
	}
	useStyles() {
		return makeStyles((theme) => ({
			layout: {
				width: 'auto',
				marginLeft: theme.spacing(2),
				marginRight: theme.spacing(2),
				[theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
					width: 600,
					marginLeft: 'auto',
					marginRight: 'auto',
				},
			},
			paper: {
				marginTop: theme.spacing(3),
				marginBottom: theme.spacing(3),
				padding: theme.spacing(2),
				[theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
					marginTop: theme.spacing(6),
					marginBottom: theme.spacing(6),
					padding: theme.spacing(3),
				},
			},
			button: {
				marginTop: theme.spacing(3),
				marginLeft: theme.spacing(1),
			},
		}))
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
	handleClose() {
		this.setState({
			snackbarOpen: false,
		})
	}
	handleOpen() {
		this.setState({
			snackbarOpen: true,
		})
	}
	async validateFormData(info) {
		let errors = []

		let allDataKeys = Object.keys(info)
		console.log(allDataKeys)
		for (const element of allDataKeys) {
			if (
				info[element] === '' &&
				element !== 'password' &&
				element !== 'confirmPassword'
			) {
				errors.push('Please fill out all required fields.')
				break
			}
		}

		if (info.password !== this.state.confirmPassword) {
			errors.push('Passwords do not match.')
		}

    //check done on backend
		// let regexZipCode = /^[0-9]{5}(?:-[0-9]{4})?$/
		// if (info.zipCode !== '' && !regexZipCode.test(info.zipCode)) {
		// 	errors.push('Please provide a valid zip code.')
		// }

		await this.setState({
			errors: errors,
		})
	}
	async handleSubmit() {
		//pull all the current form data from state
		console.log('handle submit called')
		await this.validateFormData(this.state)
		const {
			firstName,
			lastName,
			email,
			password,
			addressFirstName,
			addressLastName,
			streetAddress,
			city,
			zipCode,
			state,
		} = this.state
		const { id } = this.props.auth
		console.log('ID: ', id)
		//await validation of the data - zipcode if changed and passwords match?

		//if there are no errors
		if (!this.state.errors.length) {
			if (password) {
				this.props.updateUserInfo(
					{ firstName, lastName, email, password },
					this.props.auth.id
				)
			} else {
				this.props.updateUserInfo(
					{ firstName, lastName, email },
					this.props.auth.id
				)
			}
			//dispatch address update information w/ all address fields included AND email
			this.props.updateUserAddress(
				{
					email,
					firstName: addressFirstName,
					lastName: addressLastName,
					streetAddress,
					city,
					zipCode,
					state,
				},
				this.props.auth.id
			)

			this.handleOpen()
		}
	}
	async componentDidMount() {
		//console.log('component has mounted')
		const userId = this.props.auth.id
		if (userId) {
			//console.log('userId is present on auth')
			await this.props.fetchUserAddresses(userId)
			if (this.props.addresses.length) {
				const { firstName, lastName, streetAddress, city, zipCode, state } =
					this.props.addresses[0]
				this.setState({
					addressFirstName: firstName,
					addressLastName: lastName,
					streetAddress,
					city,
					zipCode,
					state,
				})
			}

			this.setState({
				firstName: this.props.auth.firstName,
				lastName: this.props.auth.lastName,
				email: this.props.auth.email,
			})
		}
	}
	render() {
		const classes = this.useStyles()
		const { auth, addresses } = this.props

		return (
			<Container
				component='main'
				className={classes.layout}
				maxWidth='md'
				style={{ padding: 30 }}
			>
				<Paper className={classes.paper}>
					<Grid
						container
						direction='column'
						justifyContent='center'
						alignItems='center'
						style={{ padding: 20 }}
					>
						<Typography component='h1' variant='h4' align='center'>
							Edit Your Profile
						</Typography>
					</Grid>
					<Grid
						container
						justifyContent='flex-end'
						alignItems='center'
						style={{ padding: 20 }}
					>
						<Grid container spacing={3} style={{ padding: 30 }}>
							<Grid item style={{ padding: 10 }} md={12}>
								<Typography component='h4' color='error'>
									{auth.error ? auth.error.response.data : ''}
								</Typography>
								<Typography component='h4' color='error'>
									{addresses.error ? addresses.error.response.data : ''}
								</Typography>
								{this.state.errors.length
									? this.state.errors.map((error, index) => (
											<Typography key={index} color='error' component='h4'>
												{error}
											</Typography>
									  ))
									: ''}
							</Grid>
							<Grid item style={{ padding: 10, width: '100%' }} md={12}>
								<Typography component='h4' display='block'>
									Name and Email:
								</Typography>
							</Grid>
							<NameEmailForm
								firstName={this.state.firstName}
								lastName={this.state.lastName}
								email={this.state.email}
								handleChange={this.handleChange}
								required
							/>
							<Grid item style={{ padding: 10, width: '100%' }} md={12}>
								<Typography component='h4'>Change Password:</Typography>
							</Grid>
							<PasswordForm
								password={this.state.password}
								confirmPassword={this.state.confirmPassword}
								handleChange={this.handleChange}
							/>
							<Grid item style={{ padding: 10, width: '100%' }} md={12}>
								<Typography component='h4'>Shipping Address:</Typography>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									autoComplete='fname'
									name='addressFirstName'
									variant='outlined'
									fullWidth
									id='addressFirstName'
									label='First Name'
									autoFocus
									value={this.state.addressFirstName}
									onChange={(event) => this.handleChange(event)}
									required
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									variant='outlined'
									fullWidth
									id='addressLastName'
									label='Last Name'
									name='addressLastName'
									autoComplete='lname'
									value={this.state.addressLastName}
									onChange={(event) => this.handleChange(event)}
									required
								/>
							</Grid>
							<AddressForm
								streetAddress={this.state.streetAddress}
								handleChange={this.handleChange}
								city={this.state.city}
								zipCode={this.state.zipCode}
								state={this.state.state}
								handleSelect={this.handleSelect}
								required
							/>
						</Grid>
						<Grid container justifyContent='flex-end' spacing={2}>
							<Grid item>
								<Link to='/home'>
									<Button
										variant='contained'
										color='primary'
										className={classes.button}
									>
										Cancel
									</Button>
								</Link>
							</Grid>
							<Grid item>
								<Button
									variant='contained'
									color='primary'
									className={classes.button}
									onClick={() => this.handleSubmit()}
								>
									Submit Changes
								</Button>
							</Grid>
							{this.state.snackbarOpen ? (
								<Snackbar
									open={this.state.snackbarOpen}
									autoHideDuration={6000}
									onClose={this.handleClose}
									anchorOrigin={{
										vertical: 'bottom',
										horizontal: 'right',
									}}
								>
									<React.Fragment>
										<Alert onClose={this.handleClose} severity='success'>
											Changes Saved!
										</Alert>
									</React.Fragment>
								</Snackbar>
							) : //can either redirect to home or do a toast/snackbar
							// (<Redirect to='/home' />))
							null}
						</Grid>
					</Grid>
				</Paper>
			</Container>
		)
	}
}

const mapState = (state) => {
	return {
		auth: state.auth,
		addresses: state.userAddresses,
	}
}

const mapDispatch = (dispatch) => {
	return {
		fetchUserAddresses: (userId) => dispatch(fetchUserAddresses(userId)),
		updateUserAddress: (newInfo, userId) =>
			dispatch(updateUserAddress(newInfo, userId)),
		updateUserInfo: (newInfo, userId) =>
			dispatch(updateUserInfo(newInfo, userId)),
	}
}

export default connect(mapState, mapDispatch)(EditProfile)
