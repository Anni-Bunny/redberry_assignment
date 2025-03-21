import { configureStore } from '@reduxjs/toolkit'
import employeesReducer from './slices/employeesSlice'

export const store = configureStore({
    reducer: {
        employees: employeesReducer,
    },
})

// These types help with TypeScript throughout the app
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
