import axios from 'axios'

//PRODUCTS ACTIONS:
const SET_CART = 'SET_CART'
const UPDATE_CART_ITEMS = 'UPDATE_CART_ITEMS'
const ADD_CART_ITEM = 'ADD_CART_ITEM'
const DELETE_CART_ITEM = 'DELETE_CART_ITEM'
const UPDATE_CART = 'UPDATE_CART'

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

export const updateCart = (cart) => {
    return {
        type: UPDATE_CART,
        cart
    }
}

//ASYNC ACTION CREATORS/ THUNKS:
export const fetchCart = (userId, orderId) => {
    return async (dispatch) => {
        try {
            //IF we have a logged in user:
            if (userId) {
                const { data } = await axios.get(`/api/cart/${userId}`)
                dispatch(setCart(data))
            } else if (orderId) {
                //if we have an orderId stored in localstorage or state already
                const { data } = await axios.get(`/api/orders/${orderId}`)
                dispatch(setCart(data))
            } else {
                //Set cart to empty!
                dispatch(setCart({}))
            }
        } catch (err) {
            console.log(err)
        }
    }
}

export const addCartItemThunk = (newProductInOrder) => {
    return async (dispatch) => {
        const { data: created } = await axios.post(`/api/orders/${userId}/cart`, newProductInOrder)
        dispatch(addCartItem(created))
    }
}

export const deleteCartItemThunk = (prodId) => {
    return async (dispatch) => {
        const { data: productInOrder } = await axios.delete(`/api/orders/${userId}/cart/${prodId}`)
        dispatch(deleteCartItem(productInOrder))
    }
};

export const updateCartItemThunk = (productInOrderId) => {
    return async (dispatch) => {
        const { data: updated } = await axios.put(`/api/products/${productInOrderId}`);
        dispatch(updateCartItems(updated));
    }
};

export const updateCartThunk = (update, orderId) => {
    return async (dispatch) => {
        const { data: updated } = await axios.put(`/api/orders/${orderId}`, update);
        dispatch(updateCart(updated));
    }
};


//CART REDUCER:
export default function (state = {}, action) {
    switch (action.type) {
        case SET_CART:
            return action.cart
        case ADD_CART_ITEM:
            let newProductsArray = [...state.products, action.product]
            return { ...state, productInOrders: newProductsArray }
        case DELETE_CART_ITEM:
            let deletedProductsArray = state.products.filter((product) =>
                product.id !== action.productInOrder.id)
            return { ...state, productInOrders: deletedProductsArray }
        case UPDATE_CART_ITEMS:
            let updatedProductsArray = state.map((product) =>
                (product.id === action.product.id ? action.product : product))
            return { ...state, productInOrders: updatedProductsArray }
        case UPDATE_CART:
            return { ...state }
        default:
            return state
    }
}
