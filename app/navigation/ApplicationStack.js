import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text, View} from 'native-base';
import Home from '../containers/home';
import Discover from '../containers/discover';
import Post from '../containers/post';
import Translate from '../containers/translate';
import Profile from '../containers/profile';
import {TouchableOpacity, Dimensions, StyleSheet, Platform} from 'react-native';
import Colors from '../themes/Colors';

const Tab = createBottomTabNavigator();

const {width} = Dimensions.get('window');

const CustomTabBar = ({state, descriptors, navigation}) => {
  return (
    <View style={styles.tabBarContainer}>
      <View style={styles.tabBarBackground}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label = options.tabBarLabel ?? route.name;
          const isFocused = state.index === index;

          const onPress = () => {
            if (!isFocused) {
              navigation.navigate(route.name);
            }
          };

          const iconConfig = {
            Home: {name: 'home-variant', size: 24},
            Discover: {name: 'compass-outline', size: 26},
            Post: {name: 'plus', size: 32},
            Translate: {name: 'translate', size: 24},
            Profile: {name: 'account-circle-outline', size: 26},
          }[label];

          const isCenter = label === 'Post';

          if (isCenter) {
            return (
              <TouchableOpacity
                key={index}
                onPress={onPress}
                activeOpacity={0.85}
                style={styles.centerButton}>
                <View style={styles.centerButtonGradient}>
                  <MaterialCommunityIcons
                    name={iconConfig.name}
                    size={iconConfig.size}
                    color="#ffffff"
                  />
                </View>
              </TouchableOpacity>
            );
          }

          return (
            <TouchableOpacity
              key={index}
              onPress={onPress}
              activeOpacity={0.7}
              style={styles.tabButton}>
              <View
                style={[
                  styles.iconContainer,
                  isFocused && styles.iconContainerFocused,
                ]}>
                <MaterialCommunityIcons
                  name={iconConfig.name}
                  size={iconConfig.size}
                  color={isFocused ? '#059669' : '#9CA3AF'}
                />
              </View>
              <Text
                style={[
                  styles.tabLabel,
                  isFocused ? styles.tabLabelFocused : styles.tabLabelUnfocused,
                ]}
                numberOfLines={1}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  tabBarBackground: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 15,
    paddingBottom: Platform.OS === 'ios' ? 30 : 15,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'space-around',
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 15,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
  },
  iconContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    overflow: 'hidden',
  },
  iconContainerFocused: {
    backgroundColor: '#E8F8F1',
    borderRadius: 20,
  },
  tabLabel: {
    fontSize: 10,
    marginTop: 3,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  tabLabelFocused: {
    color: '#059669',
    fontWeight: '600',
  },
  tabLabelUnfocused: {
    color: '#9CA3AF',
  },
  centerButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -35,
  },
  centerButtonGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    borderWidth: 4,
    borderColor: '#ffffff',
  },
});

const ApplicationStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}} // 👈 hides the header
      tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Discover" component={Discover} />
      <Tab.Screen name="Post" component={Post} />
      <Tab.Screen name="Translate" component={Translate} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default ApplicationStack;
