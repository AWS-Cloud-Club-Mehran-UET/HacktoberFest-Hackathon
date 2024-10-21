import { configureStore } from "@reduxjs/toolkit";
import homeworkReducer from "./homeworkSlice";

const store = configureStore({
    reducer: homeworkReducer
});

export default store;