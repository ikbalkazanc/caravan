import AsyncStorage from '@react-native-async-storage/async-storage'
import { defaultSettings } from '../constants/data/default-settings'
const settings_key = '@settings'

var SETTING_BUFFER = undefined

export const getSettings = async () => {
  if (SETTING_BUFFER != undefined) {
    return SETTING_BUFFER
  }

  var settings = undefined
  try {
    var settingStr = await AsyncStorage.getItem(settings_key)
    if (settingStr == null) {
      await setSettings(defaultSettings)
      return defaultSettings
    }
    settings = JSON.parse(settingStr)
    SETTING_BUFFER = settings
    console.log('setting file dan geldi')
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
  SETTING_BUFFER = undefined
}

export const clearStorage = async () => {
  await AsyncStorage.clear()
  SETTING_BUFFER = undefined
  console.log('storage temizlendi')
}
