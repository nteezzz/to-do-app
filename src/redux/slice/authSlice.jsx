
import { createSlice } from "@reduxjs/toolkit";
const initialState={loggedIn: false,isGridView: false,
    isMobileView: false,}

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
        setGridView: (state, action) => {
            state.isGridView = action.payload;
        },
        setMobileView: (state, action) => {
            state.isMobileView = action.payload;
        },
          
        
    }
})

export const {login, logout, setGridView, setMobileView}=authSlice.actions;

export default authSlice.reducer;
