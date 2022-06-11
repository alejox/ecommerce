import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';
import { setIsLoading } from './isLoading.slice';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        setCart:(state, action) =>{
            return action.payload;
        }
    }
})

export const { setCart } = cartSlice.actions;

export const getCart = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/cart/',getConfig())
        .then(res => dispatch(setCart(res.data.data.cart.products)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const addToCart = (newPurchase) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/cart', newPurchase, getConfig())
        .then(() => {
            dispatch(getCart())
            alert('the product was added to cart')
        })
        .catch(error => {
            console.log(error.response)
            alert('An error occurred')
        });
        /* .finally(() => dispatch(setIsLoading(false))); */
}

export default cartSlice.reducer;
