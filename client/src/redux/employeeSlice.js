import { createSlice } from '@reduxjs/toolkit';

export const employeeSlice = createSlice({
    name: 'employee',
    initialState: {
        employees: [],
    },
    reducers: {
        setEmployees: (state, {payload}) => {
            state.employees = payload
        },
        addEmployee: (state, {payload}) => {
            state.employees.push(payload)
        },
        updateEmployee: (state, {payload}) => {
            state.employees = state.employees.filter((e) => e.id === payload.id)
        },
        deleteEmployee: (state, {payload}) => {
            state.employees = state.employees.filter((e) => e.id !== payload.id)
        },
    },
})

export const {setEmployees, addEmployee, updateEmployee, deleteEmployee} = employeeSlice.actions

export default employeeSlice.reducer