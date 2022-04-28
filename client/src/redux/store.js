import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from '../redux/employeeSlice'

export default configureStore({
    reducer: {
       employeeStore: employeeReducer, 
    },
})