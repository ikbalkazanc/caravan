import { Box, VStack, Text, Button, HStack, Input, Radio, Checkbox } from 'native-base'
import * as React from 'react'
import { Pressable, StyleSheet, View, Modal, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { icons, svgs } from '../../constants/data/default-settings'
import { clearStorage, getSettings, setSettings } from '../../packages/storage'
import MyIcon from '../my-icon'
import { dark } from '../../constants/theme'
import { text } from '../../packages/i18n'
export default function ButtonSettingsModal({ code, isVisible, setModalVisible, initName, initIcon, triggerParentComponent, isDisabled, language }) {
  const [name, onChangeName] = React.useState(initName)
  const [disable, onChangeDisable] = React.useState(isDisabled)
  const [selectedIcon, onChangeIcon] = React.useState(initIcon)
  const save = () => {
    getSettings().then((settings) => {
      var currentButtonSettings = settings.buttons.find((x) => x.code == code)
      currentButtonSettings.name = name ? name : 'Button'
      currentButtonSettings.icon = selectedIcon
      currentButtonSettings.disable = disable
      setSettings(settings)
      setModalVisible(!isVisible)
      triggerParentComponent()
    })
  }
  const allIcons = icons.concat(svgs)
  const changeDisableStatus = (v) => {
    onChangeDisable(v)
  }
  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
        setModalVisible(!isVisible)
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ScrollView>
            <Text style={styles.modalText}>{language.text.title}</Text>
            <Box mb={'3%'}>
              <Text style={styles.sectionText}>{language.text.button_name} </Text>
              <Input variant='filled' w='100%' size='xl' py='0' value={name} onChange={(value) => onChangeName(value.nativeEvent.text)} />
            </Box>
            <Box>
              <Text style={styles.sectionText}>{language.text.button_icon_title} </Text>
              <Box width={'100%'} style={{ borderColor: 'black', borderWidth: 0.5 }} alignItems='center' mt={'2%'} mb={'3%'}>
                <MyIcon icon={selectedIcon} size={wp('25%')} width={wp('25%')} height={wp('25%')} color={dark.blue} />
              </Box>
              <Text mb={'2%'} style={styles.iconSelectDescription}>
                {language.text.description}
              </Text>
              <ScrollView style={styles.scroll}>
                {allIcons.map((i, key) => {
                  return (
                    <View
                      key={key}
                      onTouchEnd={() => onChangeIcon(i)}
                      style={{
                        backgroundColor: selectedIcon === i ? '#007acc' : '#EBEBEB',
                        paddingVertical: '0.8%',
                        borderBottomColor: 'gray',
                        borderBottomWidth: 1,
                        opacity: selectedIcon === i ? 1 : 0.6
                      }}
                    >
                      <Text style={{ color: selectedIcon === i ? 'white' : 'black', paddingHorizontal: '2%' }}>{language.icons[i.replace('-', '_')]}</Text>
                    </View>
                  )
                })}
              </ScrollView>
            </Box>
            <Box mt={'3%'}>
              <HStack>
                <VStack space={6}>
                  <Text style={styles.sectionText}>{language.text.disable_button} </Text>
                </VStack>
                <VStack space={6}>
                  <Checkbox onChange={changeDisableStatus} isChecked={disable} accessibilityLabel='This is a dummy checkbox' />
                </VStack>
              </HStack>
            </Box>
            <HStack mt={'5%'} justifyContent='space-between'>
              <VStack w={'45%'}>
                <Button colorScheme={'danger'} onPress={() => setModalVisible(!isVisible)}>
                  <Text style={{ color: 'white' }}>{language.text.close}</Text>
                </Button>
              </VStack>
              <VStack w={'45%'}>
                <Button colorScheme={'green'} onPress={save}>
                  <Text style={{ color: 'white' }}>{language.text.save}</Text>
                </Button>
              </VStack>
            </HStack>
          </ScrollView>
        </View>
      </View>
    </Modal>
  )
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: '4%',
    width: '90%'
  },
  scroll: { height: hp('20%'), paddingHorizontal: 5, backgroundColor: '#EBEBEB' },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: '#F194FF'
  },
  buttonClose: {
    backgroundColor: '#2196F3'
  },
  sectionText: {
    fontWeight: 'bold',
    fontSize: wp('3.8%')
  },
  modalText: {
    margin: '2%',
    fontWeight: 'bold',
    fontSize: wp('4.2%'),
    textAlign: 'center'
  },
  iconSelectDescription: {
    textAlign: 'center'
  }
})
