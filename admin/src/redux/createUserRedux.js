import { createSlice } from "@reduxjs/toolkit";

export const createUserSlice = createSlice({
  name: "createUser",
  initialState: {
    users: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //get user
    getUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getUserSuccess: (state, action) => {
      state.isFetching = false;
      state.users = action.payload;
    },
    getUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    addUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    // addUser
    addUserSuccess: (state, action) => {
      state.isFetching = false;
      state.users.push(action.payload);
    },
    addUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  addUserFailure,
  addUserStart,
  addUserSuccess,
  getUserFailure,
  getUserStart,
  getUserSuccess,
} = createUserSlice.actions;
export default createUserSlice.reducer;
