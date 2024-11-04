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
    AddToCart: (state, action: PayloadAction< Cart_type>) => {
      const item = state.cart.find((item) => item._id === action.payload._id);
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.cart.push({
          title: action.payload.title,
          _id: action.payload._id,
          image: action.payload.image,
          quantity: action.payload.quantity,
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
