import { Box, VStack, HStack } from 'native-base'
import * as React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { theme } from '../packages/theme'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
export default function KaanDesing() {
  const themes = theme()

  return (
    <Box style={{ width: '100%', height: '100%' }} justifyContent='space-evenly' alignItems={'center'} flex={1} flexDirection='row'>
      <Icon name='wifi' size={hp('10%')} color={themes.text} />
      <Text style={{ ...styles.title, color: themes.text }}>KAAN DESING</Text>
    </Box>
  )
}
const styles = StyleSheet.create({
  title: {
    fontSize: hp('5%'),
    fontWeight: 'bold',
    lineHeight: hp('6%'),
    textAlignVertical: 'center',
    textAlign: 'center'
  }
})
