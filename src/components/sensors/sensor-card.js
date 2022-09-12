import { Box, VStack, Text, HStack } from 'native-base'
import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { theme } from '../../packages/theme'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { text } from '../../packages/i18n'
import { useState } from 'react'

export default function SensorCard({ status, title, style, icon }) {
  const themes = theme()
  const colorStatus = status ? 'red' : 'lawngreen'
  const DANGER_COLOR = '#AB4B4B'

  return (
    <Box style={{ ...styles.container, ...style }} background={status ? DANGER_COLOR : themes.color3} flex={1} flexDirection='row'>
      <View style={styles.icon}>
        <Icon name={icon} size={wp('25%')} color={themes.blue} />
      </View>
      <Box width={wp('55%')} justifyContent={'center'}>
        <Text style={{ ...styles.title, color: themes.text }}>{title}</Text>
        <View style={{ ...styles.indicator, backgroundColor: colorStatus }}></View>
      </Box>
    </Box>
  )
}
const styles = StyleSheet.create({
  container: {
    borderRadius: wp('3%'),
    width: '100%'
  },
  icon: {
    marginVertical: wp('6%'),
    marginHorizontal: wp('3%')
  },
  indicator: {
    marginTop: '10%',
    height: wp('1.7%'),
    width: '100%',
    borderRadius: wp('3%'),
    bottom: 0
  },
  title: {
    fontSize: wp('6%'),
    lineHeight: wp('6%')
  }
})
