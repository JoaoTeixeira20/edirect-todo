import { createSlice } from '@reduxjs/toolkit'

const counter = createSlice({
    name: 'counter',
    initialState: 2,
    reducers: {
        increment: (state) => state + 1,
        decrement: (state) => state - 1,
    }
})

export const getCount = (state) => state.counter

export default counter;
