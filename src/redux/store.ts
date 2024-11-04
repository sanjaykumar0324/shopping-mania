// src/store.ts

import { configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import cartSlice from "./slices/cartSlice";
import productSlice from "./slices/productSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AddToCart ,RemoveFromCart} from './slices/cartSlice';
import {addProducts,setProducts} from "./slices/productSlice"


const store = configureStore({
  reducer: {
    cart: cartSlice,
    products: productSlice,
  },
});

export type AppActions = 
  | ReturnType<typeof AddToCart>
  | ReturnType<typeof RemoveFromCart>
  | ReturnType<typeof addProducts>
  | ReturnType<typeof setProducts>;export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = ThunkDispatch<RootState, unknown, AppActions>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// export const BASE_URL = "https://shopping-mania-rzig.vercel.app";
export const BASE_URL = "http://localhost:3000"
export default store;
