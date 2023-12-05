import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: null,
    email: null,
    message: null
};

const contactSlice = createSlice({
    name: "contact",
    initialState,
    reducers: {
        setContactData: (state, action) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.message = action.payload.message;
        },
        clearContactData: (state) => {
            state.name = null;
            state.email = null;
            state.message = null;
        }
    }
});

export const { setContactData, clearContactData } = contactSlice.actions;

export default contactSlice.reducer;
