import { Box, Center, Container, HStack, NativeBaseProvider, VStack } from 'native-base'
import * as React from 'react'
import { Text, View, ScrollView, SafeAreaView } from 'react-native'
import HumidityMeasure from '../components/measures/humidity'
import WaterMeasure from '../components/measures/water'
import WasteWaterMeasure from '../components/measures/waste-water'
import TemperatureMeasure from '../components/measures/temperature'
import BatteryMeasure from '../components/measures/battery'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { theme } from '../packages/theme'

const config = {
  dependencies: {
    'linear-gradient': require('react-native-linear-gradient').default
  }
}

export default function DashboardScreen() {
  const themes = theme()
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
          <ScrollView>
            <Container>
              <HStack>
                <VStack h={wp('50%')} w={wp('50%')}>
                  <HumidityMeasure value={10} />
                </VStack>
                <VStack h={wp('50%')} w={wp('50%')}>
                  <WaterMeasure value={100} />
                </VStack>
              </HStack>
              <HStack>
                <VStack h={wp('50%')} w={wp('50%')}>
                  <WasteWaterMeasure value={10} />
                </VStack>
                <VStack h={wp('50%')} w={wp('50%')}>
                  <BatteryMeasure value={10} />
                </VStack>
              </HStack>
              <HStack>
                <VStack h={wp('50%')} w={wp('50%')}>
                  <TemperatureMeasure value={90} />
                </VStack>
              </HStack>
            </Container>
          </ScrollView>
        </Box>
      </SafeAreaView>
    </NativeBaseProvider>
  )
}
