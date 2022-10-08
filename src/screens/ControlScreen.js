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
import { normalizeWidth } from '../packages/responsive'
import { isTablet } from '../packages/device-info'
import ControlTabletButton from '../components/control/control-button-tablet'

const config = {
  dependencies: {
    'linear-gradient': require('react-native-linear-gradient').default
  }
}
const bg = (themes) => {
  return {
    linearGradient: {
      colors: [themes.status == 'dark' ? themes.color4 : themes.custom1, themes.color3],
      start: [0, 0],
      end: [1, 1]
    }
  }
}

const sortButtons = (buttons) => {
  const disableButtons = buttons.filter((x) => x.disable)
  const activeButtons = buttons.filter((x) => !x.disable).sort((x) => x.order)
  return activeButtons.concat(disableButtons)
}
var forceUpdate = () => {}

export { forceUpdate }

export default function ControlScreen() {
  const themes = theme()
  const site = useSelector((state) => state.site)
  const [buttons, setButtons] = React.useState(null)
  const [state, updateState] = React.useState()
  forceUpdate = React.useCallback(() => {
    updateState({})
  }, [])

  const desc = text('control_desc')
  React.useEffect(() => {
    getSettings().then((settings) => {
      setButtons(settings.buttons)
    })
  }, [state, buttons])

  const clickButton = async (code, state) => {
    return await StateService.setPinState(code, state)
  }

  const renderButton = (button, key) => {
    if (!site.data.buttons) {
      return <View key={key}></View>
    }

    const value = site.data.buttons[button.order - 1] ? site.data.buttons[button.order - 1] : false
    if (isTablet()) {
      return (
        <Box key={key} style={{ width: '20%' }} p={2}>
          <ControlTabletButton
            triggerParentComponent={forceUpdate}
            callback={clickButton}
            id={button.id}
            state={value}
            name={button.name}
            isDisabled={button.disable}
            icon={button.icon}
            code={button.code}
          />
        </Box>
      )
    }

    return (
      <View key={key} style={{ width: '33%', padding: '2%' }}>
        <ControlButton triggerParentComponent={forceUpdate} callback={clickButton} id={button.id} state={value} name={button.name} isDisabled={button.disable} icon={button.icon} code={button.code} />
      </View>
    )
  }
  return (
    <NativeBaseProvider config={config}>
      <SafeAreaView>
        <Box background={isTablet() ? {} : bg(themes)} style={{ height: '100%' }}>
          {site.connection ? (
            <ScrollView>
              <Box mt={normalizeWidth('2%')} p={1} style={styles.categoryItems}>
                {buttons ? (
                  sortButtons(buttons).map((button, key) => {
                    return renderButton(button, key)
                  })
                ) : (
                  <></>
                )}
              </Box>
              <Text mb={normalizeWidth('2%')} color={themes.text} justifyContent={'center'} alignSelf='center'>
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
    marginTop: normalizeWidth('1%')
  }
})
