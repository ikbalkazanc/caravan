import { Box } from 'native-base'
import * as React from 'react'
import { Text, StyleSheet } from 'react-native'
import { theme } from '../../packages/theme'
import HumiditySvg from '../../public/assets/svg/humidity'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { text } from '../../packages/i18n'
import { normalizeWidth } from '../../packages/responsive'

export default function HumidityMeasure({ value, size, style }) {
  const themes = theme()
  const sizeStyle = size ? { width: size, height: size } : {}

  return (
    <Box justifyContent={'center'} alignItems='center' style={{ ...styles.container, borderColor: themes.color4, ...style, ...sizeStyle }} background={themes.color3}>
      <HumiditySvg width={normalizeWidth('18%', 0.5)} height={normalizeWidth('18%', 0.5)} />
      <Text style={{ ...styles.pertenge, color: themes.text }}>{value ? value + ' %' : '???'}</Text>
      <Text style={{ ...styles.desc, color: themes.text2 }}>{text('measures.humidity')}</Text>
    </Box>
  )
}
const styles = StyleSheet.create({
  container: {
    borderRadius: normalizeWidth('3%')
  },
  pertenge: {
    fontSize: normalizeWidth('12%', 0.3),
    fontWeight: 'bold'
  },
  desc: {
    fontSize: normalizeWidth('4%', 0.5)
  }
})
