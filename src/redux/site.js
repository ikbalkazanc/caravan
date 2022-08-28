import { createSlice } from '@reduxjs/toolkit'

export const site = createSlice({
  name: 'site',
  initialState: {
    lang: 'tr',
    dark: false,
    loading: false
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
    }
  }
})

export const { setLoadingCard, setDarkMode, setLanguage } = site.actions

export default site.reducer
