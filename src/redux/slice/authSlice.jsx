
import { createSlice } from "@reduxjs/toolkit";


const initialState={loggedIn: false, user: null}

export const authSlice= createSlice({
    name: 'auth',
    initialState,
    reducers:{
        login: (state, action)=>{
            state.loggedIn= true;
            state.user= action.payload;
        },
        logout:(state)=>{
            state.loggedIn=false;
            state.user=null;
        }
    }
})

export const {login, logout}=authSlice.actions;

export default authSlice.reducer;
