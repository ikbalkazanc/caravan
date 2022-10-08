import StateService from '../api/StateService'
import configuration from '../constants/configuration'
import { useDispatch, useSelector } from 'react-redux'
import { BackHandler } from 'react-native'
import { addInterval } from '../redux/site'
import { clearStorage, getSettings, setSettings } from '../packages/storage'
import fetchStateAndProcess from '../packages/state'
var intervals = []
var settings = {}

module.exports = async () => {
  const dispatch = useDispatch()
  const taskId = Math.floor(Math.random() * 1000)
  const connectionCycleTime = configuration.connectionCycleTime
  const site = useSelector((state) => state.site)
  const storeSettings = await getSettings()

  if (settings.port != storeSettings.port || settings.ip != storeSettings.ip) {
    console.log('Setting değişti ve ip güncellendi')
    settings = storeSettings
    intervals.forEach((val) => {
      clearInterval(val)
    })
    intervals = []
    try {
      await task(dispatch, taskId)
    } catch {}
    const intervalId = setInterval(async function () {
      await task(dispatch, taskId)
    }, connectionCycleTime)
    intervals.push(intervalId)
  }
}

const task = async (dispatch, taskId) => {
  const runId = Math.floor(Math.random() * 10000)
  const storeSettings = await getSettings()
  await fetchStateAndProcess(storeSettings.ip, storeSettings.port, dispatch)
  console.log('Connection worker running. Id: ', taskId, runId)
}
