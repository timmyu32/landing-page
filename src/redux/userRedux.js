import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState:{
        currentUser: null,
        isFetching: false,
        error: false,
        initialPopUpShown: 0
    },
    reducers: {
        loginStart:(state)=>{
            state.isFetching = true;
        },
        loginSuccess:(state, action)=>{
            state.isFetching = false;
            state.currentUser = action.payload
        },
        loginFailure:(state)=>{
            state.isFetching = false;
            state.error = true;
        },
        logout:(state)=>{
            state.isFetching = false;
            state.error = false;
            state.currentUser = null
        },
        addShop:(state, action)=>{
            state.currentUser.shop = action.payload;
        },
        addCustomerId:(state, action)=>{
            state.currentUser.customer_id = action.payload;
        },
        showPopUp:(state)=>{
            state.initialPopUpShown += 1;
        },
    },
});

export const { loginStart, loginFailure, loginSuccess, logout, showPopUp, addShop, addCustomerId } = userSlice.actions;
export default userSlice.reducer;