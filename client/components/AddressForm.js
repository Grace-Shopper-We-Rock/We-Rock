import React from 'react'
import {
	Grid,
	Typography,
	TextField,
	FormControlLabel,
} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'

const stateAbbreviations = [
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

export const AddressForm = (props) => {
	const {
		streetAddress,
		handleChange,
		city,
		zipCode,
		state,
		handleSelect,
		required,
	} = props

	return (
		<React.Fragment>
			<Grid item xs={12}>
				<TextField
					variant='outlined'
					fullWidth
					name='streetAddress'
					label='Street Address'
					id='streetAddress'
					value={streetAddress}
					onChange={(event) => handleChange(event)}
					{...{ required }}
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
					onChange={(event) => handleChange(event)}
					{...{ required }}
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
					onChange={(event) => handleChange(event)}
					{...{ required }}
				/>
			</Grid>
			<Grid item xs={12}>
				<Autocomplete
					id='state-selection-dropdown'
					options={stateAbbreviations}
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
							onChange={(event) => handleChange(event)}
							onSelect={(event) => handleSelect(event)}
							{...{ required }}
						/>
					)}
				/>
			</Grid>
		</React.Fragment>
	)
}
