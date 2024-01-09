'use client';
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },
  reducers: {
    addUser: (state, action) => {
      const user = action.payload;
    },
    // addItem: (state, action) => {
    //   const item = state.items.find((item) => item.id === action.payload.id);
    //   item ? (item.count = item.count + 1) : state.items.push(action.payload);
    // },
    // removeItem: (state, action) => {
    //   // state.items.pop();
    //   const index = state.items.findIndex(
    //     (item) => item.id === action.payload.id
    //   );
    //   const item = state.items[index];
    //   item?.count > 1
    // ? (item.count = item.count - 1)
    //     : state.items.splice(index, 1);
    // },
    // clearCart: (state) => {
    //   state.items = [];
    // },
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
