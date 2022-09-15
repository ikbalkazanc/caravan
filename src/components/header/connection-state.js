import { Box } from 'native-base'
import * as React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { theme } from '../../packages/theme'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { text } from '../../packages/i18n'
import { normalizeWidth } from '../../packages/responsive'

export default function ConnectionState({ value }) {
  const themes = theme()
  const customThemeGreen = themes.status === 'dark' ? 'chartreuse' : 'green'
  return (
    <View style={styles.container}>
      <Text style={{ ...styles.text, color: themes.text }}>{value ? text('connected') : text('notConnected')}</Text>
      <View style={{ ...styles.circle, backgroundColor: value ? customThemeGreen : 'red' }}></View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: normalizeWidth('3%')
  },
  text: {
    marginRight: normalizeWidth('2%'),
    fontSize: normalizeWidth('4%')
  },
  circle: {
    width: normalizeWidth('5.4%'),
    height: normalizeWidth('5.4%'),
    borderRadius: 100,
    backgroundColor: 'red'
  }
})
