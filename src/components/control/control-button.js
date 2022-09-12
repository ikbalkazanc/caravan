import * as React from 'react'
import { Text, StyleSheet, TouchableOpacity, Modal, Pressable } from 'react-native'
import { theme } from '../../packages/theme'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Center, View } from 'native-base'
import { useState } from 'react'
import ButtonSettingsModal from '../modal/button-settings-modal'
import MyIcon from '../my-icon'
import { clearStorage } from '../../packages/storage'
import { text } from '../../packages/i18n'

export default function ControlButton({ state, icon, name, code, isDisabled, triggerParentComponent, callback }) {
  const [modalVisible, setModalVisible] = useState(false)
  const [currentState, setState] = useState(state)
  const themes = theme()
  const stateColor = () => (currentState ? 'red' : 'lawngreen')
  const currentIcon = icon ? icon : 'assistant-photo'
  const closeText = text('close')
  const iconsTexts = text('icons')
  const modalTexts = text('button_settings_modal')

  const calculateColor = () => {
    if (isDisabled) {
      return themes.color3
    }
    return currentState ? themes.color3 : themes.color4
  }

  return (
    <>
      {modalVisible ? (
        <ButtonSettingsModal
          isDisabled={isDisabled}
          code={code}
          isVisible={modalVisible}
          initName={name}
          initIcon={icon}
          setModalVisible={setModalVisible}
          triggerParentComponent={triggerParentComponent}
          language={{ icons: iconsTexts, text: modalTexts }}
        />
      ) : (
        <></>
      )}

      <TouchableOpacity
        onLongPress={() => {
          setModalVisible(true)
        }}
        onPress={() => {
          const willState = !currentState ? '1' : '0'
          callback(code, willState).then(() => {
            setState(!currentState)
          })
        }}
      >
        <Center style={styles.container} h={wp('30%')} w={wp('30%')} bg={calculateColor()} rounded='md' shadow={3}>
          {isDisabled ? (
            <>
              <Text style={{ ...styles.label, color: themes.blue }}>{closeText}</Text>
              <Icon name={'close'} size={wp('15%')} color={themes.color4} />
            </>
          ) : (
            <>
              <Text style={{ ...styles.label, color: themes.blue }}>{name}</Text>
              <MyIcon icon={currentIcon} size={wp('15%')} width={wp('15%')} height={wp('15%')} color={themes.blue} />
              <View style={{ ...styles.indicator, backgroundColor: stateColor() }}></View>
            </>
          )}
        </Center>
      </TouchableOpacity>
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    padding: wp('1%')
  },
  indicator: {
    marginTop: '10%',
    height: wp('1.7%'),
    backgroundColor: 'red',
    width: '80%',
    borderRadius: wp('3%'),
    bottom: 0
  }
})
