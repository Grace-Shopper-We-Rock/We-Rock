import axios from 'axios'
import history from '../history'

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
			dispatch(setAuth({ error: error }))
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
		return dispatch(setAuth(res.data))
	}
}

export const authenticate = (userInfoObj, method) => async (dispatch) => {
	try {
		const res = await axios.post(`/auth/${method}`, userInfoObj)
		window.localStorage.setItem(TOKEN, res.data.token)
		dispatch(me())
	} catch (authError) {
		return dispatch(setAuth({ error: authError }))
	}
}

export const logout = () => {
	window.localStorage.removeItem(TOKEN)
	history.push('/login')
	return {
		type: SET_AUTH,
		auth: {},
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
		default:
			return state
	}
}
