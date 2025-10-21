import React from 'react';
import {
  Avatar,
  Box,
  Divider,
  HStack,
  Icon,
  IconButton,
  Image,
  StatusBar,
  Text,
  Badge,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import images from '../../themes/Images';
import {Pressable, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Header = ({title = 'PawTalk'}) => {
  const navigation = useNavigation();

  const user = useSelector(({auth}) => auth.user);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Box
        safeAreaTop
        bg="white"
        px={4}
        py={3}
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        borderBottomWidth={1}
        borderBottomColor="gray.100"
        shadow={1}>
        <HStack alignItems="center" space={2}>
          <Image
            resizeMode="contain"
            source={images.logo}
            size="40px"
            alt="App Logo"
            borderRadius={8}
          />
          <HStack alignItems="center" space={1}>
            <Text fontSize="lg" fontFamily={'heading'} color="#2D9D78">
              {title}
            </Text>
            <MaterialCommunityIcons name="paw" size={18} color="#6FE5A9" />
          </HStack>
        </HStack>

        <HStack alignItems="center" space={3}>
          {/* Notifications */}
          <TouchableOpacity>
            <Box position="relative">
              <Ionicons
                name="notifications-outline"
                size={26}
                color="#374151"
              />
              <Box
                position="absolute"
                top={-2}
                right={-2}
                bg="red.500"
                borderRadius="full"
                width={4}
                height={4}
                borderWidth={1.5}
                borderColor="white"
              />
            </Box>
          </TouchableOpacity>

          {/* Messages */}
          <TouchableOpacity>
            <Box position="relative">
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={24}
                color="#374151"
              />
              <Box
                position="absolute"
                top={-4}
                right={-6}
                bg="#6FE5A9"
                borderRadius="full"
                px={1.5}
                py={0.5}
                minWidth={5}
                alignItems="center"
                justifyContent="center">
                <Text fontSize="2xs" color="white" fontWeight="bold">
                  3
                </Text>
              </Box>
            </Box>
          </TouchableOpacity>
        </HStack>
      </Box>
    </>
  );
};

export default Header;
