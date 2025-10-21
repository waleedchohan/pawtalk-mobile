import React from 'react';
import {Box, Text, Center, VStack} from 'native-base';

function Translate({navigation}) {
  return (
    <Box flex={1} bg="white" safeAreaTop>
      <Center flex={1}>
        <VStack space={4} alignItems="center">
          <Text fontSize="2xl" fontFamily="heading" color="gray.800">
            Translate
          </Text>
          <Text fontSize="md" color="gray.600" textAlign="center">
            Translate pet sounds and communicate better
          </Text>
        </VStack>
      </Center>
    </Box>
  );
}

export default Translate;
