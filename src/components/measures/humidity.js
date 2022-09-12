import { Box } from 'native-base'
import * as React from 'react'
import { Text, StyleSheet } from 'react-native'
import { theme } from '../../packages/theme'
import HumiditySvg from '../../public/assets/svg/humidity'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { text } from '../../packages/i18n'

export default function BatteryMeasure({ value }) {
  const themes = theme()
  return (
    <Box justifyContent={'center'} alignItems='center' style={{ ...styles.container, borderColor: themes.color4 }} background={themes.color3} flex={1}>
      <HumiditySvg width='48%' height='48%' />
      <Text style={{ ...styles.pertenge, color: themes.text }}>{value ? value + ' %' : '???'}</Text>
      <Text style={{ ...styles.desc, color: themes.text2 }}>{text('measures.humidity')}</Text>
    </Box>
  )
}
const styles = StyleSheet.create({
  container: {
    borderRadius: wp('3%'),
    margin: wp('1%')
  },
  pertenge: {
    fontSize: wp('12%'),
    marginTop: wp('1%'),
    fontWeight: 'bold'
  },
  desc: {
    marginTop: -wp('3%'),
    fontSize: wp('4%')
  }
})
