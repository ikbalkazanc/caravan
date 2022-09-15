import { Dimensions, Platform, PixelRatio } from 'react-native'
import { isTablet } from './device-info'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320

export function normalizeWidth(size, rateInTablet) {
  if (isTablet()) {
    const rate = rateInTablet ? rateInTablet : 0.8
    return hp(size) * rate
  }

  return wp(size)
}

export function normalizeHeigth(size, rateInTablet) {
  if (isTablet()) {
    const rate = rateInTablet ? rateInTablet : 0.8
    return wp(size) * rate
  }

  return hp(size)
}
