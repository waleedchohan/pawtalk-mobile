import React, {useEffect} from 'react';

import {Box, NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';

import {theme} from '../themes/nativeBaseThemes';

import AppNavigation from '../navigation';
import {Provider} from 'react-redux';
import {configureStore} from '../redux/store';

import {navigationRef} from '../../RootNavigation';

const store = configureStore();

function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Provider store={store}>
        <NativeBaseProvider theme={theme}>
          <Box flex={1} bg="#fff">
            <AppNavigation />
          </Box>
        </NativeBaseProvider>
      </Provider>
    </NavigationContainer>
  );
}

export default App;
