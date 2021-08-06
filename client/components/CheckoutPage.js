import React from 'react'
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

export default class Checkout extends React.Component {
	constructor(props) {
		super(props)
		this.steps = ['Shipping address', 'Review your order']
		this.state = {
			activeStep: 0,
			firstName: '',
			lastName: '',
			streetAddress: '',
			city: '',
			zipCode: '',
			state: '',
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
	handleNext() {
		const currentStep = this.state.activeStep
		this.setState({
			activeStep: currentStep + 1,
		})
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
	getStepContent(step) {
		switch (step) {
			case 0:
				return (
					<Grid container spacing={3} styles={{ padding: 30 }}>
						<NameEmailForm
							firstName={this.state.firstName}
							lastName={this.state.lastName}
							handleChange={this.handleChange}
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
				return <ReviewOrder />
			default:
				throw new Error('Unknown step')
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
						{/* insert rendering of confirmation page if active step is steps.lenght */}
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
										onClick={() => this.handleNext()}
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
	}
}
