import { Box } from 'native-base'
import * as React from 'react'
import { Text, StyleSheet } from 'react-native'
import { theme } from '../../packages/theme'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { text } from '../../packages/i18n'

export default function BatteryMeasure({ value }) {
  const themes = theme()
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
    <Box justifyContent={'center'} alignItems='center' style={{ ...styles.container, borderColor: themes.color4 }} background={themes.color3} flex={1}>
      <Icon name='battery-charging-full' size={wp('25%')} color={calculateColor()} />
      <Text style={{ ...styles.pertenge, color: themes.text }}>{value ? value + ' V' : '???'}</Text>
      <Text style={{ ...styles.desc, color: themes.text2 }}>{text('measures.battery')}</Text>
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
    marginTop: -wp('2%'),
    fontWeight: 'bold'
  },
  desc: {
    marginTop: -wp('3%'),
    fontSize: wp('4%')
  }
})
