import axios from 'axios'

const TOKEN = 'token'

const GET_USER_ADDRESSES = 'GET_USER_ADDRESSES'

const haveAddresses = (addresses) => {
	return {
		type: GET_USER_ADDRESSES,
		addresses,
	}
}

export const fetchUserAddresses = (userId) => {
	return async (dispatch) => {
		try {
			const token = window.localStorage.getItem(TOKEN)
			if (token) {
				const { data } = await axios.get(`/api/users/${userId}/addresses`, {
					headers: {
						authorization: token,
					},
				})
				dispatch(haveAddresses(data))
			}
		} catch (error) {
			dispatch(haveAddresses({ error: error }))
		}
	}
}

export const updateUserAddress = (newInfo, userId) => {
	return async (dispatch) => {
		try {
			const token = window.localStorage.getItem(TOKEN)
			if (token) {
				const { data } = await axios.put(
					`/api/users/${userId}/addresses`,
					newInfo,
					{
						headers: {
							authorization: token,
						},
					}
				)
				dispatch(haveAddresses(data))
			}
		} catch (error) {
			dispatch(haveAddresses({ error: error }))
		}
	}
}

//REDUCER
export default function (state = [], action) {
	switch (action.type) {
		case GET_USER_ADDRESSES:
			return action.addresses
		default:
			return state
	}
}
