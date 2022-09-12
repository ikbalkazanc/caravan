import { Box } from 'native-base'
import * as React from 'react'
import { Text, StyleSheet } from 'react-native'
import { theme } from '../packages/theme'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { text } from '../packages/i18n'

export default function HasNoConnection() {
  const themes = theme()

  return (
    <Box justifyContent={'center'} alignItems='center' flex={1}>
      <Icon name='wifi-off' size={wp('50%')} color='grey' />
      <Text style={{ ...styles.text, color: themes.text }}>{text('noConnectionPage.text')}</Text>
      <Text style={{ ...styles.desc, color: themes.text2 }}>{text('noConnectionPage.description')}</Text>
    </Box>
  )
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  },
  text: {
    fontSize: wp('6%'),
    fontWeight: '700'
  },
  description: {}
})
