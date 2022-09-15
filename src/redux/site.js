import { createSlice } from '@reduxjs/toolkit'
import { defaultState } from '../constants/data/default-state'

export const site = createSlice({
  name: 'site',
  initialState: {
    connection: false,
    intervals: [],
    data: defaultState
  },
  reducers: {
    setStateData: (state, action) => {
      state.data = action.payload
    },
    setConnectionState: (state, action) => {
      state.connection = action.payload
    }
  }
})

export const { setStateData, setConnectionState } = site.actions

export default site.reducer
