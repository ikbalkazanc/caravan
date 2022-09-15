import * as React from 'react'
import { Application } from './src'
import store from './src/redux'
import { isTablet } from './src/packages/device-info'
import { Provider } from 'react-redux'
import SplashScreen from 'react-native-splash-screen'
import connectionWorker from './src/workers/ConnectionWorker'

import 'react-native-gesture-handler'
import Orientation, { OrientationLocker } from 'react-native-orientation-locker'
export default function App() {
  React.useEffect(() => {
    SplashScreen.hide()
  }, [])

  return (
    <Provider store={store}>
      <Application />
    </Provider>
  )
}
