import axios from 'axios'

//PRODUCTS ACTIONS:
const SET_CART_ITEMS = 'SET_CART_ITEMS'
const UPDATE_CART_ITEMS = 'UPDATE_CART_ITEMS'
const ADD_CART_ITEM = 'ADD_CART_ITEM'
const DELETE_CART_ITEM = 'DELETE_CART_ITEM'

//ACTION CREATORS:
export const setCartItems = (cart) => {
    return {
        type: SET_CART_ITEMS,
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
            //this api route should have a findorcreate order option.
            const { data } = await axios.get(`/api/orders/cart/${userId}`)
            dispatch(setCartItems(data))
        } catch (err) {
            console.log(err)
        }
    }
}

export const addCartItemThunk = (productInOrder) => {
    return async (dispatch) => {
        const { data: created } = await axios.post('/api/orders/cart/', productInOrder)
        dispatch(addCartItem(created))
    }
}

export const deleteCartItemThunk = (id) => {
    return async (dispatch) => {
        const { data: productInOrder } = await axios.delete(`/api/orders/cart/${id}`)
        dispatch(deleteCartItem(productInOrder))
    }
};

export const updateCartItemsThunk = (userId) => {
    return async (dispatch) => {
        //should find or create a productInCart item then add/update to array of products
        const { data: updated } = await axios.put(`/api/orders/cart/${userId}`);
        dispatch(updateCartItems(updated));
    }
};

//CART ITEMS REDUCER:
export default function (state = [], action) {
    switch (action.type) {
        case SET_CART_ITEMS:
            return action.products
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
