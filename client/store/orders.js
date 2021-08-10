import axios from 'axios'

//ORDERS ACTIONS:
const SET_ORDERS = 'SET_ORDERS'
const SET_USER_ORDERS = 'SET_USER_ORDERS'

//ACTION CREATORS:
export const setOrders = (orders) => {
    return {
        type: SET_ORDERS,
        orders
    }
}

export const setUserOrders = (orders) => {
    return {
        type: SET_USER_ORDERS,
        orders
    }
}

//ASYNC ACTION CREATORS/THUNKS:
export const fetchOrders = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get('/api/orders')
            dispatch(setOrders(data))
        } catch (err) {
            console.log(err)
        }
    }
}

export const fetchUserOrders = (userId) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`/api/orders/user/${userId}`)
            dispatch(setUserOrders(data))
        } catch (err) {
            console.log(err)
        }
    }
}

//ORDERS REDUCER:
export default function (state = [], action) {
    switch (action.type) {
        case SET_ORDERS:
            return action.orders
        case SET_USER_ORDERS:
            return action.orders
        default:
            return state
    }
}
