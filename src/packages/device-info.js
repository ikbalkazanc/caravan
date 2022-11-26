import { Dimensions, PixelRatio } from 'react-native'
import DeviceInfo from 'react-native-device-info'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

var isTabletCache = undefined

export const isTablet = () => {
  if (isTabletCache) {
    return isTabletCache
  }

  isTabletCache = DeviceInfo.isTablet()

  return isTabletCache
}
