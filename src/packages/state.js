import { useDispatch, useSelector } from 'react-redux'
import StateService from '../api/StateService'
import { defaultState } from '../constants/data/default-state'
import { setConnectionState, setStateData } from '../redux/site'

import store from '../redux'

var failFetchCounter = 0
const BUTTONS_START_INDEX = 6
const BUTTONS_COUNT = 11
const SENSORS_START_INDEX = 17
const SENSORS_COUNT = 3

var LAST_DATA = undefined
const LAST_DATA_EDITED = { value: false }
export { LAST_DATA_EDITED }

export default fetchStateAndProcess = async (ip, port, dispatch) => {
  const [data, error] = await StateService.fetchSystemState(ip, port)

  const site = store.getState().site
  if (!verifyConnectionState(data, error, dispatch)) {
    return
  }

  if (!site.connection) {
    dispatch(setConnectionState(true))
  }

  if (LAST_DATA === data || data == undefined) {
    if (!LAST_DATA_EDITED.value) {
      return
    }
  }
  LAST_DATA = data

  const datas = data.split('-')

  var state = { ...defaultState }
  state.humidity = datas[0]
  state.water = datas[1]
  state.wasteWater = datas[2]
  state.battery = datas[3]
  state.temperature = datas[4]
  var buttons = datas.slice(BUTTONS_START_INDEX, BUTTONS_START_INDEX + BUTTONS_COUNT)
  var sensors = datas.slice(SENSORS_START_INDEX, SENSORS_START_INDEX + SENSORS_COUNT)
  buttons = buttons.map((item) => (item == '1' ? true : false))
  sensors = sensors.map((item) => (item == '1' ? true : false))

  state.buttons = buttons
  state.sensors = sensors

  LAST_DATA_EDITED.value = false
  dispatch(setStateData(state))
}

const verifyConnectionState = (data, error, dispatch) => {
  if (error == true || !data) {
    failFetchCounter++
    if (failFetchCounter >= 3) {
      dispatch(setStateData({}))
      dispatch(setConnectionState(false))
    }
    console.log('fetch fail oldu : ', failFetchCounter)
    return false
  }
  failFetchCounter = 0
  return true
}

const deepEqual = (objA, objB, map = new WeakMap()) => {
  // P1
  if (Object.is(objA, objB)) return true

  // P2
  if (objA instanceof Date && objB instanceof Date) {
    return objA.getTime() === objB.getTime()
  }
  if (objA instanceof RegExp && objB instanceof RegExp) {
    return objA.toString() === objB.toString()
  }

  // P3
  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false
  }

  // P4
  if (map.get(objA) === objB) return true
  map.set(objA, objB)

  // P5
  const keysA = Reflect.ownKeys(objA)
  const keysB = Reflect.ownKeys(objB)

  if (keysA.length !== keysB.length) {
    return false
  }

  for (let i = 0; i < keysA.length; i++) {
    if (!Reflect.has(objB, keysA[i]) || !deepEqual(objA[keysA[i]], objB[keysA[i]], map)) {
      return false
    }
  }

  return true
}
