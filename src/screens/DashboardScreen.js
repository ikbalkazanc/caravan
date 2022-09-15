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

const config = {
  dependencies: {
    'linear-gradient': require('react-native-linear-gradient').default
  }
}

export default function DashboardScreen() {
  const themes = theme()
  const site = useSelector((state) => state.site)
  return (
    <NativeBaseProvider config={config}>
      <SafeAreaView>
        <Box
          background={{
            linearGradient: {
              colors: [themes.color4, themes.color3],
              start: [0, 0],
              end: [1, 1]
            }
          }}
          style={{ height: '100%' }}
        >
          {site.connection ? (
            <ScrollView>
              <Center style={styles.container}>
                <HStack space={2}>
                  <VStack>
                    <HumidityMeasure size={wp('48%')} value={site.data.humidity} />
                  </VStack>
                  <VStack>
                    <TemperatureMeasure size={wp('48%')} value={site.data.temperature} />
                  </VStack>
                </HStack>
                <HStack space={2} mt={wp('2%')}>
                  <VStack>
                    <WasteWaterMeasure size={wp('48%')} value={site.data.wasteWater} />
                  </VStack>
                  <VStack>
                    <WaterMeasure size={wp('48%')} value={site.data.water} />
                  </VStack>
                </HStack>
                <HStack space={2} mt={wp('2%')}>
                  <VStack>
                    <BatteryMeasure size={wp('48%')} value={site.data.battery} />
                  </VStack>
                </HStack>
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
