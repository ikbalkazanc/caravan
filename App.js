import * as React from 'react'
import { Application } from './src'
import store from './src/redux'
import { Provider } from 'react-redux'
import SplashScreen from 'react-native-splash-screen'

export default function App() {
  React.useEffect(() => {
    SplashScreen.hide()
  })

  return (
    <Provider store={store}>
      <Application />
    </Provider>
  )
}
