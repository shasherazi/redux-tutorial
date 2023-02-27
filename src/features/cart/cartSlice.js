import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cartItems from '../../cartItems';

const url = 'https://course-api.com/react-useReducer-cart-project';

const initialState = {
  cartItems: [],
  amount: 4,
  total: 0,
  isLoading: true,
};

export const fetchCartItems = createAsyncThunk('cart/fetchCartItems', () => {
  return fetch(url)
    .then((res) => res.json())
    .catch((err) => console.log(err));
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== id);
    },
    increment: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount += 1;
    },
    decrement: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount -= 1;
    },
    calculateTotal: (state) => {
      state.total = state.cartItems.reduce((acc, item) => {
        return acc + item.amount * item.price;
      }, 0);
      state.amount = state.cartItems.reduce((acc, item) => {
        return acc + item.amount;
      }, 0);
    },
  },
  extraReducers: {
    [fetchCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchCartItems.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [fetchCartItems.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { clearCart, removeItem, increment, decrement, calculateTotal } =
  cartSlice.actions;

export default cartSlice.reducer;
