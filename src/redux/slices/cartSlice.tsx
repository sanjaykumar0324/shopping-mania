import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cart_type } from "@/utils/types";

interface InitialState {
  cart: Cart_type[];
  loading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  cart: [],
  loading: false,
  error: null,
};



const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    AddToCart: (state, action: PayloadAction<{ product: Cart_type; itemCount: number; title: string; _id: string; image: string; price: number; }>) => {
      const item = state.cart.find((item) => item._id === action.payload.product._id);
      if (item) {
        item.quantity += action.payload.itemCount;
      } else {
        state.cart.push({
          productName: action.payload.title,
          _id: action.payload._id,
          image: action.payload.image,
          quantity: action.payload.itemCount,
          price: action.payload.price,
        });
      }
    },
    RemoveFromCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload);
    },
  },
});

// Export actions and reducer
export const { AddToCart, RemoveFromCart } = cartSlice.actions;
export default cartSlice.reducer;
