import * as React from 'react'
import { NavigationStack } from './stack'
import connectionWorker from './workers/ConnectionWorker'

export function Application() {
  connectionWorker()

  return <NavigationStack />
}
