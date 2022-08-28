import { Box } from 'native-base'
import * as React from 'react'
import { Text, StyleSheet } from 'react-native'
import { theme } from '../../packages/theme'
import TempForDarkSvg from '../../public/assets/svg/temperature-for-dark.svg'
import TempSvg from '../../public/assets/svg/temperature.svg'

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { text } from '../../packages/i18n'

export default function TemperatureMeasure({ value }) {
  const themes = theme()
  return (
    <Box
      justifyContent={'center'}
      alignItems='center'
      style={{ ...styles.container, borderColor: themes.color4 }}
      background={{
        linearGradient: {
          colors: [themes.color4, themes.color3],
          start: [0, 0],
          end: [1, 1]
        }
      }}
      flex={1}
    >
      {themes.status == 'dark' ? <TempForDarkSvg width='50%' height='50%' /> : <TempSvg width='50%' height='50%' />}
      <Text style={{ ...styles.pertenge, color: themes.text }}>{value ? value + ' °C' : '???'}</Text>
      <Text style={{ ...styles.desc, color: themes.blue }}>{text('measures.temperature')}</Text>
    </Box>
  )
}
const styles = StyleSheet.create({
  container: {
    borderRadius: wp('5%'),
    margin: wp('1%')
  },
  pertenge: {
    fontSize: wp('12%'),
    marginTop: wp('0.5%'),
    fontWeight: 'bold'
  },
  desc: {
    marginTop: -wp('3%'),
    fontSize: wp('4%')
  }
})
