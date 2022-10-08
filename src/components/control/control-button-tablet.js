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
import { normalizeWidth } from '../../packages/responsive'
import { LAST_DATA_EDITED } from '../../packages/state'

export default function ControlTabletButton({ state, icon, name, code, isDisabled, triggerParentComponent, callback }) {
  const [modalVisible, setModalVisible] = useState(false)
  const [____, updateState] = React.useState()
  var flag = React.useRef(false)
  if (flag.current) {
    state = !state
    flag.current = false
  }
  const forceUpdate = React.useCallback(() => {
    updateState({})
  }, [])
  const themes = theme()
  const stateColor = () => (state ? 'lawngreen' : 'red')
  const currentIcon = icon ? icon : 'assistant-photo'
  const closeText = text('close')
  const iconsTexts = text('icons')
  const modalTexts = text('button_settings_modal')

  const calculateColor = () => {
    if (isDisabled) {
      return themes.color3
    }
    return state ? themes.color3 : themes.color4
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
        delayLongPress={2000}
        onPress={() => {
          const willState = !state ? '1' : '0'
          callback(code, willState).then((isSuccess) => {
            if (isSuccess) {
              LAST_DATA_EDITED.value = true
              flag.current = true
              forceUpdate()
            }
          })
        }}
      >
        <Center style={styles.container} h={wp('12%')} w={wp('12%')} bg={calculateColor()} rounded='md' shadow={3}>
          {isDisabled ? (
            <>
              <Text style={{ ...styles.label, color: themes.text }}>{closeText}</Text>
              <Icon name={'close'} size={wp('6%')} color={themes.color4} />
            </>
          ) : (
            <>
              <Text style={{ ...styles.label, color: themes.text }}>{name}</Text>
              <MyIcon icon={currentIcon} size={wp('6%')} width={wp('6%')} height={wp('6%')} color={themes.blue} />
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
    padding: normalizeWidth('1%')
  },
  indicator: {
    marginTop: '10%',
    height: normalizeWidth('1.6%'),
    backgroundColor: 'red',
    width: '60%',
    borderRadius: normalizeWidth('3%'),
    bottom: 0
  },
  label: {
    fontSize: normalizeWidth('2.8%')
  }
})
