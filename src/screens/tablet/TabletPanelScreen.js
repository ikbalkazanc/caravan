import { Box, Center, Container, HStack, NativeBaseProvider, VStack } from 'native-base'
import React, { useState } from 'react'

import { Text, View, ScrollView, SafeAreaView, StyleSheet } from 'react-native'
import { theme } from '../../packages/theme'
import { useSelector } from 'react-redux'
import HasNoConnection from '../../components/has-no-connection'
import { normalizeHeigth, normalizeWidth } from '../../packages/responsive'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import DashboardScreen from '../DashboardScreen'
import TabletDashboard from '../../components/tablet/tablet-dashboard'
import ControlScreen from '../ControlScreen'
import SensorCard from '../../components/sensors/sensor-card'
import { sensors } from '../../constants/data/default-settings'
import { text } from '../../packages/i18n'
import SensorTabletCard from '../../components/sensors/sensor-card-tablet'

const config = {
  dependencies: {
    'linear-gradient': require('react-native-linear-gradient').default
  }
}

export default function TabletPanelScreen() {
  const themes = theme()
  const site = useSelector((state) => state.site)
  const lpgText = text('sensors.'.concat(sensors[0]))
  const fireText = text('sensors.'.concat(sensors[1]))

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
            <Center style={styles.container}>
              <HStack space={3} w={'100%'} justifyContent='center' style={{ height: '100%' }}>
                <Center w={'30%'}>
                  <TabletDashboard site={site} />
                </Center>
                <Center w={'70%'}>
                  <VStack w={'100%'} justifyContent={'space-between'}>
                    <Center w={'100%'} h={'68%'} borderColor={themes.text} borderWidth={0.5} borderRadius={normalizeWidth('3%')} p={2}>
                      <ControlScreen />
                    </Center>
                    <Box w={'100%'} h={'28%'} borderColor={themes.text} borderWidth={0.5} borderRadius={normalizeWidth('3%')} p={3} mt={5}>
                      <ScrollView horizontal={true}>
                        <Box flexDirection={'row'} w={'100%'}>
                          <Box w={'49%'} h={'100%'} mr={4}>
                            <SensorTabletCard status={site.data.sensors[0]} icon={'fireplace'} title={lpgText} />
                          </Box>
                          <Box w={'49%'} h={'100%'}>
                            <SensorTabletCard status={site.data.sensors[1]} icon={'fire-hydrant'} title={fireText} />
                          </Box>
                        </Box>
                      </ScrollView>
                    </Box>
                  </VStack>
                </Center>
              </HStack>
            </Center>
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
    padding: normalizeWidth('3%')
  }
})
