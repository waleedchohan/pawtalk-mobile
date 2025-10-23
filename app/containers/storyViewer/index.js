import React, {useState, useEffect, useRef} from 'react';
import {
  Box,
  Text,
  VStack,
  HStack,
  Avatar,
  Image,
  Input,
} from 'native-base';
import {
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
  Animated,
  Modal,
  TextInput as RNTextInput,
  Platform,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../themes/Colors';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

// Sample story data with multiple stories per user
const storiesData = [
  {
    id: 1,
    petName: 'Buddy',
    petType: 'Golden Retriever',
    avatar: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=100',
    stories: [
      {
        id: 1,
        image:
          'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800',
        duration: 5000,
        timestamp: '2h ago',
      },
      {
        id: 2,
        image:
          'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800',
        duration: 5000,
        timestamp: '1h ago',
      },
    ],
  },
  {
    id: 2,
    petName: 'Whiskers',
    petType: 'Persian Cat',
    avatar:
      'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=100',
    stories: [
      {
        id: 3,
        image:
          'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800',
        duration: 5000,
        timestamp: '3h ago',
      },
    ],
  },
];

function StoryViewer({navigation, route}) {
  const initialStoryIndex = route?.params?.storyIndex || 0;
  const storiesSet = storiesData;

  const [currentUserIndex, setCurrentUserIndex] = useState(initialStoryIndex);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState('');

  const progressAnims = useRef([]).current;
  const currentUser = storiesSet[currentUserIndex];
  const currentStory = currentUser?.stories[currentStoryIndex];

  // Initialize progress animations
  useEffect(() => {
    currentUser?.stories.forEach((_, index) => {
      if (!progressAnims[index]) {
        progressAnims[index] = new Animated.Value(0);
      }
    });
  }, [currentUserIndex]);

  // Story progress animation
  useEffect(() => {
    if (!currentStory || isPaused) return;

    const anim = progressAnims[currentStoryIndex];
    anim.setValue(0);

    const animation = Animated.timing(anim, {
      toValue: 1,
      duration: currentStory.duration,
      useNativeDriver: false,
    });

    animation.start(({finished}) => {
      if (finished) {
        handleNext();
      }
    });

    return () => animation.stop();
  }, [currentStoryIndex, currentUserIndex, isPaused]);

  const handleNext = () => {
    if (currentStoryIndex < currentUser.stories.length - 1) {
      // Next story in current user's stories
      setCurrentStoryIndex(currentStoryIndex + 1);
    } else if (currentUserIndex < storiesSet.length - 1) {
      // Next user's stories
      setCurrentUserIndex(currentUserIndex + 1);
      setCurrentStoryIndex(0);
    } else {
      // End of all stories
      navigation.goBack();
    }
  };

  const handlePrevious = () => {
    if (currentStoryIndex > 0) {
      // Previous story in current user's stories
      setCurrentStoryIndex(currentStoryIndex - 1);
    } else if (currentUserIndex > 0) {
      // Previous user's last story
      setCurrentUserIndex(currentUserIndex - 1);
      setCurrentStoryIndex(storiesSet[currentUserIndex - 1].stories.length - 1);
    }
  };

  const handleTap = event => {
    const x = event.nativeEvent.locationX;
    if (x < screenWidth / 2) {
      handlePrevious();
    } else {
      handleNext();
    }
  };

  if (!currentUser || !currentStory) {
    navigation.goBack();
    return null;
  }

  return (
    <Modal visible={true} animationType="fade" statusBarTranslucent>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <Box flex={1} bg="black">
        {/* Story Image */}
        <TouchableOpacity
          activeOpacity={1}
          onPress={handleTap}
          onLongPress={() => setIsPaused(true)}
          onPressOut={() => setIsPaused(false)}
          style={styles.storyContainer}>
          <Image
            source={{uri: currentStory.image}}
            alt="Story"
            width="100%"
            height="100%"
            resizeMode="contain"
          />

          {/* Gradient Overlays */}
          <Box style={styles.topGradient} />
          <Box style={styles.bottomGradient} />

          {/* Header */}
          <Box style={styles.header}>
            {/* Progress Bars */}
            <HStack space={1} mb={3}>
              {currentUser.stories.map((_, index) => (
                <Box
                  key={index}
                  flex={1}
                  height={0.5}
                  bg="rgba(255,255,255,0.3)"
                  borderRadius={2}
                  overflow="hidden">
                  <Animated.View
                    style={{
                      height: '100%',
                      backgroundColor: 'white',
                      width:
                        index === currentStoryIndex
                          ? progressAnims[currentStoryIndex]?.interpolate({
                              inputRange: [0, 1],
                              outputRange: ['0%', '100%'],
                            })
                          : index < currentStoryIndex
                          ? '100%'
                          : '0%',
                    }}
                  />
                </Box>
              ))}
            </HStack>

            {/* User Info and Controls */}
            <HStack alignItems="center" justifyContent="space-between">
              <HStack alignItems="center" space={3} flex={1}>
                <Avatar
                  source={{uri: currentUser.avatar}}
                  size="sm"
                  borderWidth={2}
                  borderColor="white"
                />
                <VStack>
                  <Text fontSize="sm" fontFamily="heading" color="white">
                    {currentUser.petName}
                  </Text>
                  <Text fontSize="xs" color="rgba(255,255,255,0.8)">
                    {currentStory.timestamp}
                  </Text>
                </VStack>
              </HStack>

              <HStack space={3}>
                <TouchableOpacity onPress={() => setIsPaused(!isPaused)}>
                  <Ionicons
                    name={isPaused ? 'play' : 'pause'}
                    size={24}
                    color="white"
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons name="close" size={28} color="white" />
                </TouchableOpacity>
              </HStack>
            </HStack>
          </Box>

          {/* Reply Input */}
          <Box style={styles.footer}>
            <HStack alignItems="center" space={3}>
              <Box flex={1}>
                <RNTextInput
                  placeholder={`Reply to ${currentUser.petName}...`}
                  placeholderTextColor="rgba(255,255,255,0.6)"
                  value={replyText}
                  onChangeText={setReplyText}
                  onFocus={() => setIsPaused(true)}
                  onBlur={() => setIsPaused(false)}
                  style={styles.replyInput}
                />
              </Box>
              <TouchableOpacity>
                <Ionicons name="heart-outline" size={28} color="white" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="paper-plane-outline" size={26} color="white" />
              </TouchableOpacity>
            </HStack>
          </Box>

          {/* Tap Zones Visual Feedback (optional) */}
          {isPaused && (
            <Box style={styles.pausedOverlay}>
              <Text fontSize="xs" color="white" opacity={0.7}>
                Hold to pause
              </Text>
            </Box>
          )}
        </TouchableOpacity>
      </Box>
    </Modal>
  );
}

const styles = StyleSheet.create({
  storyContainer: {
    flex: 1,
    width: screenWidth,
    height: screenHeight,
  },
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 150,
    background: 'linear-gradient(rgba(0,0,0,0.6), transparent)',
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    background: 'linear-gradient(transparent, rgba(0,0,0,0.6))',
  },
  header: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 20,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  footer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 40 : 20,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
  },
  replyInput: {
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.4)',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: 'white',
    fontSize: 14,
  },
  pausedOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -40}, {translateY: -12}],
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
});

export default StoryViewer;

