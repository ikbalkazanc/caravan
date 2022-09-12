import { Box } from 'native-base'
import * as React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { theme } from '../packages/theme'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { text } from '../packages/i18n'
import { icons } from '../constants/data/default-settings'
import Airwent from '../public/assets/svg/air.svg'
import Fridge from '../public/assets/svg/fridge.svg'
import Heater from '../public/assets/svg/heater.svg'
import Water from '../public/assets/svg/water-drop-blue-theme.svg'
import Toilet from '../public/assets/svg/toilet.svg'
import { clearStorage } from '../packages/storage'

export default function MyIcon({ icon, size, color, width, height }) {
  const isSvg = !icons.some((x) => x === icon)
  if (isSvg) {
    return getSvg(icon, width, height)
  }
  return <Icon name={icon} size={size ? size : wp('50%')} color={color ? color : 'red'} />
}

const getSvg = (icon, width, height) => {
  if (icon === 'air') {
    return <Airwent width={width ? width : '100%'} height={height ? height : '100%'} />
  }

  if (icon === 'fridge') {
    return <Fridge width={width ? width : '100%'} height={height ? height : '100%'} />
  }

  if (icon === 'heater') {
    return <Heater width={width ? width : '100%'} height={height ? height : '100%'} />
  }

  if (icon === 'drop') {
    return <Water width={width ? width : '100%'} height={height ? height : '100%'} />
  }

  if (icon === 'toilet') {
    return <Toilet width={width ? width : '100%'} height={height ? height : '100%'} />
  }
  return <></>
}
