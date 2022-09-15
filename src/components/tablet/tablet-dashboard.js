import { Box, Center, Container, HStack, NativeBaseProvider, VStack } from 'native-base'
import React, { useState } from 'react'

import { Text, View, ScrollView, SafeAreaView, StyleSheet } from 'react-native'
import HumidityMeasure from '../measures/humidity'
import WaterMeasure from '../measures/water'
import WasteWaterMeasure from '../measures/waste-water'
import TemperatureMeasure from '../measures/temperature'
import BatteryMeasure from '../measures/battery'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { theme } from '../../packages/theme'
import { normalizeWidth } from '../../packages/responsive'

export default function TabletDashboard({ site }) {
  const themes = theme()
  return (
    <Box borderColor={themes.text} borderWidth={0.5} p={2} borderRadius={normalizeWidth('3%')}>
      <ScrollView>
        <Center style={styles.container}>
          <HStack space={2}>
            <VStack>
              <HumidityMeasure size={wp('13%')} value={site.data.humidity} />
            </VStack>
            <VStack>
              <TemperatureMeasure size={wp('13%')} value={site.data.temperature} />
            </VStack>
          </HStack>
          <HStack space={2} mt={hp('1%')}>
            <VStack>
              <WasteWaterMeasure size={wp('13%')} value={site.data.wasteWater} />
            </VStack>
            <VStack>
              <WaterMeasure size={wp('13%')} value={site.data.water} />
            </VStack>
          </HStack>
          <HStack space={2} mt={hp('1%')}>
            <VStack>
              <BatteryMeasure size={wp('13%')} value={site.data.battery} />
            </VStack>
          </HStack>
        </Center>
      </ScrollView>
    </Box>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%'
  }
})
