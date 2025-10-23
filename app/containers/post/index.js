import React, {useState} from 'react';
import {
  Box,
  Text,
  VStack,
  HStack,
  ScrollView,
  Avatar,
  Badge,
  Pressable,
  TextArea,
  Button,
  Image,
  Center,
  Icon,
  Radio,
  Divider,
} from 'native-base';
import {
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Platform,
  Alert,
  Modal,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';

const screenWidth = Dimensions.get('window').width;

// Sample user's pets data
const userPets = [
  {
    id: 1,
    name: 'Buddy',
    type: 'Golden Retriever',
    avatar: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=100',
  },
  {
    id: 2,
    name: 'Max',
    type: 'German Shepherd',
    avatar:
      'https://images.unsplash.com/photo-1568572933382-74d440642117?w=100',
  },
  {
    id: 3,
    name: 'Luna',
    type: 'Persian Cat',
    avatar:
      'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=100',
  },
];

function Post({navigation}) {
  const [selectedPet, setSelectedPet] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [showPetSelector, setShowPetSelector] = useState(false);
  const [showMediaOptions, setShowMediaOptions] = useState(false);

  // Handle image/video picker
  const handleMediaPicker = type => {
    const options = {
      mediaType: type === 'video' ? 'video' : 'photo',
      quality: 0.8,
      videoQuality: 'high',
    };

    setShowMediaOptions(false);

    if (type === 'camera') {
      launchCamera(options, response => {
        if (response.assets && response.assets[0]) {
          setSelectedMedia({
            uri: response.assets[0].uri,
            type: response.assets[0].type,
            fileName: response.assets[0].fileName,
          });
        }
      });
    } else {
      launchImageLibrary(options, response => {
        if (response.assets && response.assets[0]) {
          setSelectedMedia({
            uri: response.assets[0].uri,
            type: response.assets[0].type,
            fileName: response.assets[0].fileName,
          });
        }
      });
    }
  };

  const handlePost = () => {
    if (!selectedPet) {
      Alert.alert('Select Pet', 'Please select which pet this post is about');
      return;
    }
    if (!selectedMedia) {
      Alert.alert('Add Media', 'Please add a photo or video');
      return;
    }
    if (!caption.trim()) {
      Alert.alert('Add Caption', 'Please add a caption to your post');
      return;
    }

    // TODO: Handle post submission
    console.log('Posting...', {selectedPet, selectedMedia, caption, location});
    Alert.alert('Success', 'Post created successfully!');
    // Reset form
    setSelectedPet(null);
    setSelectedMedia(null);
    setCaption('');
    setLocation('');
  };

  return (
    <Box flex={1} bg="#F9FAFB">
      {/* Header */}
      <HStack
        safeAreaTop
        bg="white"
        px={4}
        py={3}
        alignItems="center"
        justifyContent="space-between"
        borderBottomWidth={1}
        borderBottomColor="gray.100"
        shadow={1}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={28} color="#374151" />
        </TouchableOpacity>
        <Text
          fontSize="lg"
          fontFamily="heading"
          fontWeight="semibold"
          color="gray.800">
          Create Post
        </Text>
        <TouchableOpacity
          onPress={handlePost}
          style={[
            styles.postButton,
            (!selectedPet || !selectedMedia || !caption.trim()) &&
              styles.postButtonDisabled,
          ]}>
          <Text fontSize="sm" fontWeight="bold" color="white">
            Post
          </Text>
        </TouchableOpacity>
      </HStack>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Pet Selector */}
        <Box bg="white" mb={2} p={4}>
          <Text fontSize="sm" fontWeight="semibold" color="gray.700" mb={3}>
            Select Pet *
          </Text>
          {selectedPet ? (
            <TouchableOpacity onPress={() => setShowPetSelector(true)}>
              <HStack
                alignItems="center"
                space={3}
                p={3}
                borderRadius={12}
                borderWidth={2}
                borderColor="#6FE5A9"
                bg="#E8FAF3">
                <Box width={50} height={50} borderRadius={25} overflow="hidden">
                  <Image
                    source={{uri: selectedPet.avatar}}
                    alt={selectedPet.name}
                    width={50}
                    height={50}
                    resizeMode="cover"
                  />
                </Box>
                <VStack flex={1}>
                  <Text fontSize="md" fontWeight="bold" color="gray.800">
                    {selectedPet.name}
                  </Text>
                  <Text fontSize="xs" color="gray.600">
                    {selectedPet.type}
                  </Text>
                </VStack>
                <Ionicons name="chevron-down" size={20} color="#6FE5A9" />
              </HStack>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setShowPetSelector(true)}>
              <HStack
                alignItems="center"
                justifyContent="center"
                p={4}
                borderRadius={12}
                borderWidth={2}
                borderStyle="dashed"
                borderColor="gray.300"
                bg="gray.50">
                <MaterialCommunityIcons name="paw" size={24} color="#9CA3AF" />
                <Text fontSize="sm" color="gray.500" ml={2}>
                  Tap to select your pet
                </Text>
              </HStack>
            </TouchableOpacity>
          )}
        </Box>

        {/* Media Section */}
        <Box bg="white" mb={2} p={4}>
          <Text fontSize="sm" fontWeight="semibold" color="gray.700" mb={3}>
            Add Photo/Video *
          </Text>
          {selectedMedia ? (
            <Box position="relative" borderRadius={16} overflow="hidden">
              <Image
                source={{uri: selectedMedia.uri}}
                alt="Selected media"
                width="100%"
                height={screenWidth - 32}
                resizeMode="cover"
              />
              {selectedMedia.type?.includes('video') && (
                <Center
                  position="absolute"
                  top={0}
                  left={0}
                  right={0}
                  bottom={0}
                  bg="rgba(0,0,0,0.3)">
                  <Box bg="white" borderRadius="full" p={4}>
                    <Ionicons name="play" size={32} color="#6FE5A9" />
                  </Box>
                </Center>
              )}
              <TouchableOpacity
                style={styles.removeMediaButton}
                onPress={() => setSelectedMedia(null)}>
                <Ionicons name="close-circle" size={32} color="white" />
              </TouchableOpacity>
            </Box>
          ) : (
            <TouchableOpacity onPress={() => setShowMediaOptions(true)}>
              <Center
                height={screenWidth - 32}
                borderRadius={16}
                borderWidth={2}
                borderStyle="dashed"
                borderColor="gray.300"
                bg="gray.50">
                <VStack alignItems="center" space={2}>
                  <Box bg="#E8FAF3" p={4} borderRadius="full">
                    <Ionicons name="images-outline" size={32} color="#6FE5A9" />
                  </Box>
                  <Text fontSize="sm" fontWeight="medium" color="gray.700">
                    Add Photo or Video
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    Tap to select from gallery or camera
                  </Text>
                </VStack>
              </Center>
            </TouchableOpacity>
          )}
        </Box>

        {/* Caption Input */}
        <Box bg="white" mb={2} p={4}>
          <Text fontSize="sm" fontWeight="semibold" color="gray.700" mb={3}>
            Caption *
          </Text>
          <TextArea
            value={caption}
            onChangeText={setCaption}
            placeholder="Share something about your pet... Add #hashtags"
            placeholderTextColor="#9CA3AF"
            fontSize="md"
            borderRadius={12}
            borderColor="gray.300"
            _focus={{
              borderColor: '#6FE5A9',
              bg: 'white',
            }}
            h={32}
            autoCompleteType="off"
            totalLines={8}
          />
          <HStack justifyContent="space-between" mt={2}>
            <Text fontSize="xs" color="gray.500">
              Use hashtags to reach more pet lovers
            </Text>
            <Text
              fontSize="xs"
              color={caption.length > 500 ? 'red.500' : 'gray.500'}>
              {caption.length}/500
            </Text>
          </HStack>
        </Box>

        {/* Additional Options */}
        <Box bg="white" mb={2}>
          {/* Location */}
          <TouchableOpacity>
            <HStack
              alignItems="center"
              justifyContent="space-between"
              px={4}
              py={4}
              borderBottomWidth={1}
              borderBottomColor="gray.100">
              <HStack alignItems="center" space={3}>
                <Box bg="#FFF4E6" p={2} borderRadius="full">
                  <Ionicons name="location-outline" size={20} color="#FC905F" />
                </Box>
                <VStack>
                  <Text fontSize="sm" fontWeight="medium" color="gray.800">
                    Add Location
                  </Text>
                  {location && (
                    <Text fontSize="xs" color="gray.600">
                      {location}
                    </Text>
                  )}
                </VStack>
              </HStack>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </HStack>
          </TouchableOpacity>

          {/* Tag Pets */}
          <TouchableOpacity>
            <HStack
              alignItems="center"
              justifyContent="space-between"
              px={4}
              py={4}
              borderBottomWidth={1}
              borderBottomColor="gray.100">
              <HStack alignItems="center" space={3}>
                <Box bg="#E8FAF3" p={2} borderRadius="full">
                  <MaterialCommunityIcons
                    name="paw"
                    size={20}
                    color="#6FE5A9"
                  />
                </Box>
                <Text fontSize="sm" fontWeight="medium" color="gray.800">
                  Tag Other Pets
                </Text>
              </HStack>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </HStack>
          </TouchableOpacity>

          {/* Advanced Settings */}
          <TouchableOpacity>
            <HStack
              alignItems="center"
              justifyContent="space-between"
              px={4}
              py={4}>
              <HStack alignItems="center" space={3}>
                <Box bg="#E7F4FC" p={2} borderRadius="full">
                  <Ionicons name="settings-outline" size={20} color="#0A1849" />
                </Box>
                <Text fontSize="sm" fontWeight="medium" color="gray.800">
                  Advanced Settings
                </Text>
              </HStack>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </HStack>
          </TouchableOpacity>
        </Box>

        {/* Tips */}
        <Box bg="#E8FAF3" mx={4} mb={6} p={4} borderRadius={12}>
          <HStack alignItems="flex-start" space={2}>
            <Ionicons name="bulb" size={20} color="#2D9D78" />
            <VStack flex={1}>
              <Text fontSize="sm" fontWeight="semibold" color="#2D9D78" mb={1}>
                Tips for great posts
              </Text>
              <Text fontSize="xs" color="gray.700">
                • Use clear, well-lit photos{'\n'}• Add engaging captions with
                emojis{'\n'}• Include relevant hashtags{'\n'}• Tag location for
                local pet community
              </Text>
            </VStack>
          </HStack>
        </Box>
      </ScrollView>

      {/* Pet Selector Modal */}
      <Modal
        visible={showPetSelector}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowPetSelector(false)}>
        <Box
          flex={1}
          bg="rgba(0,0,0,0.5)"
          justifyContent="flex-end"
          onTouchEnd={() => setShowPetSelector(false)}>
          <Box
            bg="white"
            borderTopLeftRadius={20}
            borderTopRightRadius={20}
            maxH="80%"
            onTouchEnd={e => e.stopPropagation()}>
            <HStack
              alignItems="center"
              justifyContent="space-between"
              p={4}
              borderBottomWidth={1}
              borderBottomColor="gray.200">
              <Text fontSize="lg" fontWeight="bold" color="gray.800">
                Select Your Pet
              </Text>
              <TouchableOpacity onPress={() => setShowPetSelector(false)}>
                <Ionicons name="close" size={28} color="#374151" />
              </TouchableOpacity>
            </HStack>

            <ScrollView showsVerticalScrollIndicator={false} p={4}>
              <VStack space={3} pb={4}>
                {userPets.map(pet => (
                  <TouchableOpacity
                    key={pet.id}
                    onPress={() => {
                      setSelectedPet(pet);
                      setShowPetSelector(false);
                    }}>
                    <HStack
                      alignItems="center"
                      space={3}
                      p={3}
                      borderRadius={12}
                      bg={selectedPet?.id === pet.id ? '#E8FAF3' : 'gray.50'}
                      borderWidth={2}
                      borderColor={
                        selectedPet?.id === pet.id ? '#6FE5A9' : 'transparent'
                      }>
                      <Box
                        width={50}
                        height={50}
                        borderRadius={25}
                        overflow="hidden">
                        <Image
                          source={{uri: pet.avatar}}
                          alt={pet.name}
                          width={50}
                          height={50}
                          resizeMode="cover"
                        />
                      </Box>
                      <VStack flex={1}>
                        <Text fontSize="md" fontWeight="bold" color="gray.800">
                          {pet.name}
                        </Text>
                        <Text fontSize="xs" color="gray.600">
                          {pet.type}
                        </Text>
                      </VStack>
                      {selectedPet?.id === pet.id && (
                        <Ionicons
                          name="checkmark-circle"
                          size={24}
                          color="#6FE5A9"
                        />
                      )}
                    </HStack>
                  </TouchableOpacity>
                ))}

                <Divider my={2} />

                <TouchableOpacity>
                  <HStack
                    alignItems="center"
                    justifyContent="center"
                    space={2}
                    p={3}
                    borderRadius={12}
                    borderWidth={2}
                    borderStyle="dashed"
                    borderColor="#6FE5A9">
                    <Ionicons
                      name="add-circle-outline"
                      size={24}
                      color="#6FE5A9"
                    />
                    <Text fontSize="sm" fontWeight="semibold" color="#6FE5A9">
                      Add New Pet
                    </Text>
                  </HStack>
                </TouchableOpacity>
              </VStack>
            </ScrollView>
          </Box>
        </Box>
      </Modal>

      {/* Media Options Modal */}
      <Modal
        visible={showMediaOptions}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowMediaOptions(false)}>
        <Box
          flex={1}
          bg="rgba(0,0,0,0.5)"
          justifyContent="flex-end"
          onTouchEnd={() => setShowMediaOptions(false)}>
          <Box
            bg="white"
            borderTopLeftRadius={20}
            borderTopRightRadius={20}
            onTouchEnd={e => e.stopPropagation()}>
            <HStack
              alignItems="center"
              justifyContent="space-between"
              p={4}
              borderBottomWidth={1}
              borderBottomColor="gray.200">
              <Text fontSize="lg" fontWeight="bold" color="gray.800">
                Add Photo/Video
              </Text>
              <TouchableOpacity onPress={() => setShowMediaOptions(false)}>
                <Ionicons name="close" size={28} color="#374151" />
              </TouchableOpacity>
            </HStack>

            <VStack space={3} p={4} pb={6}>
              <TouchableOpacity onPress={() => handleMediaPicker('camera')}>
                <HStack
                  alignItems="center"
                  space={3}
                  p={4}
                  borderRadius={12}
                  bg="gray.50">
                  <Box bg="#E8FAF3" p={3} borderRadius="full">
                    <Ionicons name="camera-outline" size={24} color="#6FE5A9" />
                  </Box>
                  <VStack>
                    <Text fontSize="md" fontWeight="semibold" color="gray.800">
                      Take Photo/Video
                    </Text>
                    <Text fontSize="xs" color="gray.600">
                      Open camera
                    </Text>
                  </VStack>
                </HStack>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handleMediaPicker('photo')}>
                <HStack
                  alignItems="center"
                  space={3}
                  p={4}
                  borderRadius={12}
                  bg="gray.50">
                  <Box bg="#FFE8F1" p={3} borderRadius="full">
                    <Ionicons name="images-outline" size={24} color="#EC4899" />
                  </Box>
                  <VStack>
                    <Text fontSize="md" fontWeight="semibold" color="gray.800">
                      Choose from Gallery
                    </Text>
                    <Text fontSize="xs" color="gray.600">
                      Select photo or video
                    </Text>
                  </VStack>
                </HStack>
              </TouchableOpacity>
            </VStack>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

const styles = StyleSheet.create({
  postButton: {
    backgroundColor: '#6FE5A9',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  postButtonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  removeMediaButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 16,
  },
});

export default Post;
