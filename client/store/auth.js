import axios from 'axios'
import history from '../history'
import { fetchCart } from '../store/cart'

const TOKEN = 'token'

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH'
const CLEAR_AUTH = 'CLEAR_AUTH'
const UPDATE_USER_INFO = 'UPDATE_USER_INFO'

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth })
const updateAuth = (auth) => ({ type: UPDATE_USER_INFO, auth })
const loggedOut = () => ({
	type: SET_AUTH,
	auth: {},
})
export const clearAuth = () => ({ type: CLEAR_AUTH })

/**
 * THUNK CREATORS
 */

export const updateUserInfo = (newInfo, userId) => {
	return async (dispatch) => {
		try {
			const token = window.localStorage.getItem(TOKEN)
			if (token) {
				const { data } = await axios.put(`/api/users/${userId}`, newInfo, {
					headers: {
						authorization: token,
					},
				})
				dispatch(setAuth(data))
			}
		} catch (error) {
			dispatch(updateAuth({ error: error }))
		}
	}
}

export const me = () => async (dispatch) => {
	const token = window.localStorage.getItem(TOKEN)
	if (token) {
		const res = await axios.get('/auth/me', {
			headers: {
				authorization: token,
			},
		})
		dispatch(setAuth(res.data))
		return dispatch(fetchCart(res.data.id))
	}
}

export const authenticate = (userInfoObj, method) => async (dispatch) => {
	try {
		const res = await axios.post(`/auth/${method}`, userInfoObj)
		window.localStorage.setItem(TOKEN, res.data.token)
		dispatch(me())
		history.push('/')
	} catch (authError) {
		return dispatch(setAuth({ error: authError }))
	}
}

export const logout = () => async (dispatch) => {
	try {
		window.localStorage.removeItem(TOKEN)
		dispatch(fetchCart())
		dispatch(loggedOut())
		history.push('/login')
	} catch (error) {
		console.log(error)
	}
}

/**
 * REDUCER
 */
export default function (state = {}, action) {
	switch (action.type) {
		case SET_AUTH:
			return action.auth
		case CLEAR_AUTH:
			return {}
		case UPDATE_USER_INFO:
			//if action has an error in its current
			if (action.auth.error) {
				let newState = { ...state }
				newState.error = action.auth.error
				return newState
			} else {
				return action.auth
			}
		default:
			return state
	}
}
