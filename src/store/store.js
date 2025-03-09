import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../features/features'
import cartReducer from './cartSlice';

export const store = configureStore({
	reducer: {
		auth: userReducer, 
		cart: cartReducer,
	}
});
