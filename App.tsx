/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import RTNMyAsyncStorage from 'rtn-my-async-storage/js/NativeMyAsyncStorage';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const saveItem = async () => {
    try {
      if (Platform.OS === 'android') {
        await RTNMyAsyncStorage?.saveToAndroid('greeting', 'hello world');
      } else {
        RTNMyAsyncStorage?.saveToIOS('greeting', 'hello world');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getItem = async () => {
    try {
      if (Platform.OS === 'android') {
        const value = await RTNMyAsyncStorage?.getFromAndroid('greeting');
        console.log('Value is', value);
      } else {
        const value = RTNMyAsyncStorage?.getFromIOS('greeting');
        console.log('Value is', value);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <TouchableOpacity onPress={saveItem}>
        <Text>Save Item</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={getItem}>
        <Text>Get Item</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

//yarn add ./RTNMyAsyncStorage

// node rnapp/node_modules/react-native/scripts/generate-codegen-artifacts.js \
//   --path rnapp/ \
//   --outputPath rnapp/RTNMyAsyncStorage/generated/

export default App;
