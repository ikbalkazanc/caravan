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
import { createStackNavigator } from '@react-navigation/stack'
import PasswordScreen from './screens/PasswordScreen'
import LoadingScreen from './screens/LoadingScreen'
import SensorScreen from './screens/SensorScreen'
import ConnectionState from './components/header/connection-state'
import { isTablet } from './packages/device-info'
import TabletPanelScreen from './screens/tablet/TabletPanelScreen'

function DashboardTabScreen({ navigation }) {
  return <DashboardScreen />
}

function TabletPanelTabScreen({ navigation }) {
  return <TabletPanelScreen />
}

function SettingsTabScreen({ navigation }) {
  return <SettingsScreen />
}

function ControlTabScreen({ navigation }) {
  return <ControlScreen />
}

function SensorsTabScreen({ navigation }) {
  return <SensorScreen />
}

function PasswordStackScreen({ navigation }) {
  return <PasswordScreen navigation={navigation} />
}

function LoadingStackScreen({ navigation }) {
  return <LoadingScreen navigation={navigation} />
}

const generateLoadingCard = (state) => {
  if (state) {
    return <LoadingCard />
  }
}

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

const rightHeaderComponent = () => {
  const state = useSelector((state) => state.site)
  return <ConnectionState value={state.connection} />
}

const TabScreens = () => {
  const themes = theme()
  return (
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
          tabBarIcon: (props) => <Icon name='dashboard' size={30} color={props.color} />,
          headerRight: rightHeaderComponent
        }}
        name='Home'
        component={DashboardTabScreen}
      />
      <Tab.Screen
        options={{
          title: text('tabs.control'),
          tabBarIcon: (props) => <Icon name='auto-awesome-motion' size={30} color={props.color} />,
          headerRight: rightHeaderComponent
        }}
        name='Control'
        component={ControlTabScreen}
      />
      <Tab.Screen
        options={{
          title: text('tabs.sensors'),
          tabBarIcon: (props) => <Icon name='wifi-tethering' size={30} color={props.color} />,
          headerRight: rightHeaderComponent
        }}
        name='Sensors'
        component={SensorsTabScreen}
      />
      <Tab.Screen
        options={{
          title: text('tabs.settings'),
          tabBarIcon: (props) => <Icon name='settings' size={30} color={props.color} />,
          headerRight: rightHeaderComponent
        }}
        name='Home3'
        component={SettingsTabScreen}
      />
    </Tab.Navigator>
  )
}

const TabTabletScreens = () => {
  const themes = theme()
  return (
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
          title: text('tabs.panel'),
          tabBarIcon: (props) => <Icon name='dashboard' size={30} color={props.color} />,
          headerRight: rightHeaderComponent
        }}
        name='Home'
        component={TabletPanelTabScreen}
      />
      <Tab.Screen
        options={{
          title: text('tabs.settings'),
          tabBarIcon: (props) => <Icon name='settings' size={30} color={props.color} />,
          headerRight: rightHeaderComponent
        }}
        name='Home3'
        component={SettingsTabScreen}
      />
    </Tab.Navigator>
  )
}

export function NavigationStack() {
  const state = useSelector((state) => state.site)
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false, orientation: 'landscape' }} name='Loading' component={LoadingStackScreen} />
          <Stack.Screen options={{ headerShown: false }} name='Password' component={PasswordStackScreen} />
          <Stack.Screen options={{ headerShown: false }} name='App' component={isTablet() ? TabTabletScreens : TabScreens} />
        </Stack.Navigator>
      </NavigationContainer>

      {generateLoadingCard(state.loading)}
    </>
  )
}
