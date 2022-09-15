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
      //var response = await getMoviesFromApiAsync()
    } catch (err) {
      console.log('Fetch başarısız', err)
    }
    if (Math.floor(Math.random() * 10) > 5) {
      return ['56-24-43-10.9-32-01AA-1-0-1-0-1-0-1-0-1-0-0-1-1-1', false]
    }
    return ['11-23-140-9-22-01AA-0-1-0-1-0-1-1-1-0-1-0-1-0-0', false]
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
      //await fetch(path)
    } catch (err) {
      console.log('Fetch başarısız', err)
      return false
    }

    return true
  }
}

const getMoviesFromApiAsync = async () => {
  try {
    const response = await fetch('https://reactnative.dev/movies.json')
    const json = await response.json()
    return json.movies
  } catch (error) {
    console.error(error)
  }
}
export default new StateService()
