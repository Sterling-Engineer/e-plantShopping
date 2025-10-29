// store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice';

const store = configureStore({
    // Define the root reducer object
    reducer: {
        cart: cartReducer,
    },
});


export default store;
