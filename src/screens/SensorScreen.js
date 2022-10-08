import { Box, Center, Container, HStack, NativeBaseProvider, VStack } from 'native-base'
import React, { useState } from 'react'

import { Text, View, ScrollView, SafeAreaView, StyleSheet } from 'react-native'
import HumidityMeasure from '../components/measures/humidity'
import WaterMeasure from '../components/measures/water'
import WasteWaterMeasure from '../components/measures/waste-water'
import TemperatureMeasure from '../components/measures/temperature'
import BatteryMeasure from '../components/measures/battery'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { theme } from '../packages/theme'
import { useSelector } from 'react-redux'
import HasNoConnection from '../components/has-no-connection'
import SensorCard from '../components/sensors/sensor-card'
import { sensors } from '../constants/data/default-settings'
import { text } from '../packages/i18n'

const config = {
  dependencies: {
    'linear-gradient': require('react-native-linear-gradient').default
  }
}

export default function SensorScreen() {
  const themes = theme()
  const site = useSelector((state) => state.site)

  const gas = text('sensors.'.concat(sensors[0]))
  const fire = text('sensors.'.concat(sensors[1]))

  return (
    <NativeBaseProvider config={config}>
      <SafeAreaView>
        <Box
          background={{
            linearGradient: {
              colors: [themes.status == 'dark' ? themes.color4 : themes.custom1, themes.color3],
              start: [0, 0],
              end: [1, 1]
            }
          }}
          style={{ height: '100%' }}
        >
          {site.connection ? (
            <ScrollView>
              <Center style={styles.container}>
                <SensorCard status={site.data.sensors ? site.data.sensors[0] : false} style={{ marginBottom: hp('3%') }} icon={'fireplace'} title={gas} />
                <SensorCard status={site.data.sensors ? site.data.sensors[1] : false} style={{ marginBottom: hp('3%') }} icon={'fire-hydrant'} title={fire} />
              </Center>
            </ScrollView>
          ) : (
            <HasNoConnection></HasNoConnection>
          )}
        </Box>
      </SafeAreaView>
    </NativeBaseProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: wp('3%')
  }
})
