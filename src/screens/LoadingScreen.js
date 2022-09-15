import { CommonActions } from '@react-navigation/native'
import * as React from 'react'
import { Text, Center, View, StyleSheet, ActivityIndicator } from 'react-native'
import { useDispatch } from 'react-redux'
import { getSettings } from '../packages/storage'
import { setLanguage } from '../redux/site'
import { setDarkMode } from '../redux/theme'

export default function LoadingScreen({ navigation }) {
  const dispatch = useDispatch()
  React.useEffect(() => {
    getSettings().then((settings) => {
      const isDarkTheme = settings.theme === 'dark' ? true : false
      dispatch(setDarkMode(isDarkTheme))
      dispatch(setLanguage(settings.language))
      if (settings.password == null || settings.password == undefined || settings.password == '') {
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{ name: 'App' }]
          })
        )
      } else {
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{ name: 'Password' }]
          })
        )
      }
    })
  }, [])

  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' color={'#007acc'} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignContent: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    justifyItems: 'center',
    flex: 1
  },
  text: {
    textAlign: 'center'
  }
})
