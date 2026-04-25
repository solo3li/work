import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DUMMY_CATEGORIES, DUMMY_PRODUCTS, DUMMY_ORDERS } from '../data/dummy';

interface ShopState {
  categories: any[];
  products: any[];
  orders: any[];
  selectedCategory: string | null;
}

const initialState: ShopState = {
  categories: DUMMY_CATEGORIES,
  products: DUMMY_PRODUCTS,
  orders: DUMMY_ORDERS,
  selectedCategory: null,
};

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
    },
    addOrder: (state, action: PayloadAction<any>) => {
      state.orders.unshift({
        id: state.orders.length + 1001,
        created: new Date().toISOString(),
        status: 'pending',
        ...action.payload
      });
    }
  },
});

export const { setSelectedCategory, addOrder } = shopSlice.actions;
export default shopSlice.reducer;
