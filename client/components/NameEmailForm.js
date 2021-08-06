import React from 'react'
import { Grid, TextField } from '@material-ui/core'

export const NameEmailForm = (props) => {
	const { firstName, lastName, email, handleChange } = props

	return (
		<React.Fragment>
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
					onChange={(event) => handleChange(event)}
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
					onChange={(event) => handleChange(event)}
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
					onChange={(event) => handleChange(event)}
				/>
			</Grid>
		</React.Fragment>
	)
}
