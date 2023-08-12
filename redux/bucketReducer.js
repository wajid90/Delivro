import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const backetSlice = createSlice({
  name: "backet",
  initialState,
  reducers: {
    addItemInBacket: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    deleteItemInBacket: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      let newItems = [...state.items];
      if (index >= 0) {
        newItems.splice(index, 1);
      } else {
        console.warn("the Item is not in the backet");
      }
      state.items = newItems;
    },
  },
});

export const { addItemInBacket, deleteItemInBacket } = backetSlice.actions;

export const selectBacketItem = (state) => state.backet.items;

export const selectBacketItemWithId = (state, id) =>
  state.backet?.items?.filter((item) => item.id === id);

export const selectBasketTotal = (state) =>
  state.backet.items.reduce((total, item) => (total += item.price), 0);

export default backetSlice.reducer;
