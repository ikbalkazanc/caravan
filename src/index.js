import * as React from 'react'
import { Text } from 'react-native'
import { useDispatch } from 'react-redux'
import { getSettings } from './packages/storage'
import { setDarkMode, setLanguage } from './redux/site'
import { NavigationStack } from './stack'

export function Application() {
  const [isReady, setIsReady] = React.useState(false)

  const dispatch = useDispatch()

  React.useEffect(() => {
    getSettings().then((settings) => {
      const isDarkTheme = settings.theme === 'dark' ? true : false
      dispatch(setDarkMode(isDarkTheme))
      dispatch(setLanguage(settings.language))
      setIsReady(true)
    })
  }, [])

  return <>{isReady ? <NavigationStack /> : <Text>Loading</Text>}</>
}
