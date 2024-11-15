import { createSlice } from "@reduxjs/toolkit";


const initailSate = {

        name:"",
        email:"",
        phone:"",
        role:"",
        jwtToken:"",
        jti : ""
   
}


export const userSlice = createSlice({
    name:"auth",
    initialState:initailSate,
    reducers:{
        loginUser: (state, action) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.phone = action.payload.phone;
            state.role = action.payload.role;
            state.jwtToken = action.payload.jwtToken; 
            state.jti = action.payload.jti;
        },
        logoutUser: () => {
            return initailSate;
        }
    }
})


export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;