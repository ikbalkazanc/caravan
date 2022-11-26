import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { getSettings } from '../packages/storage'
import { Alert } from 'react-native'

class StateService {
  constructor() {
    this.instance = axios.create()
  }

  async fetchSystemState(ip, port) {
    const path = `http://${ip}:${port}?State=01AA`
    try {
      const response = await fetch(path)
      const data = await response.text()
      return [data, false]
    } catch (err) {
      console.log('Fetch başarısız', err)
      //alert('Path bu    ' + path + '   ' + err)
      return ['', true]
      return ['11-23-140-9-22-01AA-0-1-0-1-0-1-1-1-0-1-0-1-0-0', false]
    }
    //return ['11-23-140-9-22-01AA-0-1-0-1-0-1-1-1-0-1-0-1-0-0', false]
  }

  async setPinState(code, state) {
    const settings = await getSettings()

    const path = `http://${settings.ip}:${settings.port}?State=${code}${state}`
    var response = undefined
    try {
      response = await fetch(path)
    } catch (err) {
      console.log('Fetch başarısız', err)
      //alert('Path bu    ' + path + '   ' + err)
      return [false, undefined, undefined]
    }

    const data = await response.text()
    if (data.length == 4) {
      return [true, data.slice(0, 3), data.slice(3, 4) == '1' ? true : false]
    }
    return [false, undefined, undefined]
  }
}

export default new StateService()
