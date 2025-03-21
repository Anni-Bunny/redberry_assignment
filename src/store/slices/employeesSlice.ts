import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {Employee} from "../../interfaces/employee.ts";

interface employeesSliceInterface {
    data: Employee[]
}

const initialState: employeesSliceInterface = {
    data: []
}

export const employeesSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        clearEmployees: () => initialState,
        addEmployee: (state, action: PayloadAction<Employee>) => {
            state.data.push(action.payload)
        },
        loadEmployees: (state, action: PayloadAction<Employee[]>) => {
            state.data = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const {clearEmployees, addEmployee, loadEmployees} = employeesSlice.actions

export default employeesSlice.reducer