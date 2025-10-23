import React, {useState, useRef} from 'react';
import {
  Box,
  Text,
  VStack,
  HStack,
  Avatar,
  ScrollView,
  Image,
} from 'native-base';
import {
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  Alert,
  View,
} from 'react-native';
import {launchCamera} from 'react-native-image-picker';
import Video from 'react-native-video';
import Tts from 'react-native-tts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../themes/Colors';

const screenWidth = Dimensions.get('window').width;

// Sample translations for demo
const sampleTranslations = [
  "I'm so happy to see you! Let's play!",
  "I'm hungry, can I have some treats?",
  'I love you so much!',
  'That squirrel looks interesting...',
  'Can we go for a walk?',
];

function Translate({navigation}) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedVideo, setRecordedVideo] = useState(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translation, setTranslation] = useState('');
  const [selectedPet, setSelectedPet] = useState(null);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [showTranslationOverlay, setShowTranslationOverlay] = useState(false);
  const [showPetDropdown, setShowPetDropdown] = useState(false);
  const pulseAnim = useState(new Animated.Value(1))[0];
  const videoRef = useRef(null);

  // Sample user pets
  const userPets = [
    {
      id: 1,
      name: 'Buddy',
      type: 'Dog',
      avatar: 'https://picsum.photos/200?random=pet1',
    },
    {
      id: 2,
      name: 'Whiskers',
      type: 'Cat',
      avatar: 'https://picsum.photos/200?random=pet2',
    },
    {
      id: 3,
      name: 'Luna',
      type: 'Cat',
      avatar: 'https://picsum.photos/200?random=pet3',
    },
  ];

  // Pulse animation for recording
  React.useEffect(() => {
    if (isRecording) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isRecording]);

  // Initialize TTS on mount
  React.useEffect(() => {
    const initTTS = async () => {
      try {
        await Tts.getInitStatus();
        await Tts.setDefaultLanguage('en-US');
        await Tts.setDefaultRate(0.5);
        await Tts.setDefaultPitch(1.0);
      } catch (error) {
        console.log('TTS Init Error:', error);
      }
    };

    initTTS();

    return () => {
      try {
        Tts.stop();
        Tts.removeAllListeners('tts-finish');
      } catch (error) {
        console.log('TTS Cleanup Error:', error);
      }
    };
  }, []);

  const handleStartRecording = () => {
    if (!selectedPet) {
      Alert.alert('Select a Pet', 'Please select which pet you want to record');
      return;
    }

    const options = {
      mediaType: 'video',
      videoQuality: 'high',
      durationLimit: 15,
      saveToPhotos: false,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        return;
      }
      if (response.errorCode) {
        Alert.alert('Error', 'Failed to record video');
        return;
      }

      setRecordedVideo(response.assets[0]);
      setIsRecording(false);
      simulateTranslation();
    });

    setIsRecording(true);
  };

  const simulateTranslation = () => {
    setIsTranslating(true);
    setTimeout(() => {
      const randomTranslation =
        sampleTranslations[
          Math.floor(Math.random() * sampleTranslations.length)
        ];
      setTranslation(randomTranslation);
      setIsTranslating(false);
    }, 2000);
  };

  const handlePlayTranslation = async () => {
    try {
      // Show video with translation overlay
      setIsPlayingVideo(true);
      setShowTranslationOverlay(true);

      // Add listener before speaking
      const finishListener = () => {
        setIsPlayingVideo(false);
        setShowTranslationOverlay(false);
        Tts.removeEventListener('tts-finish', finishListener);
      };

      Tts.addEventListener('tts-finish', finishListener);

      // Small delay then speak
      setTimeout(async () => {
        try {
          await Tts.speak(translation);
        } catch (speakError) {
          console.log('TTS Speak Error:', speakError);
          // Video still plays even if TTS fails
        }
      }, 500);
    } catch (error) {
      console.log('TTS Error:', error);
      // Still show video even if TTS fails
      setIsPlayingVideo(true);
      setShowTranslationOverlay(true);
    }
  };

  const handleStopPlayback = () => {
    try {
      Tts.stop();
    } catch (error) {
      console.log('TTS Stop Error:', error);
    }
    setIsPlayingVideo(false);
    setShowTranslationOverlay(false);
  };

  const handlePost = () => {
    Alert.alert(
      'Post Translation',
      `Your pet's voice translation will be posted to your feed!`,
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Post',
          onPress: () => {
            // Reset state
            setRecordedVideo(null);
            setTranslation('');
            setSelectedPet(null);
            // Navigate to home
            navigation.navigate('Home');
          },
        },
      ],
    );
  };

  const PetDropdownItem = ({pet}) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedPet(pet);
        setShowPetDropdown(false);
      }}>
      <HStack
        alignItems="center"
        space={3}
        p={3}
        mb={2}
        borderRadius={12}
        bg={selectedPet?.id === pet.id ? '#E8FAF3' : 'transparent'}
        borderWidth={2}
        borderColor={
          selectedPet?.id === pet.id ? Colors.primary : 'transparent'
        }>
        <Box width={45} height={45} borderRadius={22.5} overflow="hidden">
          <Image
            source={{uri: pet.avatar}}
            alt={pet.name}
            width={45}
            height={45}
            resizeMode="cover"
          />
        </Box>
        <VStack flex={1}>
          <Text fontSize="md" fontFamily="heading" color="gray.800">
            {pet.name}
          </Text>
          <Text fontSize="xs" color="gray.600">
            {pet.type}
          </Text>
        </VStack>
        {selectedPet?.id === pet.id && (
          <Ionicons name="checkmark-circle" size={24} color={Colors.primary} />
        )}
      </HStack>
    </TouchableOpacity>
  );

  return (
    <Box flex={1} bg="#F9FAFB">
      {/* Header */}
      <Box bg="white" pt={12} pb={4} px={5} shadow={2}>
        <HStack alignItems="center" justifyContent="space-between">
          <VStack>
            <Text fontSize="2xl" fontFamily="heading" color="gray.800">
              PawTalk 🐾
            </Text>
            <Text fontSize="xs" color="gray.500" mt={0.5}>
              Translate your pet's voice
            </Text>
          </VStack>
          <TouchableOpacity>
            <Ionicons
              name="information-circle-outline"
              size={26}
              color="#374151"
            />
          </TouchableOpacity>
        </HStack>
      </Box>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 100}}>
        {/* How It Works */}
        <Box bg="white" mx={4} mt={4} borderRadius={16} p={4} shadow={1}>
          <HStack alignItems="center" space={2} mb={3}>
            <Box bg={`${Colors.primary}15`} p={2} borderRadius="full">
              <MaterialCommunityIcons
                name="lightbulb-on"
                size={20}
                color={Colors.primary}
              />
            </Box>
            <Text fontSize="md" fontFamily="heading" color="gray.800">
              How It Works
            </Text>
          </HStack>
          <VStack space={2}>
            <HStack space={3} alignItems="center">
              <Box
                bg={Colors.primary}
                width={6}
                height={6}
                borderRadius="full"
                alignItems="center"
                justifyContent="center">
                <Text fontSize="xs" fontFamily="heading" color="white">
                  1
                </Text>
              </Box>
              <Text fontSize="sm" color="gray.700" flex={1}>
                Select your pet
              </Text>
            </HStack>
            <HStack space={3} alignItems="center">
              <Box
                bg={Colors.primary}
                width={6}
                height={6}
                borderRadius="full"
                alignItems="center"
                justifyContent="center">
                <Text fontSize="xs" fontFamily="heading" color="white">
                  2
                </Text>
              </Box>
              <Text fontSize="sm" color="gray.700" flex={1}>
                Record a short video (up to 15 seconds)
              </Text>
            </HStack>
            <HStack space={3} alignItems="center">
              <Box
                bg={Colors.primary}
                width={6}
                height={6}
                borderRadius="full"
                alignItems="center"
                justifyContent="center">
                <Text fontSize="xs" fontFamily="heading" color="white">
                  3
                </Text>
              </Box>
              <Text fontSize="sm" color="gray.700" flex={1}>
                AI translates your pet's voice to human language
              </Text>
            </HStack>
            <HStack space={3} alignItems="center">
              <Box
                bg={Colors.primary}
                width={6}
                height={6}
                borderRadius="full"
                alignItems="center"
                justifyContent="center">
                <Text fontSize="xs" fontFamily="heading" color="white">
                  4
                </Text>
              </Box>
              <Text fontSize="sm" color="gray.700" flex={1}>
                Share with your friends!
              </Text>
            </HStack>
          </VStack>
        </Box>

        {/* Select Pet Dropdown */}
        <Box bg="white" mx={4} mt={4} borderRadius={16} p={4} shadow={1}>
          <HStack alignItems="center" space={2} mb={3}>
            <Box bg={`${Colors.primary}15`} p={2} borderRadius="full">
              <MaterialCommunityIcons
                name="paw"
                size={18}
                color={Colors.primary}
              />
            </Box>
            <Text fontSize="md" fontFamily="heading" color="gray.800">
              Select Your Pet
            </Text>
          </HStack>

          {/* Dropdown Trigger */}
          <TouchableOpacity
            onPress={() => setShowPetDropdown(!showPetDropdown)}>
            <HStack
              alignItems="center"
              space={3}
              p={3}
              borderRadius={12}
              bg={selectedPet ? '#E8FAF3' : 'gray.50'}
              borderWidth={2}
              borderColor={selectedPet ? Colors.primary : '#E5E7EB'}>
              {selectedPet ? (
                <>
                  <Box
                    width={45}
                    height={45}
                    borderRadius={22.5}
                    overflow="hidden">
                    <Image
                      source={{uri: selectedPet.avatar}}
                      alt={selectedPet.name}
                      width={45}
                      height={45}
                      resizeMode="cover"
                    />
                  </Box>
                  <VStack flex={1}>
                    <Text fontSize="md" fontFamily="heading" color="gray.800">
                      {selectedPet.name}
                    </Text>
                    <Text fontSize="xs" color="gray.600">
                      {selectedPet.type}
                    </Text>
                  </VStack>
                </>
              ) : (
                <HStack flex={1} alignItems="center" space={2}>
                  <Box
                    width={45}
                    height={45}
                    borderRadius={22.5}
                    bg="gray.200"
                    alignItems="center"
                    justifyContent="center">
                    <MaterialCommunityIcons
                      name="paw"
                      size={24}
                      color="#9CA3AF"
                    />
                  </Box>
                  <Text fontSize="md" color="gray.500">
                    Choose your pet
                  </Text>
                </HStack>
              )}
              <Ionicons
                name={showPetDropdown ? 'chevron-up' : 'chevron-down'}
                size={24}
                color="#6B7280"
              />
            </HStack>
          </TouchableOpacity>

          {/* Dropdown List */}
          {showPetDropdown && (
            <VStack space={0} mt={3}>
              {userPets.map(pet => (
                <PetDropdownItem key={pet.id} pet={pet} />
              ))}
            </VStack>
          )}
        </Box>

        {/* Recording Section */}
        <Box bg="white" mx={4} mt={4} borderRadius={16} p={6} shadow={1}>
          {!recordedVideo && !translation ? (
            <VStack space={6} alignItems="center">
              {/* Elegant Recording Button */}
              <Animated.View
                style={{
                  transform: [{scale: isRecording ? pulseAnim : 1}],
                }}>
                <TouchableOpacity
                  onPress={handleStartRecording}
                  activeOpacity={0.85}
                  disabled={!selectedPet}>
                  <View style={styles.recordButtonContainer}>
                    {/* Outer Ring */}
                    <View
                      style={[
                        styles.outerRing,
                        {
                          backgroundColor: selectedPet
                            ? 'rgba(111, 229, 169, 0.08)'
                            : 'transparent',
                          borderColor: selectedPet
                            ? 'rgba(111, 229, 169, 0.4)'
                            : '#E5E7EB',
                        },
                      ]}>
                      {/* Middle Ring */}
                      <View
                        style={[
                          styles.middleRing,
                          {
                            backgroundColor: selectedPet
                              ? 'rgba(111, 229, 169, 0.15)'
                              : '#F9FAFB',
                          },
                        ]}>
                        {/* Inner Circle with Icon */}
                        <View
                          style={[
                            styles.innerCircle,
                            {
                              backgroundColor: selectedPet
                                ? Colors.primary
                                : '#E5E7EB',
                            },
                          ]}>
                          <MaterialCommunityIcons
                            name="microphone"
                            size={50}
                            color={selectedPet ? 'white' : '#9CA3AF'}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </Animated.View>

              <VStack alignItems="center" space={2}>
                <Text fontSize="xl" fontFamily="heading" color="gray.800">
                  {!selectedPet ? 'Select a pet to start' : 'Tap to Record'}
                </Text>
                <Text fontSize="sm" color="gray.500" textAlign="center" px={4}>
                  {!selectedPet
                    ? 'Choose which pet you want to record first'
                    : "Capture your pet's voice for translation"}
                </Text>
              </VStack>

              {/* Quick Tips */}
              <Box bg="#FEF3C7" borderRadius={12} p={3} mt={2} width="100%">
                <HStack space={2} alignItems="flex-start">
                  <MaterialCommunityIcons
                    name="lightbulb-on-outline"
                    size={18}
                    color="#F59E0B"
                  />
                  <VStack flex={1}>
                    <Text fontSize="xs" fontFamily="heading" color="#92400E">
                      Pro Tip
                    </Text>
                    <Text fontSize="xs" color="#78350F" mt={0.5}>
                      Record when your pet is barking, meowing, or making sounds
                      for best results!
                    </Text>
                  </VStack>
                </HStack>
              </Box>
            </VStack>
          ) : isTranslating ? (
            /* Translating State */
            <VStack space={4} alignItems="center" py={6}>
              <Box
                width={100}
                height={100}
                borderRadius={50}
                bg={`${Colors.primary}15`}
                alignItems="center"
                justifyContent="center">
                <MaterialCommunityIcons
                  name="robot"
                  size={50}
                  color={Colors.primary}
                />
              </Box>
              <VStack alignItems="center" space={1}>
                <Text fontSize="lg" fontFamily="heading" color="gray.800">
                  Translating...
                </Text>
                <Text fontSize="sm" color="gray.500" textAlign="center">
                  AI is analyzing your pet's voice
                </Text>
              </VStack>
              {/* Loading dots */}
              <HStack space={2}>
                {[0, 1, 2].map(i => (
                  <Box
                    key={i}
                    width={2}
                    height={2}
                    borderRadius="full"
                    bg={Colors.primary}
                  />
                ))}
              </HStack>
            </VStack>
          ) : (
            /* Translation Result */
            <VStack space={4}>
              {/* Recorded Video Preview */}
              {recordedVideo && (
                <Box
                  borderRadius={16}
                  overflow="hidden"
                  bg="gray.900"
                  shadow={3}>
                  <Box
                    width="100%"
                    height={screenWidth * 0.7}
                    bg="gray.900"
                    position="relative">
                    {/* Video Player */}
                    <Video
                      ref={videoRef}
                      source={{uri: recordedVideo.uri}}
                      style={{
                        width: '100%',
                        height: '100%',
                      }}
                      paused={!isPlayingVideo}
                      repeat={true}
                      resizeMode="cover"
                      volume={1.0}
                      onError={error => console.log('Video Error:', error)}
                    />

                    {/* Play Overlay */}
                    {!isPlayingVideo && (
                      <Box
                        position="absolute"
                        top="50%"
                        left="50%"
                        style={{
                          transform: [{translateX: -30}, {translateY: -30}],
                        }}>
                        <TouchableOpacity
                          style={styles.videoPlayButton}
                          onPress={handlePlayTranslation}>
                          <Ionicons name="play" size={32} color="white" />
                        </TouchableOpacity>
                      </Box>
                    )}

                    {/* Translation Overlay (shown when playing) */}
                    {isPlayingVideo && showTranslationOverlay && (
                      <Box
                        position="absolute"
                        bottom={0}
                        left={0}
                        right={0}
                        bg="rgba(0,0,0,0.8)"
                        p={4}>
                        <HStack alignItems="center" space={2} mb={2}>
                          <Box bg={Colors.primary} p={1.5} borderRadius="full">
                            <Ionicons
                              name="volume-high"
                              size={16}
                              color="white"
                            />
                          </Box>
                          <Text
                            fontSize="xs"
                            fontFamily="heading"
                            color="white">
                            {selectedPet?.name}
                          </Text>
                        </HStack>
                        <Text
                          fontSize="md"
                          color="white"
                          fontFamily="heading"
                          textAlign="center">
                          "{translation}"
                        </Text>
                      </Box>
                    )}

                    {/* Duration Badge */}
                    <Box
                      position="absolute"
                      top={8}
                      right={8}
                      bg="rgba(0,0,0,0.7)"
                      px={2}
                      py={1}
                      borderRadius={6}>
                      <Text fontSize="xs" color="white" fontFamily="heading">
                        {recordedVideo.duration
                          ? `${Math.floor(recordedVideo.duration)}s`
                          : '0:15'}
                      </Text>
                    </Box>

                    {/* Playing Indicator */}
                    {isPlayingVideo && (
                      <Box
                        position="absolute"
                        top={8}
                        left={8}
                        bg={Colors.primary}
                        px={2}
                        py={1}
                        borderRadius={6}>
                        <HStack alignItems="center" space={1}>
                          <Box
                            width={2}
                            height={2}
                            borderRadius="full"
                            bg="white"
                          />
                          <Text
                            fontSize="xs"
                            color="white"
                            fontFamily="heading">
                            Playing
                          </Text>
                        </HStack>
                      </Box>
                    )}
                  </Box>
                </Box>
              )}

              {/* Success Badge */}
              <HStack
                alignItems="center"
                justifyContent="center"
                space={2}
                bg={`${Colors.primary}10`}
                py={2}
                px={4}
                borderRadius={12}>
                <MaterialCommunityIcons
                  name="check-circle"
                  size={20}
                  color={Colors.primary}
                />
                <Text fontSize="sm" fontFamily="heading" color={Colors.primary}>
                  Translation Complete!
                </Text>
              </HStack>

              {/* Translation Bubble */}
              <Box
                bg="white"
                borderRadius={16}
                p={4}
                borderWidth={2}
                borderColor={Colors.primary}
                shadow={2}>
                <HStack alignItems="center" space={2} mb={3}>
                  <Avatar
                    source={{uri: selectedPet?.avatar}}
                    size="sm"
                    bg="gray.200"
                  />
                  <VStack>
                    <Text fontSize="sm" fontFamily="heading" color="gray.800">
                      {selectedPet?.name} says:
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      {selectedPet?.type}
                    </Text>
                  </VStack>
                </HStack>
                <Text fontSize="lg" color="gray.800" lineHeight={24}>
                  "{translation}"
                </Text>
              </Box>

              {/* Voice Playback - Only show if video not playing */}
              {!isPlayingVideo && (
                <TouchableOpacity
                  style={styles.playButton}
                  onPress={handlePlayTranslation}>
                  <HStack alignItems="center" space={3} justifyContent="center">
                    <Ionicons
                      name="play-circle"
                      size={28}
                      color={Colors.primary}
                    />
                    <Text
                      fontSize="md"
                      fontFamily="heading"
                      color={Colors.primary}>
                      Play Video with Translation
                    </Text>
                  </HStack>
                </TouchableOpacity>
              )}

              {/* Stop Playing Button */}
              {isPlayingVideo && (
                <TouchableOpacity
                  style={styles.stopButton}
                  onPress={handleStopPlayback}>
                  <HStack alignItems="center" space={3} justifyContent="center">
                    <Ionicons name="stop-circle" size={28} color="white" />
                    <Text fontSize="md" fontFamily="heading" color="white">
                      Stop Playback
                    </Text>
                  </HStack>
                </TouchableOpacity>
              )}

              {/* Action Buttons */}
              <HStack space={3}>
                <TouchableOpacity
                  style={styles.retryButton}
                  onPress={() => {
                    setRecordedVideo(null);
                    setTranslation('');
                  }}>
                  <HStack alignItems="center" space={2}>
                    <Ionicons name="refresh" size={20} color="#6B7280" />
                    <Text fontSize="sm" fontFamily="heading" color="gray.700">
                      Try Again
                    </Text>
                  </HStack>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.postButton}
                  onPress={handlePost}>
                  <HStack alignItems="center" space={2}>
                    <Ionicons name="paper-plane" size={20} color="white" />
                    <Text fontSize="sm" fontFamily="heading" color="white">
                      Post to Feed
                    </Text>
                  </HStack>
                </TouchableOpacity>
              </HStack>
            </VStack>
          )}
        </Box>

        {/* Recent Translations */}
        <Box bg="white" mx={4} mt={4} borderRadius={16} p={4} shadow={1}>
          <HStack alignItems="center" justifyContent="space-between" mb={3}>
            <Text fontSize="md" fontFamily="heading" color="gray.800">
              Recent Translations
            </Text>
            <TouchableOpacity>
              <Text fontSize="sm" color={Colors.primary} fontWeight="600">
                View All
              </Text>
            </TouchableOpacity>
          </HStack>

          <VStack space={3}>
            {/* Sample recent items */}
            {[
              {
                id: 1,
                pet: 'Buddy',
                translation: "Let's play fetch!",
                time: '2h ago',
                avatar: 'https://picsum.photos/200?random=pet1',
              },
              {
                id: 2,
                pet: 'Whiskers',
                translation: 'Feed me now, human!',
                time: '5h ago',
                avatar: 'https://picsum.photos/200?random=pet2',
              },
            ].map(item => (
              <TouchableOpacity key={item.id}>
                <HStack
                  space={3}
                  alignItems="center"
                  bg="#F9FAFB"
                  p={3}
                  borderRadius={12}>
                  <Avatar source={{uri: item.avatar}} size="sm" bg="gray.200" />
                  <VStack flex={1}>
                    <Text fontSize="sm" fontFamily="heading" color="gray.800">
                      {item.pet}
                    </Text>
                    <Text
                      fontSize="xs"
                      color="gray.600"
                      numberOfLines={1}
                      italic>
                      "{item.translation}"
                    </Text>
                  </VStack>
                  <Text fontSize="xs" color="gray.400">
                    {item.time}
                  </Text>
                </HStack>
              </TouchableOpacity>
            ))}
          </VStack>
        </Box>

        {/* Features Banner */}
        <Box mx={4} mt={4} mb={4}>
          <VStack space={3}>
            <HStack
              bg="white"
              borderRadius={12}
              p={4}
              shadow={1}
              alignItems="center"
              space={3}>
              <Box
                bg="#DBEAFE"
                p={3}
                borderRadius="full"
                alignItems="center"
                justifyContent="center">
                <MaterialCommunityIcons
                  name="brain"
                  size={28}
                  color="#3B82F6"
                />
              </Box>
              <VStack flex={1}>
                <Text fontSize="sm" fontFamily="heading" color="gray.800">
                  AI-Powered Translation
                </Text>
                <Text fontSize="xs" color="gray.600">
                  Advanced algorithms understand pet emotions
                </Text>
              </VStack>
            </HStack>

            <HStack
              bg="white"
              borderRadius={12}
              p={4}
              shadow={1}
              alignItems="center"
              space={3}>
              <Box
                bg="#FCE7F3"
                p={3}
                borderRadius="full"
                alignItems="center"
                justifyContent="center">
                <MaterialCommunityIcons
                  name="speedometer"
                  size={28}
                  color="#EC4899"
                />
              </Box>
              <VStack flex={1}>
                <Text fontSize="sm" fontFamily="heading" color="gray.800">
                  Instant Results
                </Text>
                <Text fontSize="xs" color="gray.600">
                  Get translations in seconds
                </Text>
              </VStack>
            </HStack>

            <HStack
              bg="white"
              borderRadius={12}
              p={4}
              shadow={1}
              alignItems="center"
              space={3}>
              <Box
                bg="#E0E7FF"
                p={3}
                borderRadius="full"
                alignItems="center"
                justifyContent="center">
                <MaterialCommunityIcons
                  name="share"
                  size={28}
                  color="#6366F1"
                />
              </Box>
              <VStack flex={1}>
                <Text fontSize="sm" fontFamily="heading" color="gray.800">
                  Share with Friends
                </Text>
                <Text fontSize="xs" color="gray.600">
                  Post translations to your feed
                </Text>
              </VStack>
            </HStack>
          </VStack>
        </Box>
      </ScrollView>
    </Box>
  );
}

const styles = StyleSheet.create({
  recordButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerRing: {
    width: 160,
    height: 160,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  middleRing: {
    width: 130,
    height: 130,
    borderRadius: 65,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  innerCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6FE5A9',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  videoPlayButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(111, 229, 169, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  playButton: {
    backgroundColor: `${Colors.primary}15`,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  stopButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 14,
    borderRadius: 12,
  },
  retryButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  postButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Translate;
