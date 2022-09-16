import StateService from '../api/StateService'
import configuration from '../constants/configuration'
import { useDispatch, useSelector } from 'react-redux'
import { BackHandler } from 'react-native'
import { addInterval } from '../redux/site'
import { clearStorage, getSettings, setSettings } from '../packages/storage'
import fetchStateAndProcess from '../packages/state'
import { EXIT_STATUS } from '..'
var intervals = []
var settings = {}

module.exports = async () => {
  const dispatch = useDispatch()
  const taskId = Math.floor(Math.random() * 1000)
  const connectionCycleTime = configuration.connectionCycleTime
  const site = useSelector((state) => state.site)
  const storeSettings = await getSettings()

  security()

  if (settings.port != storeSettings.port || settings.ip != storeSettings.ip) {
    console.log('Setting değişti ve ip güncellendi')
    settings = storeSettings
    intervals.forEach((val) => {
      clearInterval(val)
    })
    intervals = []
    try {
      await task(site, dispatch, taskId)
    } catch {}
    const intervalId = setInterval(async function () {
      await task(site, dispatch, taskId)
    }, connectionCycleTime)
    intervals.push(intervalId)
  }
}

const task = async (site, dispatch, taskId) => {
  const runId = Math.floor(Math.random() * 10000)
  await fetchStateAndProcess(site.ip, site.port, dispatch)
  console.log('Connection worker running. Id: ', taskId, runId)
}

const security = () => {
  if (EXIT_STATUS) {
    BackHandler.exitApp()
  }
}
