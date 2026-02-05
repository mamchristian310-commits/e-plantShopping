import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      // Expects action.payload to be a product object
      const product = action.payload;
      // Find existing item by name (assumes unique names)
      const existing = state.items.find((item) => item.name === product.name);
      if (existing) {
        // increment quantity if already exists
        existing.quantity = (existing.quantity || 1) + 1;
      } else {
        // add new product with initial quantity
        state.items.push({ ...product, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      // action.payload may be a product name or an object with name
      const name = action.payload?.name || action.payload;
      state.items = state.items.filter((item) => item.name !== name);
    },
    updateQuantity: (state, action) => {
      // action.payload should be { name, quantity }
      const { name, quantity } = action.payload;
      const item = state.items.find((i) => i.name === name);
      if (item) {
        if (quantity > 0) {
          item.quantity = quantity;
        } else {
          // remove if quantity is zero or negative
          state.items = state.items.filter((i) => i.name !== name);
        }
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
