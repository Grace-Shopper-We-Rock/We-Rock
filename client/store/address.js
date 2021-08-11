import axios from 'axios'

const TOKEN = 'token'

const GET_USER_ADDRESSES = 'GET_USER_ADDRESSES'
const SET_ADDRESS_TO_ORDER = 'SET_ADDRESS_TO_ORDER'

const haveAddresses = (addresses) => {
	return {
		type: GET_USER_ADDRESSES,
		addresses,
	}
}

const newOrderAddress = (address) => {
	return {
		type: SET_ADDRESS_TO_ORDER,
		address,
	}
}

export const createNewOrderAddress = (orderId, newAddressInfo, userId) => {
	return async (dispatch) => {
		try {
			//dispatch to a route that I am writting
			const { data } = await axios.put(
				`/api/orders/${orderId}/address/${userId}`,
				newAddressInfo
			)
			dispatch(newOrderAddress(data))
		} catch (error) {
			//dispatch the same action with {error: error}
			dispatch(newOrderAddress({ error: error }))
		}
	}
}

// export const associateAddressToOrder = (orderId, addressId, addressInfo) => {
// 	return async (dispatch) => {
// 		try {
// 			const { data } = await axios.put(`/api/orders/${orderId}/${addressId}`, addressInfo)
// 			dispatch(newOrderAddress(data))
// 		} catch (error) {
// 			dispatch(newOrderAddress({ error: error }))
// 		}
// 	}
// }

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
		case SET_ADDRESS_TO_ORDER:
			return [action.address]
		default:
			return state
	}
}
