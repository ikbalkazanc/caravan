import { set } from 'immer/dist/internal'
import { Box, Button, Center, Container, FormControl, Heading, HStack, Input, NativeBaseProvider, Radio, Stack, VStack } from 'native-base'
import * as React from 'react'
import { Text, View, ScrollView, SafeAreaView, TextInput, StyleSheet, Switch, Alert } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useDispatch } from 'react-redux'
import { getCurrentLanguage, text } from '../packages/i18n'
import { clearStorage, getSettings, setSettings } from '../packages/storage'
import { theme } from '../packages/theme'
import { setDarkMode, setLanguage, setLoadingCard } from '../redux/site'

const config = {
  dependencies: {
    'linear-gradient': require('react-native-linear-gradient').default
  }
}

export default function SettingsScreen() {
  var dispatch = useDispatch()
  const [ip, onChangeIp] = React.useState('')
  const [port, onChangePort] = React.useState('')
  const [password, onChangePassword] = React.useState('')
  const [language, setLangauge] = React.useState(getCurrentLanguage())
  const [themeSwitch, setSwitch] = React.useState(false)

  const [showPassword, setShowPassword] = React.useState(false)
  const handleShowPasswordClick = () => setShowPassword(!showPassword)

  const themes = theme()
  styles.label = { ...styles.label, color: themes.text }
  styles.input = { ...styles.label, backgroundColor: themes.color3 }
  const successfulMessage = text('modals.settingsSuccesfulyUpdate')
  const passwordVerifyMessage = text('settings.passwordVerifyMessage')
  React.useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = () => {
    getSettings().then((settings) => {
      onChangeIp(settings.ip ? settings.ip : '')
      onChangePort(settings.port ? settings.port : '')
      onChangePassword(settings.password ? settings.password : '')
      const themeSettings = settings.theme == 'dark' ? true : false
      setSwitch(!themeSettings)
      setLangauge(settings.language ? settings.language : 'tr')
    })
  }

  const toggleSwitch = () => {
    getSettings().then((settings) => {
      dispatch(setDarkMode(themeSwitch))
      settings.theme = themeSwitch ? 'dark' : 'ligth'

      setSwitch(!themeSwitch)
      setSettings(settings)
    })
  }

  const toggleLanguage = (newLangauge) => {
    getSettings().then((settings) => {
      settings.language = newLangauge
      language ? dispatch(setLanguage(settings.language)) : () => {}
      setLangauge(settings.language)
      setSettings(settings)
    })
  }

  const handleSave = () => {
    if (!(password.length === 0 || password.length === 4)) {
      Alert.alert(passwordVerifyMessage)
      return
    }

    getSettings()
      .then((settings) => {
        dispatch(setLoadingCard(true))
        settings.ip = ip
        settings.port = port
        settings.password = password

        setSettings(settings)
        dispatch(setLoadingCard(false))
      })
      .finally(() => {
        Alert.alert(successfulMessage)
      })
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
          <ScrollView>
            <Center>
              <Container style={styles.container}>
                <FormControl style={styles.formItem}>
                  <FormControl.Label>
                    <Text style={styles.label}>{text('settings.ip')}</Text>
                  </FormControl.Label>
                  <Input style={styles.input} size='xl' variant='filled' value={ip} onChange={(value) => onChangeIp(value.nativeEvent.text)} placeholder={text('settings.ipPlaceholder')} />
                </FormControl>

                <FormControl style={styles.formItem}>
                  <FormControl.Label>
                    <Text style={styles.label}>{text('settings.port')}</Text>
                  </FormControl.Label>
                  <Input style={styles.input} size='xl' variant='filled' value={port} onChange={(value) => onChangePort(value.nativeEvent.text)} placeholder={text('settings.portPlaceholder')} />
                </FormControl>

                <FormControl style={styles.formItem}>
                  <FormControl.Label>
                    <Text style={styles.label}>{text('settings.password')}</Text>
                  </FormControl.Label>
                  <Input
                    style={styles.input}
                    variant='filled'
                    type={showPassword ? 'text' : 'password'}
                    w='100%'
                    size='xl'
                    py='0'
                    value={password}
                    onChange={(value) => onChangePassword(value.nativeEvent.text)}
                    InputRightElement={
                      <Button size='m' w='1/6' h='full' onPress={handleShowPasswordClick}>
                        {showPassword ? text('settings.hide') : text('settings.show')}
                      </Button>
                    }
                    placeholder={text('settings.passwordPlaceholder')}
                  />
                </FormControl>

                <HStack style={styles.formItem} flex={1} justifyContent='flex-end'>
                  <VStack w='3/6'></VStack>
                  <VStack w='3/6'>
                    <Button w='full' h='full' onPress={handleSave}>
                      {text('settings.save')}
                    </Button>
                  </VStack>
                </HStack>

                <FormControl style={styles.formItem}>
                  <HStack alignItems='center' space={4}>
                    <FormControl.Label>
                      <Text style={styles.label}>{text('settings.theme')}</Text>
                    </FormControl.Label>
                    <Text style={styles.label}>{text('settings.dark')}</Text>
                    <Switch onValueChange={toggleSwitch} value={themeSwitch} />
                    <Text style={styles.label}>{text('settings.ligth')}</Text>
                  </HStack>
                </FormControl>

                <FormControl style={styles.formItem}>
                  <VStack space={4}>
                    <FormControl.Label>
                      <Text style={styles.label}>{text('settings.language')}</Text>
                    </FormControl.Label>

                    <Radio.Group value={language} onChange={toggleLanguage}>
                      <HStack alignItems='center' mt={-3} space={4}>
                        <Radio value='en' my={1}>
                          <Text style={styles.label}>{text('settings.en')}</Text>
                        </Radio>
                        <Radio value='tr' my={1}>
                          <Text style={styles.label}>{text('settings.tr')}</Text>
                        </Radio>
                        <Radio value='de' my={1}>
                          <Text style={styles.label}>{text('settings.de')}</Text>
                        </Radio>
                      </HStack>
                    </Radio.Group>
                  </VStack>
                </FormControl>
              </Container>
            </Center>
          </ScrollView>
        </Box>
      </SafeAreaView>
    </NativeBaseProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  formItem: {
    marginTop: hp('3%')
  },
  label: {
    fontSize: 14
  }
})
