import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import expenseReducer from './expenseSlice';

const store = configureStore({
    reducer: {
        auth:authSlice,
        expense:expenseReducer,
    }
});

export default store;