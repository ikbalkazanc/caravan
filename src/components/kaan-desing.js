import { Box, VStack, HStack } from 'native-base'
import * as React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { theme } from '../packages/theme'
import Logo from '../public/assets/svg/logo2.svg'
import LogoWhite from '../public/assets/svg/logo2-white.svg'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
export default function KaanDesing() {
  const themes = theme()
  const getLogo = () => {
    return themes.status == 'dark' ? <LogoWhite width={hp('13%')} height={hp('13%')} /> : <Logo width={hp('13%')} height={hp('13%')} />
  }
  const getColor = () => {
    return themes.status == 'dark' ? themes.text : '#003366'
  }
  const getImage = () => {
    return <Image style={{ width: hp('10%'), height: hp('10%') }} source={require('../public/deepsea.jpg')} />
  }
  return (
    <Box style={{ width: '100%', height: '100%' }} justifyContent='space-evenly' alignItems={'center'} flex={1} flexDirection='row'>
      {getImage()}
      <Text style={{ ...styles.title, color: getColor() }}>KAAN DESIGN</Text>
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
