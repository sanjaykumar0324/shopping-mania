import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product_type } from "@/utils/types";

interface ProductState {
  products: Product_type[];
}

const initialState: ProductState = {
  products: [],
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product_type[]>) {
      state.products = action.payload;
    },
    addProducts(state, action: PayloadAction<Product_type[]>) {
      state.products.push(...action.payload);
    },
  },
});

export const { setProducts, addProducts } = productSlice.actions;
export default productSlice.reducer;
