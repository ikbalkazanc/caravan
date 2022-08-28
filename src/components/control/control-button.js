import * as React from 'react'
import { Text, StyleSheet } from 'react-native'
import { theme } from '../../packages/theme'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Center, View } from 'native-base'

export default function ControlButton({ state, icon, code, callback }) {
  const themes = theme()
  const stateColor = state ? 'lawngreen' : 'red'

  return (
    <Center h={wp('30%')} w={wp('30%')} bg={themes.color3} rounded='md' shadow={3} style={styles.button}>
      <Text style={{ ...styles.label, color: themes.blue }}>Işık 1</Text>
      <Icon name={icon} size={wp('15%')} color={themes.blue} />
      <View style={{ ...styles.indicator, backgroundColor: stateColor }}></View>
    </Center>
  )
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: wp('5%')
  },
  indicator: {
    marginTop: '10%',
    height: wp('1.7%'),
    backgroundColor: 'red',
    width: '80%',
    borderRadius: wp('3%'),
    bottom: 0
  },
  label: {}
})
