import { configureStore } from '@reduxjs/toolkit'
import billReducer from './slice/BillSlice'

export const store = configureStore({
  reducer: {
    billReducer,
  },
})