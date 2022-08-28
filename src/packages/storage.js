import AsyncStorage from '@react-native-async-storage/async-storage'
import { defaultSettings } from '../constants/data/default-settings'
const settings_key = '@settings'

export const getSettings = async () => {
  var settings = undefined
  try {
    var settingStr = await AsyncStorage.getItem(settings_key)
    if (settingStr == null) {
      await setSettings(defaultSettings)
      return defaultSettings
    }
    settings = JSON.parse(settingStr)
  } catch (e) {
    console.log('error: stroage get çalışmadı\n', e)
    return null
  }
  return settings
}

export const setSettings = async (settings) => {
  try {
    await AsyncStorage.setItem(settings_key, JSON.stringify(settings))
  } catch (e) {
    console.log('error: stroage set çalışmadı\n', e)
  }
}

export const clearStorage = () => {
  AsyncStorage.clear()
}
