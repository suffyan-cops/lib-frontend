import { createSlice } from "@reduxjs/toolkit";

/* eslint-disable */
const initialState ={
    isOPenModal : false
}
export const modalSlice = createSlice({
    name :"modal",
    initialState :initialState,
    reducers :{
        changeModalState : (state, action) =>{
                state.isOPenModal = !state.isOPenModal;
        }
    }
})


export const { changeModalState } = modalSlice.actions;
export default modalSlice.reducer;