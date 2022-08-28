import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import DashboardScreen from './screens/DashboardScreen'
import { NativeBaseProvider, extendTheme } from 'native-base'
import { theme } from './packages/theme'
import { text } from './packages/i18n'
import { Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { hasProxies } from 'immer/dist/internal'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import SettingsScreen from './screens/SettingsScreen'
import { LoadingCard } from './components/loading'
import { useSelector } from 'react-redux'
import ControlScreen from './screens/ControlScreen'

function DashboardStackScreen({ navigation }) {
  return <DashboardScreen />
}

function SettingsStackScreen({ navigation }) {
  return <SettingsScreen />
}

function ControlStackScreen({ navigation }) {
  return <ControlScreen />
}

const generateLoadingCard = (state) => {
  if (state) {
    return <LoadingCard />
  }
}

const Tab = createBottomTabNavigator()

export function NavigationStack() {
  const themes = theme()
  const state = useSelector((state) => state.site)
  return (
    <>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            activeTintColor: themes.blue,
            inactiveTintColor: themes.text,
            tabBarActiveTintColor: themes.blue,
            tabBarItemStyle: {
              color: 'white'
            },
            style: {
              borderTopColor: themes.blue,
              backgroundColor: 'transparent',
              elevation: 0
            },
            headerStyle: {
              backgroundColor: themes.color4
            },
            headerTintColor: themes.text,
            headerTitleStyle: {
              fontWeight: 'bold'
            },
            tabBarStyle: { backgroundColor: themes.color4, color: themes.text, height: hp('8%') }
          }}
        >
          <Tab.Screen
            options={{
              title: text('tabs.dashboard'),
              tabBarIcon: (props) => <Icon name='dashboard' size={30} color={props.color} />
            }}
            name='Home'
            component={DashboardStackScreen}
          />
          <Tab.Screen
            options={{
              title: text('tabs.control'),
              tabBarIcon: (props) => <Icon name='auto-awesome-motion' size={30} color={props.color} />
            }}
            name='Control'
            component={ControlStackScreen}
          />
          <Tab.Screen name='Home1' component={DashboardStackScreen} />
          <Tab.Screen
            options={{
              title: text('tabs.settings'),
              tabBarIcon: (props) => <Icon name='settings' size={30} color={props.color} />
            }}
            name='Home3'
            component={SettingsStackScreen}
          />
        </Tab.Navigator>
      </NavigationContainer>
      {generateLoadingCard(state.loading)}
    </>
  )
}
