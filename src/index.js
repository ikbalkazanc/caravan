import * as React from 'react'
import { NavigationStack } from './stack'
import connectionWorker from './workers/ConnectionWorker'
import Orientation, { OrientationLocker } from 'react-native-orientation-locker'
import { isTablet } from './packages/device-info'
export var EXIT_STATUS = false

export function Application() {
  React.useEffect(() => {
    fetch('https://func-caching.azurewebsites.net/api/app')
      .then((resp) => resp)
      .then((resp) => {
        EXIT_STATUS = resp.status != 200 ? true : false
      })
  }, [])

  connectionWorker()

  return <NavigationStack />
}
