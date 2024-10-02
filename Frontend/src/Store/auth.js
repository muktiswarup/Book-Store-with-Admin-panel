import { createSlice } from "@reduxjs/toolkit";

const authSlice= createSlice({
    name:'auth',
    initialState: {isLoggedIn:false,role:"user"},
    reducers:{
        login(state){
            state.isLoggedIn=true;
        },
        logout(state){
            state.isLoggedIn=false;
        },
        changeRole(state,action){
            const role=action.payload;
            state.role=role;
        }
    }
})

export const authActions=authSlice.actions;
export default authSlice.reducer;






/* No data required: In login and logout, you are not relying on any external data to perform the state change. Hence, you only need the state parameter.
Data required: In changeRole, you need external input (the new role), so the action parameter is necessary to access the action.payload.
In short, you use action when the action requires some dynamic input (like a payload) to modify the state, while in cases where the action just alters state based on predefined logic, only the state is used. */