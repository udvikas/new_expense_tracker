import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import expenseReducer from "./expenseSlice";
import themeReducer from "./themeSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    expense: expenseReducer,
    theme: themeReducer,
  },
});

export default store;
