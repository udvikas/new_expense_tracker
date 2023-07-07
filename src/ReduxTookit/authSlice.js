import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
    isAuthenticated:localStorage.getItem('tokenID') ? true : false,
    token: "",
    email: "",
}
const authSlice = createSlice({
    name: 'authentication',
    initialState:initialAuthState,
    reducers: {
        login (state, action) {
            state.isAuthenticated = true
            const token = action.payload.tokenID
            const email = action.payload.email
            localStorage.setItem('tokenID', token);
            localStorage.setItem('email', email);
        },
        logout (state) {
            state.isAuthenticated = false
            localStorage.removeItem("tokenID");
            localStorage.removeItem("email");
        },
    },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;