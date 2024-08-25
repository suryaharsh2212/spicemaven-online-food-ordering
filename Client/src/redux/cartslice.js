import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      const uniqueId = `${action.payload.id}-${Date.now()}`; 
      state.items.push({ ...action.payload, uniqueId, quantity: 1 });
    },
    
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.uniqueId !== action.payload.uniqueId);
    },
    
    clearCart: (state) => {
      state.items = [];
    },
    
    updateQuantity: (state, action) => {
      const item = state.items.find(item => item.uniqueId === action.payload.uniqueId);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
  },
});

export const { addItem, removeItem, clearCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
