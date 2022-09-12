import { Box, Center, HStack, Container, NativeBaseProvider, VStack, Text } from 'native-base'
import * as React from 'react'
import { View, ScrollView, SafeAreaView, StyleSheet } from 'react-native'
import BatteryMeasure from '../components/measures/battery'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { theme } from '../packages/theme'
import { ScreenContainer } from 'react-native-screens'
import Icon from 'react-native-vector-icons/MaterialIcons'
import ControlButton from '../components/control/control-button'
import { buttons, defaultButtons } from '../constants/data/default-settings'
import { useSelector } from 'react-redux'
import HasNoConnection from '../components/has-no-connection'
import { clearStorage, getSettings } from '../packages/storage'
import StateService from '../api/StateService'
import { text } from '../packages/i18n'

const config = {
  dependencies: {
    'linear-gradient': require('react-native-linear-gradient').default
  }
}

export default function ControlScreen() {
  const themes = theme()
  const site = useSelector((state) => state.site)
  const [buttons, setButtons] = React.useState(null)
  const [state, updateState] = React.useState()
  const forceUpdate = React.useCallback(() => updateState({}), [])
  const desc = text('control_desc')
  React.useEffect(() => {
    getSettings().then((settings) => {
      setButtons(settings.buttons)
    })
  }, [state])

  const clickButton = async (code, state) => {
    await StateService.setPinState(code, state)
  }

  const renderButton = (button, key) => {
    const value = site.data.buttons[button.order - 1] ? site.data.buttons[button.order - 1] : false
    return (
      <View key={key} style={{ width: '33%', padding: '2%' }}>
        <ControlButton triggerParentComponent={forceUpdate} callback={clickButton} id={button.id} state={value} name={button.name} isDisabled={button.disable} icon={button.icon} code={button.code} />
      </View>
    )
  }
  return (
    <NativeBaseProvider config={config}>
      <SafeAreaView>
        <Box
          background={{
            linearGradient: {
              colors: [themes.color4, themes.color3],
              start: [0, 0],
              end: [1, 1]
            }
          }}
          style={{ height: '100%' }}
        >
          {site.connection ? (
            <ScrollView>
              <Box mt={wp('2%')} p={1} style={styles.categoryItems}>
                {buttons ? (
                  [...buttons]
                    .sort((a, b) => {
                      if (a.disable) {
                        return a - b
                      }
                      if (b.disable) {
                        return b - a
                      }
                      return a.order > b.order ? 1 : -1
                    })
                    .map((button, key) => {
                      return renderButton(button, key)
                    })
                ) : (
                  <></>
                )}
              </Box>
              <Text mb={wp('2%')} color={themes.text} justifyContent={'center'} alignSelf='center'>
                {desc}
              </Text>
            </ScrollView>
          ) : (
            <HasNoConnection />
          )}
        </Box>
      </SafeAreaView>
    </NativeBaseProvider>
  )
}

const styles = StyleSheet.create({
  categoryItems: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: wp('1%')
  }
})
