import {configureStore} from '@reduxjs/toolkit'
import homeworkReducer from '../features/HomeworkSlice'

export const Store = configureStore({
    reducer: homeworkReducer
})