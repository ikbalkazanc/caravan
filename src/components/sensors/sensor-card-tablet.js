import { Box, VStack, Text, HStack } from 'native-base'
import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { theme } from '../../packages/theme'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { text } from '../../packages/i18n'
import { useState } from 'react'
import { normalizeWidth } from '../../packages/responsive'

export default function SensorTabletCard({ status, title, style, icon }) {
  const themes = theme()
  const colorStatus = status ? 'red' : 'lawngreen'
  const DANGER_COLOR = '#AB4B4B'

  return (
    <Box style={{ ...styles.container, ...style }} background={status ? DANGER_COLOR : themes.color3} flexDirection='row'>
      <View style={styles.icon}>
        <Icon name={icon} size={normalizeWidth('12%')} color={themes.blue} />
      </View>
      <Box width={normalizeWidth('55%')} justifyContent={'center'}>
        <Text style={{ ...styles.title, color: themes.text }}>{title}</Text>
        <View style={{ ...styles.indicator, backgroundColor: colorStatus }}></View>
      </Box>
    </Box>
  )
}
const styles = StyleSheet.create({
  container: {
    borderRadius: normalizeWidth('3%')
  },
  icon: {
    marginVertical: normalizeWidth('6%'),
    marginHorizontal: normalizeWidth('3%')
  },
  indicator: {
    position: 'absolute',
    marginBottom: '5%',
    height: normalizeWidth('1.4%'),
    width: '90%',
    borderRadius: normalizeWidth('3%'),
    bottom: 0
  },
  title: {
    top: '10%',
    fontSize: normalizeWidth('4%'),
    lineHeight: normalizeWidth('6%'),
    height: '100%',
    maxWidth: '80%'
  }
})
