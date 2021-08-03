import React from 'react'
import { connect } from 'react-redux'
import { Link as ReactLink } from 'react-router-dom'
import { authenticate } from '../store'
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
import Autocomplete from '@material-ui/lab/Autocomplete'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import { makeStyles } from '@material-ui/core/styles'

//build in form validation/error handling if input is not allowed, email is already taken, etc.
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
		}
		this.statesAbbreviations = [
			'AL',
			'AK',
			'AS',
			'AZ',
			'AR',
			'CA',
			'CO',
			'CT',
			'DE',
			'DC',
			'FM',
			'FL',
			'GA',
			'GU',
			'HI',
			'ID',
			'IL',
			'IN',
			'IA',
			'KS',
			'KY',
			'LA',
			'ME',
			'MH',
			'MD',
			'MA',
			'MI',
			'MN',
			'MS',
			'MO',
			'MT',
			'NE',
			'NV',
			'NH',
			'NJ',
			'NM',
			'NY',
			'NC',
			'ND',
			'MP',
			'OH',
			'OK',
			'OR',
			'PW',
			'PA',
			'PR',
			'RI',
			'SC',
			'SD',
			'TN',
			'TX',
			'UT',
			'VT',
			'VI',
			'VA',
			'WA',
			'WV',
			'WI',
			'WY',
		]
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
	render() {
		const classes = this.useStyles()
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
					<form className={classes.form} noValidate>
						<Grid container spacing={2} style={{ padding: 10 }}>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									autoComplete='fname'
									name='firstName'
									variant='outlined'
									fullWidth
									id='firstName'
									label='First Name'
									autoFocus
									value={firstName}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									variant='outlined'
									required
									fullWidth
									id='lastName'
									label='Last Name'
									name='lastName'
									autoComplete='lname'
									value={lastName}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant='outlined'
									required
									fullWidth
									name='email'
									label='Email Address / Username'
									id='email'
									autoComplete='email'
									value={email}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant='outlined'
									required
									fullWidth
									name='password'
									label='Password'
									type='password'
									id='password'
									value={password}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant='outlined'
									required
									fullWidth
									name='confirmPassword'
									label='Confirm Password'
									type='password'
									id='confirmPassword'
									value={confirmPassword}
								/>
							</Grid>
							<Typography component='h4'>Address</Typography>
							<Grid item xs={12}>
								<TextField
									variant='outlined'
									fullWidth
									name='streetAddress'
									label='Street Address'
									id='streetAddress'
									value={streetAddress}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									variant='outlined'
									fullWidth
									name='city'
									label='City'
									id='city'
									value={city}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									variant='outlined'
									fullWidth
									name='zipCode'
									label='Zip Code'
									id='zipCode'
									value={zipCode}
								/>
							</Grid>
							<Grid item xs={12}>
								<Autocomplete
									id='state-selection-dropdown'
									options={this.statesAbbreviations}
									style={{ width: 150 }}
									getOptionLabel={(option) => option}
									renderInput={(params) => (
										<TextField
											{...params}
											name='state'
											variant='outlined'
											label='State'
											fullWidth
											value={state}
										/>
									)}
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
