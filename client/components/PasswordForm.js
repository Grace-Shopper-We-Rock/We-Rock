import React from 'react'
import { Grid, TextField } from '@material-ui/core'

export const PasswordForm = (props) => {
	const { password, confirmPassword, handleChange, required } = props

	return (
		<React.Fragment>
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
					onChange={(event) => handleChange(event)}
					{...{ required }}
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
					onChange={(event) => handleChange(event)}
					{...{ required }}
				/>
			</Grid>
		</React.Fragment>
	)
}
