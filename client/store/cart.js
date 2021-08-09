import axios from 'axios'

//PRODUCTS ACTIONS:
const SET_CART = 'SET_CART'
const UPDATE_CART_ITEMS = 'UPDATE_CART_ITEMS'
const ADD_CART_ITEM = 'ADD_CART_ITEM'
const DELETE_CART_ITEM = 'DELETE_CART_ITEM'

//ACTION CREATORS:
export const setCart = (cart) => {
    return {
        type: SET_CART,
        cart
    }
}

export const addCartItem = (product) => {
    return {
        type: ADD_CART_ITEM,
        product
    }
}

export const deleteCartItem = (product) => {
    return {
        type: DELETE_CART_ITEM,
        product
    }
}

export const updateCartItem = (product) => {
    return {
        type: UPDATE_CART_ITEMS,
        product
    }
}

//ASYNC ACTION CREATORS/ THUNKS:
export const fetchCartItems = (userId) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`/api/orders/${userId}/cart`)
            dispatch(setCart(data))
        } catch (err) {
            console.log(err)
        }
    }
}

export const addCartItemThunk = (productInOrder) => {
    return async (dispatch) => {
        const { data: created } = await axios.post(`/api/orders/${userId}/cart`, productInOrder)
        dispatch(addCartItem(created))
    }
}

export const deleteCartItemThunk = (prodId) => {
    return async (dispatch) => {
        const { data: productInOrder } = await axios.delete(`/api/orders/${userId}/cart/${prodId}`)
        dispatch(deleteCartItem(productInOrder))
    }
};

export const updateCartItemsThunk = (userId) => {
    return async (dispatch) => {
        //should find or create a productInCart item then add/update to array of products
        const { data: updated } = await axios.put(`/api/orders/${userId}/cart`);
        dispatch(updateCartItems(updated));
    }
};

//CART ITEMS REDUCER:
export default function (state = {}, action) {
    switch (action.type) {
        case SET_CART:
            return action.cart
        case ADD_CART_ITEM:
            return [...state, action.robot]
        case DELETE_CART_ITEM:
            return state.filter((product) =>
                product.id !== action.productInOrder.id);
        case UPDATE_CART_ITEMS:
            return state.map((product) =>
                (product.id === action.product.id ? action.product : product));
        default:
            return state
    }
}
