import { Box, Center, HStack, Container, NativeBaseProvider, VStack } from 'native-base'
import * as React from 'react'
import { Text, View, ScrollView, SafeAreaView, StyleSheet } from 'react-native'
import BatteryMeasure from '../components/measures/battery'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { theme } from '../packages/theme'
import { ScreenContainer } from 'react-native-screens'
import Icon from 'react-native-vector-icons/MaterialIcons'
import ControlButton from '../components/control/control-button'

const config = {
  dependencies: {
    'linear-gradient': require('react-native-linear-gradient').default
  }
}

export default function ControlScreen() {
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
          <ScrollView style={styles.scroll}>
            <Center style={styles.container}>
              <HStack space={3} justifyContent='center'>
                <Center h={wp('30%')} w={wp('30%')} bg={themes.color3} rounded='md' shadow={3} style={styles.button}>
                  <Text style={{ ...styles.label, color: themes.blue }}>Işık 1</Text>
                  <Icon name='settings' size={wp('15%')} color={themes.blue} />
                  <View style={styles.indicator}></View>
                </Center>
                <ControlButton state={true} icon={'settings'} code={'AAA'} />
                <Center w={'30%'} bg='primary.300' rounded='md' shadow={3} />
              </HStack>
            </Center>
          </ScrollView>
        </Box>
      </SafeAreaView>
    </NativeBaseProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: wp('5%')
  },
  indicator: {
    marginTop: '10%',
    height: wp('1.7%'),
    backgroundColor: 'red',
    width: '80%',
    borderRadius: wp('3%'),
    bottom: 0
  },
  label: {}
})
