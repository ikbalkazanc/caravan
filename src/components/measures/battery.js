import { Box } from 'native-base'
import * as React from 'react'
import { Text, StyleSheet } from 'react-native'
import { theme } from '../../packages/theme'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { text } from '../../packages/i18n'
import { normalizeWidth } from '../../packages/responsive'

export default function BatteryMeasure({ value, size, style }) {
  const themes = theme()
  const sizeStyle = size ? { width: size, height: size } : {}

  const calculateColor = () => {
    if (value > 12.7) {
      return 'chartreuse'
    }

    if (value > 10.5) {
      return 'yellow'
    }

    if (value > 0) {
      return 'red'
    }

    return 'black'
  }

  return (
    <Box justifyContent={'center'} alignItems='center' style={{ ...styles.container, borderColor: themes.color4, ...style, ...sizeStyle }} background={themes.color3} flex={1}>
      <Icon name='battery-charging-full' size={normalizeWidth('12%')} color={calculateColor()} />
      <Text style={{ ...styles.pertenge, color: themes.text }}>{value ? value + ' V' : '???'}</Text>
      <Text style={{ ...styles.desc, color: themes.text2 }}>{text('measures.battery')}</Text>
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
