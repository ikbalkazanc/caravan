import { Dimensions, PixelRatio } from 'react-native'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

var isTabletCache = undefined

export const isTablet = () => {
  if (isTabletCache) {
    return isTabletCache
  }

  let pixelDensity = PixelRatio.get()
  const adjustedWidth = windowWidth * pixelDensity
  const adjustedHeight = windowHeight * pixelDensity
  if (pixelDensity < 2 && (adjustedWidth >= 1000 || adjustedHeight >= 1000)) {
    isTabletCache = true
    return true
  } else {
    isTabletCache = pixelDensity === 2 && (adjustedWidth >= 1920 || adjustedHeight >= 1920)

    return isTabletCache
  }
}
