import { useSelector } from 'react-redux'
import { dark, light } from '../constants/theme'

export const theme = () => {
  const state = useSelector((state) => state.site)
  if (state.dark) {
    return dark
  }
  return light
}
