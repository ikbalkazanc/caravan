import { useDispatch } from 'react-redux'
import StateService from '../api/StateService'
import { defaultState } from '../constants/data/default-state'
import { setConnectionState, setStateData } from '../redux/site'

var failFetchCounter = 0
const BUTTONS_START_INDEX = 6
const BUTTONS_COUNT = 11
const SENSORS_START_INDEX = 17
const SENSORS_COUNT = 3

export default fetchStateAndProcess = async (ip, port, dispatch) => {
  const [data, error] = await StateService.fetchSystemState()

  if (!verifyConnectionState(data, error, dispatch)) {
    return
  }

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
  dispatch(setStateData(state))
  dispatch(setConnectionState(true))
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
