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
      <Box style={styles.icon} justifyContent='center'>
        <Icon name={icon} size={normalizeWidth('7%')} color={themes.blue} />
      </Box>
      <Box width={normalizeWidth('55%')} justifyContent={'center'} alignContent={'center'} alignSelf={'center'} flex={1}>
        <Text style={{ ...styles.title, color: themes.text }}>{title}</Text>
      </Box>
    </Box>
  )
}
const styles = StyleSheet.create({
  container: {
    borderRadius: normalizeWidth('3%')
  },
  icon: {
    marginHorizontal: normalizeWidth('3%')
  },
  title: {
    textAlignVertical: 'center',
    fontSize: normalizeWidth('2.3%'),
    lineHeight: normalizeWidth('3%'),
    height: '100%',
    maxWidth: '35%'
  }
})
