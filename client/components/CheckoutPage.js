import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import {
	Container,
	Grid,
	Paper,
	Stepper,
	Step,
	StepLabel,
	Button,
	Link,
	Typography,
	CssBaseline,
} from '@material-ui/core'
import { NameEmailForm } from './NameEmailForm'
import { AddressForm } from './AddressForm'
import { ReviewOrder } from './ReviewOrder'
import ConfirmationPage from './ConfirmationPage'
import { fetchUserAddresses } from '../store/address'
import { updateCartThunk } from '../store/cart'

export class Checkout extends React.Component {
	constructor(props) {
		super(props)
		this.steps = ['Shipping address', 'Review your order']
		this.state = {
			activeStep: 0,
			firstName: '',
			lastName: '',
			email: '',
			streetAddress: '',
			city: '',
			zipCode: '',
			state: '',
			errors: [],
			confirmationPage: false,
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSelect = this.handleSelect.bind(this)
		this.getStepContent = this.getStepContent.bind(this)
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
			stepper: {
				padding: theme.spacing(3, 0, 5),
			},
			buttons: {
				display: 'flex',
				justifyContent: 'flex-end',
			},
			button: {
				marginTop: theme.spacing(3),
				marginLeft: theme.spacing(1),
			},
		}))
	}
	async handleNext() {
		const currentStep = this.state.activeStep
		if (currentStep === 0) {
			await this.validateFormData(this.state)
		}

		if (!this.state.errors.length) {
			this.setState({
				activeStep: currentStep + 1,
			})
		}
	}
	handleBack() {
		const currentStep = this.state.activeStep
		this.setState({
			activeStep: currentStep - 1,
		})
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
	async handleConfirm() {
		if (this.state.activeStep === 1) {
			await this.props.updateCart({ status: 'inProcess' }, this.props.cart.id)
			//dispatch a thunk that will create a user's address and associate it with the order ID
			this.setState({ confirmationPage: true })
		}
	}
	getStepContent(step) {
		switch (step) {
			case 0:
				return (
					<Grid container spacing={3} styles={{ padding: 30 }}>
						<NameEmailForm
							firstName={this.state.firstName}
							lastName={this.state.lastName}
							email={this.state.email}
							handleChange={this.handleChange}
							required
						/>
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
				)
			case 1:
				return <ReviewOrder order={this.props.cart} />
			default:
				throw new Error('Unknown step')
		}
	}
	async validateFormData(formInfo) {
		let errors = []

		//check done on backend
		// let regexZipCode = /^[0-9]{5}(?:-[0-9]{4})?$/
		// if (formInfo.zipCode !== '' && !regexZipCode.test(formInfo.zipCode)) {
		// 	errors.push('Please provide a valid zip code.')
		// }

		let allDataKeys = Object.keys(formInfo)
		for (const element of allDataKeys) {
			if (formInfo[element] === '') {
				errors.push('Please fill out all required fields.')
				break
			}
		}

		await this.setState({
			errors: errors,
		})
	}
	async componentDidMount() {
		const userId = this.props.auth.id
		if (userId) {
			await this.props.fetchUserAddresses(userId)

			if (this.props.addresses.length) {
				const {
					firstName,
					lastName,
					email,
					streetAddress,
					city,
					zipCode,
					state,
				} = this.props.addresses[0]
				this.setState({
					firstName,
					lastName,
					email,
					streetAddress,
					city,
					zipCode,
					state,
				})
			}
		}
	}
	render() {
		const classes = this.useStyles()
		if (!this.state.confirmationPage) {
			return (
				<Container
					component='main'
					className={classes.layout}
					maxWidth='md'
					styles={{ padding: 30 }}
				>
					<Paper className={classes.paper}>
						<Typography component='h1' variant='h4' align='center'>
							Checkout
						</Typography>
						<Stepper
							activeStep={this.state.activeStep}
							className={classes.stepper}
						>
							{this.steps.map((label) => {
								return (
									<Step key={label}>
										<StepLabel>{label}</StepLabel>
									</Step>
								)
							})}
						</Stepper>
						<React.Fragment>
							<Grid
								container
								direction='column'
								justifyContent='center'
								alignItems='center'
							>
								{this.state.errors.length
									? this.state.errors.map((error, index) => (
											<Grid item style={{ padding: 5 }}>
												<Typography key={index} color='error' component='h4'>
													{error}
												</Typography>
											</Grid>
									  ))
									: ''}
							</Grid>

							{/* insert rendering of confirmation page where says null if active step is steps.lenght */}
							{this.state.activeStep === this.steps.length ? null : (
								<Grid
									container
									justifyContent='flex-end'
									alignItems='center'
									style={{ padding: 20 }}
								>
									{this.getStepContent(this.state.activeStep)}
									<div className={classes.buttons}>
										{this.state.activeStep !== 0 && (
											<Button
												className={classes.button}
												onClick={() => this.handleBack()}
											>
												Back
											</Button>
										)}
										<Button
											variant='contained'
											color='primary'
											onClick={() => {
												this.handleNext()
												this.handleConfirm()
											}}
											// onClick={() => this.handleConfirm()}
											className={classes.button}
										>
											{this.state.activeStep === this.steps.length - 1
												? 'Place Order'
												: 'Next'}
										</Button>
									</div>
								</Grid>
							)}
						</React.Fragment>
					</Paper>
				</Container>
			)
		} else {
			return <ConfirmationPage order={this.props.cart} />
		}
	}
}

const mapState = (state) => {
	return {
		auth: state.auth,
		addresses: state.userAddresses,
		cart: state.cart,
	}
}

const mapDispatch = (dispatch) => {
	return {
		fetchUserAddresses: (userId) => dispatch(fetchUserAddresses(userId)),
		updateCart: (update, cartId) => dispatch(updateCartThunk(update, cartId)),
	}
}

export default connect(mapState, mapDispatch)(Checkout)
