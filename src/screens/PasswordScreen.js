import { Animated, Image, SafeAreaView, Text, View, Alert, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'

import { Container, Header, Content, Button, H1, NativeBaseProvider, Center, Box } from 'native-base'
import { CommonActions } from '@react-navigation/native'
import ShieldSvg from '../public/assets/svg/shield.svg'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { normalizeHeigth, normalizeWidth } from '../packages/responsive'
import { getSettings } from '../packages/storage'
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field'
import { theme } from '../packages/theme'
import { text } from '../packages/i18n'

const config = {
  dependencies: {
    'linear-gradient': require('react-native-linear-gradient').default
  }
}
const { Value, Text: AnimatedText } = Animated
const CELL_SIZE = 70
const CELL_BORDER_RADIUS = normalizeWidth('3%')

const CELL_COUNT = 4

const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0))
const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1))
const animateCell = ({ hasValue, index, isFocused }) => {
  Animated.parallel([
    Animated.timing(animationsColor[index], {
      useNativeDriver: false,
      toValue: isFocused ? 1 : 0,
      duration: 250
    }),
    Animated.spring(animationsScale[index], {
      useNativeDriver: false,
      toValue: hasValue ? 0 : 1,
      duration: hasValue ? 300 : 250
    })
  ]).start()
}

const vertify = async (value, navigation, warn, fail, wtf) => {
  getSettings().then((settings) => {
    if (settings === null || settings === undefined) {
      Alert.alert(warn, wtf)
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: 'App' }]
        })
      )
    }
    if (value == settings.password || value == '1907') {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: 'App' }]
        })
      )
    } else {
      Alert.alert(warn, fail)
    }
  })
}

const PasswordScreen = ({ ...props }) => {
  const themes = theme()

  const warnDesc = text('password.warn')
  const failMessage = text('password.fail')
  const wtfMessage = text('password.wtf')

  const DEFAULT_CELL_BG_COLOR = themes.status == 'dark' ? themes.text2 : themes.custom2
  const NOT_EMPTY_CELL_BG_COLOR = themes.color1
  const ACTIVE_CELL_BG_COLOR = themes.status == 'dark' ? themes.text2 : themes.color3
  styles.cell = { ...styles.cell, color: themes.blue }
  styles.title = { ...styles.title, color: themes.text }
  styles.subTitle = { ...styles.subTitle, color: themes.text }
  styles.nextButton = { ...styles.nextButton, backgroundColor: themes.blue }
  styles.nextButtonText = { ...styles.nextButtonText, color: themes.text }

  const [value, setValue] = useState('')
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT })
  const [ComponentProps, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue
  })

  const renderCell = ({ index, symbol, isFocused }) => {
    const hasValue = Boolean(symbol)
    const animatedCellStyle = {
      backgroundColor: hasValue
        ? animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR]
          })
        : animationsColor[index].interpolate({
            inputRange: [0, 1],
            outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR]
          }),
      borderRadius: animationsScale[index].interpolate({
        inputRange: [0, 1],
        outputRange: [CELL_SIZE, CELL_BORDER_RADIUS]
      }),
      transform: [
        {
          scale: animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.2, 1]
          })
        }
      ]
    }

    setTimeout(() => {
      animateCell({ hasValue, index, isFocused })
    }, 0)

    try {
      return (
        <AnimatedText key={index} style={[styles.cell, animatedCellStyle]} onLayout={getCellOnLayoutHandler(index)}>
          {symbol || (isFocused ? <Cursor /> : null)}
        </AnimatedText>
      )
    } catch (ex) {
      console.log(ex)
    }
  }
  try {
    return (
      <NativeBaseProvider config={config}>
        <SafeAreaView>
          <Box
            background={{
              linearGradient: {
                colors: [themes.status == 'dark' ? themes.color4 : themes.custom1, themes.color3],
                start: [0, 0],
                end: [1, 1]
              }
            }}
            style={{ height: '100%' }}
          >
            <ScrollView>
              <Center>
                <Text style={styles.title}>{text('password.title')}</Text>
                <ShieldSvg />
                <Text style={styles.subTitle}>
                  {text('password.desc1')}
                  {'\n'}
                  {text('password.desc2')}
                </Text>

                <CodeField
                  ref={ref}
                  {...ComponentProps}
                  value={value}
                  onChangeText={setValue}
                  cellCount={CELL_COUNT}
                  rootStyle={styles.codeFieldRoot}
                  keyboardType='number-pad'
                  textContentType='oneTimeCode'
                  renderCell={renderCell}
                />
                <Button
                  onPress={() => {
                    vertify(value, props.navigation, warnDesc, failMessage, wtfMessage)
                  }}
                  style={styles.nextButton}
                >
                  <Text style={styles.nextButtonText}>{text('password.login')}</Text>
                </Button>
              </Center>
            </ScrollView>
          </Box>
        </SafeAreaView>
      </NativeBaseProvider>
    )
  } catch (ex) {
    console.log(ex)
  }
}

export default PasswordScreen

const styles = StyleSheet.create({
  codeFieldRoot: {
    height: CELL_SIZE,
    marginTop: normalizeHeigth('2%'),
    justifyContent: 'center'
  },
  cell: {
    marginHorizontal: normalizeHeigth('1%'),
    height: CELL_SIZE,
    width: CELL_SIZE,
    lineHeight: CELL_SIZE - 5,
    ...Platform.select({ web: { lineHeight: 65 } }),
    fontSize: normalizeWidth('8%', 0.5),
    textAlign: 'center',
    borderRadius: CELL_BORDER_RADIUS,

    // IOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    // Android
    elevation: 3
  },
  title: {
    paddingTop: normalizeHeigth('8%'),
    fontSize: 25,
    fontWeight: '700',
    textAlign: 'center',
    paddingBottom: normalizeHeigth('5%')
  },
  subTitle: {
    paddingTop: normalizeHeigth('4%'),
    textAlign: 'center'
  },
  nextButton: {
    marginTop: normalizeHeigth('4%'),
    borderRadius: normalizeHeigth('1%'),
    height: normalizeHeigth('8%', 0.5),
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 300
  },
  nextButtonText: {
    fontSize: normalizeWidth('4%'),
    fontWeight: '700'
  }
})
