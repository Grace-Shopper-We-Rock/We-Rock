import axios from 'axios'

//SINGLE PRODUCT ACTIONS:
const SET_SINGLE_PRODUCT = 'SET_SINGLE_PRODUCT'

//ACTION CREATORS:
export const setSingleProduct = (product) => {
    return {
        type: SET_SINGLE_PRODUCT,
        product
    }
};

//ASYNC ACTION CREATORS/ THUNKS:
export const fetchSingleProduct = (productId) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`/api/products/${productId}`)
            dispatch(setSingleProduct(data))
        } catch (err) {
            console.log(err)
        }
    }
};


//SINGLE PROJECT REDUCER:
export default function (state = {}, action) {
    switch (action.type) {
        case SET_SINGLE_PRODUCT:
            return action.product
        default:
            return state
    }
}

