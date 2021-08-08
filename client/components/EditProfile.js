import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
	Button,
	Paper,
	Container,
	CssBaseline,
	TextField,
	Grid,
	Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { NameEmailForm } from './NameEmailForm'
import { AddressForm } from './AddressForm'
import { PasswordForm } from './PasswordForm'
import { fetchUserAddresses } from '../store/address'

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
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSelect = this.handleSelect.bind(this)
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
	async componentDidMount() {
		console.log('component has mounted')
		const userId = this.props.auth.id
		if (userId) {
			console.log('userId is present on auth')
			await this.props.fetchUserAddresses(userId)
			const { firstName, lastName, streetAddress, city, zipCode, state } =
				this.props.addresses[0]
			this.setState({
				firstName: this.props.auth.firstName,
				lastName: this.props.auth.lastName,
				email: this.props.auth.email,
				addressFirstName: firstName,
				addressLastName: lastName,
				streetAddress,
				city,
				zipCode,
				state,
			})
		}
	}
	render() {
		const classes = this.useStyles()

		return (
			<Container
				component='main'
				className={classes.layout}
				maxWidth='md'
				styles={{ padding: 30 }}
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
						<Grid container spacing={3} styles={{ padding: 30 }}>
							<Grid item style={{ padding: 10 }} md={12}>
								<Typography component='h4'>Name and Email:</Typography>
							</Grid>
							<NameEmailForm
								firstName={this.state.firstName}
								lastName={this.state.lastName}
								email={this.state.email}
								handleChange={this.handleChange}
							/>
							<Grid item style={{ padding: 10 }} md={12}>
								<Typography component='h4'>Change Password:</Typography>
							</Grid>
							<PasswordForm
								password={this.state.password}
								confirmPassword={this.state.confirmPassword}
								handleChange={this.handleChange}
							/>
							<Grid item style={{ padding: 10 }} md={12}>
								<Typography component='h4'>Shipping Address:</Typography>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									autoComplete='fname'
									name='firstName'
									variant='outlined'
									fullWidth
									id='addressFirstName'
									label='First Name'
									autoFocus
									value={this.state.addressFirstName}
									onChange={(event) => this.handleChange(event)}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									variant='outlined'
									required
									fullWidth
									id='addressLastName'
									label='Last Name'
									name='lastName'
									autoComplete='lname'
									value={this.state.addressLastName}
									onChange={(event) => this.handleChange(event)}
								/>
							</Grid>
							<AddressForm
								streetAddress={this.state.streetAddress}
								handleChange={this.handleChange}
								city={this.state.city}
								zipCode={this.state.zipCode}
								state={this.state.state}
								handleSelect={this.handleSelect}
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
								>
									Submit Changes
								</Button>
							</Grid>
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
	}
}

export default connect(mapState, mapDispatch)(EditProfile)