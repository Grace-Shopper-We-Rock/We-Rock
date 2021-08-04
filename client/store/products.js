import axios from 'axios'

//PRODUCTS ACTIONS:
const SET_PRODUCTS = 'SET_PRODUCTS'
const UPDATE_PRODUCT_STOCK = 'UPDATE_PRODUCT_STOCK'

//ACTION CREATORS:
export const setProducts = (products) => {
    return {
        type: SET_PRODUCTS,
        products
    }
}

export const updateProductStock = (product) => {
    return {
        type: UPDATE_PRODUCT_STOCK,
        product
    }
}

//ASYNC ACTION CREATORS/ THUNKS:
export const fetchProducts = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get('/api/products')
            dispatch(setProducts(data))
        } catch (err) {
            console.log(err)
        }
    }
}

export const updateProductStockThunk = (product) => {
    return async (dispatch) => {
        const { data: updated } = await axios.put(`/api/products/${product.id}`);
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
