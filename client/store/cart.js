import axios from 'axios'

//PRODUCTS ACTIONS:
const SET_CART = 'SET_CART'
const UPDATE_CART = 'UPDATE_CART'

//ACTION CREATORS:
export const setCart = (cart) => {
    return {
        type: SET_CART,
        cart
    }
}

export const updateCart = (cart) => {
    return {
        type: UPDATE_CART,
        cart
    }
}

//ASYNC ACTION CREATORS/ THUNKS:
export const fetchCart = (userId) => {
    return async (dispatch) => {
        try {
            //this api route should have a findorcreate order option.
            const { data } = await axios.get(`/api/orders/cart/${userId}`)
            dispatch(setCart(data))
        } catch (err) {
            console.log(err)
        }
    }
}

export const updateCartThunk = (userId) => {
    return async (dispatch) => {
        const { data: updated } = await axios.put(`/api/orders/cart/${userId}`);
        dispatch(updateProductStock(updated));
    }
};

//PRODUCTS REDUCER:
export default function (state = [], action) {
    switch (action.type) {
        case SET_PRODUCTS:
            return action.products
        case UPDATE_PRODUCT_STOCK:
            return state.map((product) =>
                (product.id === action.product.id ? action.product : product));
        default:
            return state
    }
}
