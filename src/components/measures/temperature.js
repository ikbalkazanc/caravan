import { Box } from 'native-base'
import * as React from 'react'
import { Text, StyleSheet, Image } from 'react-native'
import { theme } from '../../packages/theme'
import TempForDarkSvg from '../../public/assets/svg/temperature-for-dark.svg'
import TempSvg from '../../public/assets/svg/temperature.svg'

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { text } from '../../packages/i18n'
import { normalizeWidth } from '../../packages/responsive'

export default function TemperatureMeasure({ value, size, style }) {
  const themes = theme()
  const sizeStyle = size ? { width: size, height: size } : {}
  return (
    <Box justifyContent={'center'} alignItems='center' style={{ ...styles.container, borderColor: themes.color4, ...style, ...sizeStyle }} background={themes.color3} flex={1}>
      <Image style={{ width: normalizeWidth('12%'), height: normalizeWidth('12%') }} source={require('../../public/sicak.png')} />

      <Text style={{ ...styles.pertenge, color: themes.text }}>{value ? value + ' °C' : '???'}</Text>
      <Text style={{ ...styles.desc, color: themes.text2 }}>{text('measures.temperature')}</Text>
    </Box>
  )
}
const styles = StyleSheet.create({
  container: {
    borderRadius: normalizeWidth('3%')
  },
  pertenge: {
    fontSize: normalizeWidth('12%', 0.5),
    fontWeight: 'bold'
  },
  desc: {
    fontSize: normalizeWidth('4%', 0.5)
  }
})
