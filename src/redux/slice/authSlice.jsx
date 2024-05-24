
import { createSlice } from "@reduxjs/toolkit";
const initialState={loggedIn: false, isGridView: false, isMobileView: false}

export const authSlice= createSlice({
    name: 'auth',
    initialState,
    reducers:{
        login: (state)=>{
            state.loggedIn= true;
            
        },
        logout:(state)=>{
            state.loggedIn=false;  
        },
        setIsGridView:(state,action)=>{
            state.isGridView=action.payload;
        },
        setIsMobileView:(state,action)=>{
            state.isMobileView=action.payload;
        }
    }
})

export const {login, logout, setIsGridView, setIsMobileView}=authSlice.actions;

export default authSlice.reducer;
