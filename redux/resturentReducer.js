import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  resturant: {
    id: null,
    imgUrl: null,
    title: null,
    rating:null,
    genra: null,
    address: null,
    short_description: null,
    dishes: null,
  },
};

export const resturentSlice = createSlice({
  name: "resturent",
  initialState,
  reducers: {
    setResturant: (state, action) => {
      state.resturant = action.payload;
    },
  },
});

export const { setResturant } = resturentSlice.actions;

export const selectResturent = (state) => state.resturant.resturant;

export default resturentSlice.reducer;
