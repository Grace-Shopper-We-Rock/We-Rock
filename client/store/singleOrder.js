import axios from 'axios'

//SINGLE ORDER ACTIONS:
const SET_SINGLE_ORDER = 'SET_SINGLE_ORDER'

//ACTION CREATORS:
export const setSingleOrder = (order) => {
    return {
        type: SET_SINGLE_ORDER,
        order
    }
};

//ASYNC ACTION CREATORS/THUNKS:
export const fetchSingleOrder = (orderId) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`/api/orders/${orderId}`)
            dispatch(setSingleOrder(data))
        } catch (err) {
            console.log(err)
        }
    }
};


//SINGLE ORDER REDUCER:
export default function (state = {}, action) {
    switch (action.type) {
        case SET_SINGLE_ORDER:
            return action.order
        default:
            return state
    }
}

