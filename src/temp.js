import { NativeBaseProvider, Box, Button } from 'native-base'
import * as React from 'react'
import { Text } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { LoadingCard } from './components/loading/index'
import { TEXT } from './packages/i18n'
import { useDispatch, useSelector } from 'react-redux'
import { setLanguage, setLoadingCard } from './redux/site'

function HomeScreen({ navigation }) {
  var dispatch = useDispatch()
  const state = useSelector((state) => state.site)
  return (
    <NativeBaseProvider>
      <Box flex={1} bg='#fff' alignItems='center' justifyContent='center'>
        <Text>{TEXT('hello')} 1</Text>
        <Text>dil: {state.lang}</Text>
        <Text>theme: {state.dark ? 'dark' : 'ligth'}</Text>
        <Button
          onPress={() => {
            dispatch(setLanguage('en'))
          }}
          title='en'
        >
          en
        </Button>
        <Button
          onPress={() => {
            dispatch(setLoadingCard(true))
          }}
          title='set'
        >
          set
        </Button>
        <Button
          onPress={() => {
            dispatch(setLanguage('tr'))
          }}
          title='tr'
        >
          tr
        </Button>
      </Box>
    </NativeBaseProvider>
  )
}

function NotificationsScreen({ navigation }) {
  return <NativeBaseProvider></NativeBaseProvider>
}

const Tab = createMaterialTopTabNavigator()

const generateLoadingCard = (state) => {
  if (state) {
    return <LoadingCard />
  }
}

export function Application() {
  const state = useSelector((state) => state.site)
  return (
    <>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name='Home' component={HomeScreen} />
          <Tab.Screen name='Notification' component={NotificationsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
      {generateLoadingCard(state.loading)}
    </>
  )
}
