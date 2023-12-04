import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalItems: 0,
    totalPrice: 0,
  },
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        // If item already exists, increase quantity
        existingItem.quantity += 1;
      } else {
        // If item doesn't exist, add it to the cart
        state.items.push({ ...newItem, quantity: 1 });
      }
      state.totalItems = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalPrice = Math.floor(
        state.items.reduce((total, item) => {
          const itemPrice = item.price || item.defaultPrice || 0;
          return total + itemPrice * item.quantity;
        }, 0) / 100
      );
      state.cartValue = Math.floor(state.totalPrice / 1.5);
    },
    removeItem: (state, action) => {
      const itemId = action.payload.id;
      const existingItem = state.items.find((item) => item.id === itemId);
      if (existingItem) {
        // If item exists, decrease quantity
        existingItem.quantity -= 1;

        // If quantity becomes zero, remove the item
        if (existingItem.quantity === 0) {
          state.items = state.items.filter((item) => item.id !== itemId);
        }
      }
      state.totalItems = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalPrice = Math.floor(
        state.items.reduce((total, item) => {
          const itemPrice = item.price || item.defaultPrice || 0;
          return total + itemPrice * item.quantity;
        }, 0) / 100
      );
      state.cartValue = Math.floor(state.totalPrice / 1.5);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});
export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
