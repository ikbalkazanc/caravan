import { createSlice } from '@reduxjs/toolkit'
import { defaultState } from '../constants/data/default-state'

export const site = createSlice({
  name: 'site',
  initialState: {
    loading: false,
    connection: false,
    intervals: [],
    data: defaultState
  },
  reducers: {
    setLoadingCard: (state, action) => {
      state.loading = action.payload
    },
    setStateData: (state, action) => {
      state.data = action.payload
    },
    setConnectionState: (state, action) => {
      state.connection = action.payload
    }
  }
})

export const { setLoadingCard, setStateData, setConnectionState } = site.actions

export default site.reducer
