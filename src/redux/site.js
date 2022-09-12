import { createSlice } from '@reduxjs/toolkit'
import { defaultState } from '../constants/data/default-state'

export const site = createSlice({
  name: 'site',
  initialState: {
    lang: 'tr',
    dark: false,
    loading: false,
    connection: false,
    intervals: [],
    data: defaultState
  },
  reducers: {
    setDarkMode: (state, action) => {
      state.dark = action.payload
    },
    setLanguage: (state, action) => {
      state.lang = action.payload
    },
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

export const { setLoadingCard, setDarkMode, setLanguage, setStateData, setConnectionState } = site.actions

export default site.reducer
