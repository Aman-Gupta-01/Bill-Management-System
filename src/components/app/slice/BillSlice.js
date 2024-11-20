import { createSlice } from '@reduxjs/toolkit'

export const BillData = createSlice({
    name: 'Bill',
    initialState: {
        userBill: []
    },
    reducers: {
        addBill: (state, action)=>{
            state.userBill.push(action.payload);
        },
        removeRaw: (state, action) => {
            state.userBill = state.userBill.filter((_, index)=>index !== action.payload)
        }
    }
})

export const {addBill, removeRaw} = BillData.actions;
export default BillData.reducer;