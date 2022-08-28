import * as React from 'react'
import { Box, NativeBaseProvider } from 'native-base'
import { Dimensions, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import { text, TEXT } from '../../packages/i18n'
import { useDispatch } from 'react-redux'
import { setLoadingCard } from '../../redux/site'

var { height, width } = Dimensions.get('window')

export function LoadingCard() {
  const dispacher = useDispatch()
  return (
    <View
      style={{
        width: width,
        height: height,
        backgroundColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        position: 'absolute',
        alignContent: 'center',
        alignSelf: 'center'
      }}
    >
      <View style={{ backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: 20, padding: height * 0.1 }}>
        <Text>Yükleniyor</Text>
        <Text style={{ color: '#FFFFFF', marginTop: 10, textAlign: 'center' }}>{text('loading')}</Text>
        <TouchableOpacity
          onPress={() => {
            dispacher(setLoadingCard(false))
          }}
        >
          <Text style={{ color: '#006ee6', textAlign: 'center' }}>{text('cancel')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
