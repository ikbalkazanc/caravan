import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { getSettings } from '../packages/storage'
import { Alert } from 'react-native'

class StateService {
  constructor() {
    this.instance = axios.create()
  }

  async fetchSystemState(ip, port) {
    const path = `http://${ip}:${port}/?State=01AA`
    try {
      const response = await fetch(path)
      const data = await response.text()
      return [data, false]
    } catch (err) {
      console.log('Fetch başarısız', err)
      //alert('Path bu    ' + path + '   ' + err)
      return ['', true]
    }
  }

  async setPinState(code, state) {
    const settings = await getSettings()

    if (!settings.ip) {
      alert('ip doldur.')
      return false
    }

    if (!settings.port) {
      alert('port doldur.')
      return false
    }

    if (!code) {
      alert('code doldur.')
      return false
    }

    const path = `http://${settings.ip}:${settings.port}/?State=${code}${state}`
    try {
      await fetch(path)
    } catch (err) {
      console.log('Fetch başarısız', err)
      alert('Path bu    ' + path + '   ' + err)
      return false
    }

    return true
  }
}

export default new StateService()
