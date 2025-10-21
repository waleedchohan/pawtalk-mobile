import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text, View} from 'native-base';
import Home from '../containers/home';
import Discover from '../containers/discover';
import Post from '../containers/post';
import Translate from '../containers/translate';
import {TouchableOpacity, Dimensions} from 'react-native';

const Tab = createBottomTabNavigator();

const {width} = Dimensions.get('window');

const CustomTabBar = ({state, descriptors, navigation}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#fff',
        justifyContent: 'space-around',
        paddingTop: 10,
        paddingBottom: 20,

        elevation: 10,

        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: -3, // shadow going upward
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label = options.tabBarLabel ?? route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          if (!isFocused) {
            navigation.navigate(route.name);
          }
        };

        const iconName = {
          Home: 'home',
          Discover: 'compass',
          Post: 'plus-circle',
          Translate: 'translate',
          Profile: 'account',
        }[label];

        const isCenter = label === 'Post';

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            activeOpacity={0.8}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: width / 5,
              // marginTop: isCenter ? -20 : 0,
            }}>
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: isFocused ? '#5E7CFD' : 'transparent',
                alignItems: 'center',
                justifyContent: 'center',
                elevation: isFocused ? 4 : 0,
                borderWidth: isFocused && isCenter ? 2 : 0,
                borderColor: '#fff',
                overflow: 'hidden',
              }}>
              <MaterialCommunityIcons
                name={iconName}
                size={26}
                color={isFocused ? '#fff' : '#aaa'}
              />
            </View>

            {isFocused && (
              <Text
                style={{
                  fontSize: 12,
                  color: '#000',
                  marginTop: 5,
                  textAlign: 'center',
                }}
                fontFamily="heading"
                numberOfLines={1}>
                {label}
              </Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const ApplicationStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}} // 👈 hides the header
      tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Discover" component={Discover} />
      <Tab.Screen name="Post" component={Post} />
      <Tab.Screen name="Translate" component={Translate} />
      <Tab.Screen name="Profile" component={Home} />
    </Tab.Navigator>
  );
};

export default ApplicationStack;
