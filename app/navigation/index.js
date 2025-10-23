import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AuthStack from './AuthStack';
import ApplicationStack from './ApplicationStack';
import Notifications from '../containers/notifications';
import Messages from '../containers/messages';

const RootStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();

// Main app stack with tabs and modal screens
function MainNavigator() {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <MainStack.Screen name="Tabs" component={ApplicationStack} />
      <MainStack.Screen
        name="Notifications"
        component={Notifications}
        options={{
          presentation: 'card',
          animation: 'slide_from_right',
        }}
      />
      <MainStack.Screen
        name="Messages"
        component={Messages}
        options={{
          presentation: 'card',
          animation: 'slide_from_right',
        }}
      />
    </MainStack.Navigator>
  );
}

// Root navigation
function RootNavigator() {
  return (
    <RootStack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}>
      <RootStack.Screen name="Login" component={AuthStack} />
      <RootStack.Screen name="Home" component={MainNavigator} />
    </RootStack.Navigator>
  );
}

export default RootNavigator;
