import React from 'react';
import {Box, Center, HStack, Icon, IconButton, Spacer, Text} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import colors from '../../themes/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const HeaderWithBackBtn = ({title = 'Gobig'}) => {
  const navigation = useNavigation();

  return (
    <Box safeAreaTop h={20} bg={'white'}>
      <Box flex={1} justifyContent="flex-start">
        <IconButton
          icon={
            <Icon
              as={MaterialIcons}
              name="chevron-left"
              size="sm"
              color={'white'}
            />
          }
          position="absolute"
          left={1}
          onPress={() => navigation.goBack()}
          bg="rgba(0, 0, 0, 0.5)"
          borderRadius="full"
        />
      </Box>

      {/* <Box flex={2} alignItems="center" justifyContent={'center'}>
          <Center>
            <Text fontFamily={'heading'} textAlign={'center'} fontSize={'lg'}>
              {title}
            </Text>
          </Center>
        </Box> */}
    </Box>
  );
};

export default HeaderWithBackBtn;
