import { configureStore } from "@reduxjs/toolkit"
import vulnerabilityReducer from '@/features/vulnerabilities/vulnerabilitySlice'
import dashboardReducer from '@/features/dashboard/dashboardSlice'

export const store = configureStore({
  reducer: {
    vulnerabilities: vulnerabilityReducer,
    dashboard: dashboardReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch