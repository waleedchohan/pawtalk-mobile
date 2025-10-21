import React, {useState} from 'react';
import {
  Box,
  ScrollView,
  Text,
  VStack,
  HStack,
  Pressable,
  Divider,
  Center,
  Image,
  Avatar,
  Badge,
  Icon,
} from 'native-base';
import {Dimensions, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../../components/header/Header';

const screenWidth = Dimensions.get('window').width;

// Sample stories data
const sampleStories = [
  {
    id: 0,
    isAddStory: true,
    petName: 'Your Story',
    avatar: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=100',
  },
  {
    id: 1,
    petName: 'Buddy',
    petType: 'Golden Retriever',
    avatar: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=100',
    hasNewStory: true,
  },
  {
    id: 2,
    petName: 'Whiskers',
    petType: 'Persian Cat',
    avatar:
      'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=100',
    hasNewStory: true,
  },
  {
    id: 3,
    petName: 'Charlie',
    petType: 'Border Collie',
    avatar:
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=100',
    hasNewStory: true,
  },
  {
    id: 4,
    petName: 'Luna',
    petType: 'Siamese Cat',
    avatar:
      'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=100',
    hasNewStory: false,
  },
  {
    id: 5,
    petName: 'Max',
    petType: 'Husky',
    avatar:
      'https://images.unsplash.com/photo-1568572933382-74d440642117?w=100',
    hasNewStory: true,
  },
];

// Sample pet posts data
const samplePosts = [
  {
    id: 1,
    petName: 'Buddy',
    petType: 'Golden Retriever',
    ownerName: 'Sarah Johnson',
    location: 'Central Park, NY',
    avatar: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=100',
    images: [
      'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800',
      'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800',
    ],
    caption:
      "Buddy loves his morning walks! 🌞 Today we discovered a new trail and he was so excited! Can't wait to explore more. #GoldenRetriever #DogLife #MorningWalks",
    likes: 342,
    comments: 28,
    shares: 13,
    timeAgo: '2h ago',
    isLiked: false,
    isSaved: false,
    tags: ['#GoldenRetriever', '#DogLife', '#MorningWalks'],
  },
  {
    id: 2,
    petName: 'Whiskers',
    petType: 'Persian Cat',
    ownerName: 'Mike Chen',
    location: 'Home Sweet Home',
    avatar:
      'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=100',
    images: [
      'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800',
    ],
    caption:
      'Nap time is the best time! 😴 Whiskers found the perfect sunny spot for his afternoon nap. Look at that peaceful face! 💤 #CatNap #PersianCat #Blessed',
    likes: 567,
    comments: 42,
    shares: 25,
    timeAgo: '4h ago',
    isLiked: true,
    isSaved: true,
    tags: ['#CatNap', '#PersianCat', '#Blessed'],
  },
  {
    id: 3,
    petName: 'Charlie',
    petType: 'Border Collie',
    ownerName: 'Emma Davis',
    location: 'Sunny Beach, CA',
    avatar:
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=100',
    images: [
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800',
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800',
      'https://images.unsplash.com/photo-1558788353-f76d92427f16?w=800',
    ],
    caption:
      'Training session success! 🎉 Charlie learned a new trick today! He can now roll over on command. So proud of my smart boy! 🐕 #BorderCollie #DogTraining #SmartDog',
    likes: 789,
    comments: 65,
    shares: 37,
    timeAgo: '6h ago',
    isLiked: false,
    isSaved: false,
    tags: ['#BorderCollie', '#DogTraining', '#SmartDog'],
  },
];

function Home({navigation}) {
  const [posts, setPosts] = useState(samplePosts);
  const [activeImageIndex, setActiveImageIndex] = useState({});
  const [selectedTab, setSelectedTab] = useState('home'); // 'home' or 'forYou'

  const handleLike = postId => {
    setPosts(
      posts.map(post =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post,
      ),
    );
  };

  const handleSave = postId => {
    setPosts(
      posts.map(post =>
        post.id === postId
          ? {
              ...post,
              isSaved: !post.isSaved,
            }
          : post,
      ),
    );
  };

  // Story Card Component
  const StoryCard = ({story}) => {
    if (story.isAddStory) {
      return (
        <TouchableOpacity style={styles.storyContainer}>
          <Box position="relative">
            <Box
              width={70}
              height={70}
              borderRadius={35}
              overflow="hidden"
              bg="gray.200">
              <Image
                source={{uri: story.avatar}}
                alt="Your pet"
                width={70}
                height={70}
                resizeMode="cover"
              />
            </Box>
            <Box
              position="absolute"
              bottom={0}
              right={0}
              bg="#6FE5A9"
              borderRadius="full"
              width={6}
              height={6}
              alignItems="center"
              justifyContent="center"
              borderWidth={2}
              borderColor="white">
              <Ionicons name="add" size={14} color="white" />
            </Box>
          </Box>
          <Text
            fontSize="xs"
            color="gray.700"
            mt={1}
            textAlign="center"
            numberOfLines={1}
            width={75}>
            Add Story
          </Text>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity style={styles.storyContainer}>
        <Box position="relative">
          <Box
            width={70}
            height={70}
            borderRadius={35}
            borderWidth={3}
            borderColor={story.hasNewStory ? '#6FE5A9' : 'gray.300'}
            alignItems="center"
            justifyContent="center"
            bg="white"
            overflow="hidden">
            <Box width={60} height={60} borderRadius={30} overflow="hidden">
              <Image
                source={{uri: story.avatar}}
                alt={story.petName}
                width={60}
                height={60}
                resizeMode="cover"
              />
            </Box>
          </Box>
        </Box>
        <Text
          fontSize="xs"
          color="gray.700"
          mt={1}
          textAlign="center"
          numberOfLines={1}
          width={75}>
          {story.petName}
        </Text>
      </TouchableOpacity>
    );
  };

  // Enhanced Post Card Component
  const PostCard = ({post}) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const hasMultipleImages = post.images.length > 1;

    return (
      <Box bg="white" borderRadius={16} shadow={3} mb={5} overflow="hidden">
        {/* Header */}
        <HStack p={4} alignItems="center" justifyContent="space-between">
          <HStack alignItems="center" space={3} flex={1}>
            <Box position="relative">
              <Avatar size="md" bg="#E8FAF3" source={{uri: post.avatar}}>
                <Text fontSize="xl">🐾</Text>
              </Avatar>
              <Box
                position="absolute"
                bottom={-2}
                right={-2}
                bg="green.400"
                borderRadius={10}
                width={4}
                height={4}
                borderWidth={2}
                borderColor="white"
              />
            </Box>
            <VStack flex={1}>
              <HStack alignItems="center" space={2}>
                <Text
                  fontFamily="heading"
                  fontSize="md"
                  color="gray.800"
                  fontWeight="bold">
                  {post.petName}
                </Text>
                <Badge
                  bg="#E8FAF3"
                  borderRadius="full"
                  px={2}
                  py={0.5}
                  _text={{
                    fontSize: '2xs',
                    color: '#2D9D78',
                    fontWeight: 'semibold',
                  }}>
                  {post.petType}
                </Badge>
              </HStack>
              <HStack alignItems="center" space={1}>
                <Text fontSize="xs" color="gray.600">
                  {post.ownerName}
                </Text>
                {post.location && (
                  <>
                    <Text fontSize="xs" color="gray.400">
                      •
                    </Text>
                    <Ionicons
                      name="location-outline"
                      size={12}
                      color="#9CA3AF"
                    />
                    <Text
                      fontSize="xs"
                      color="gray.500"
                      numberOfLines={1}
                      flex={1}>
                      {post.location}
                    </Text>
                  </>
                )}
              </HStack>
              <Text fontSize="xs" color="gray.400">
                {post.timeAgo}
              </Text>
            </VStack>
          </HStack>
          <TouchableOpacity style={styles.moreButton}>
            <MaterialCommunityIcons
              name="dots-vertical"
              size={24}
              color="#6B7280"
            />
          </TouchableOpacity>
        </HStack>

        {/* Image Carousel */}
        <Box position="relative">
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={event => {
              const index = Math.round(
                event.nativeEvent.contentOffset.x / screenWidth,
              );
              setCurrentImageIndex(index);
            }}>
            {post.images.map((img, index) => (
              <Box
                key={index}
                width={screenWidth}
                height={screenWidth}
                bg="gray.100">
                <Image
                  source={{uri: img}}
                  alt={`${post.petName} photo ${index + 1}`}
                  width="100%"
                  height="100%"
                  resizeMode="cover"
                />
              </Box>
            ))}
          </ScrollView>

          {/* Image Counter */}
          {hasMultipleImages && (
            <Box
              position="absolute"
              top={3}
              right={3}
              bg="rgba(0,0,0,0.6)"
              px={3}
              py={1}
              borderRadius="full">
              <Text fontSize="xs" color="white" fontWeight="semibold">
                {currentImageIndex + 1}/{post.images.length}
              </Text>
            </Box>
          )}

          {/* Image Dots Indicator */}
          {hasMultipleImages && (
            <HStack
              position="absolute"
              bottom={3}
              left={0}
              right={0}
              justifyContent="center"
              space={1.5}>
              {post.images.map((_, index) => (
                <Box
                  key={index}
                  width={currentImageIndex === index ? 6 : 1.5}
                  height={1.5}
                  borderRadius="full"
                  bg={
                    currentImageIndex === index
                      ? 'white'
                      : 'rgba(255,255,255,0.5)'
                  }
                />
              ))}
            </HStack>
          )}
        </Box>

        {/* Actions */}
        <Box px={4} pt={3} pb={2}>
          <HStack justifyContent="space-between" alignItems="center" mb={3}>
            <HStack space={4}>
              <TouchableOpacity
                onPress={() => handleLike(post.id)}
                style={styles.actionButton}>
                <MaterialCommunityIcons
                  name={post.isLiked ? 'heart' : 'heart-outline'}
                  size={28}
                  color={post.isLiked ? '#EF4444' : '#374151'}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="chatbubble-outline" size={26} color="#374151" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons
                  name="paper-plane-outline"
                  size={26}
                  color="#374151"
                />
              </TouchableOpacity>
            </HStack>
            <TouchableOpacity
              onPress={() => handleSave(post.id)}
              style={styles.actionButton}>
              <Ionicons
                name={post.isSaved ? 'bookmark' : 'bookmark-outline'}
                size={26}
                color={post.isSaved ? '#6FE5A9' : '#374151'}
              />
            </TouchableOpacity>
          </HStack>

          {/* Engagement Stats */}
          <HStack alignItems="center" space={3} mb={2}>
            <HStack alignItems="center" space={1}>
              <Box
                bg="red.50"
                borderRadius="full"
                p={1}
                borderWidth={1.5}
                borderColor="red.400">
                <MaterialCommunityIcons
                  name="heart"
                  size={12}
                  color="#EF4444"
                />
              </Box>
              <Text
                fontFamily="heading"
                fontSize="sm"
                color="gray.800"
                fontWeight="bold">
                {post.likes.toLocaleString()}
              </Text>
            </HStack>
            <HStack alignItems="center" space={1}>
              <Ionicons name="chatbubble" size={14} color="#6FE5A9" />
              <Text fontSize="sm" color="gray.600" fontWeight="semibold">
                {post.comments}
              </Text>
            </HStack>
            <HStack alignItems="center" space={1}>
              <Ionicons name="paper-plane" size={14} color="#10B981" />
              <Text fontSize="sm" color="gray.600" fontWeight="semibold">
                {post.shares}
              </Text>
            </HStack>
          </HStack>

          {/* Caption */}
          <VStack space={1} mb={2}>
            <Text fontSize="sm" color="gray.800">
              <Text fontWeight="bold">{post.petName}</Text>{' '}
              <Text color="gray.700">{post.caption}</Text>
            </Text>
          </VStack>

          {/* Comments Preview */}
          {post.comments > 0 && (
            <TouchableOpacity mb={2}>
              <Text fontSize="sm" color="gray.500">
                View all {post.comments} comments
              </Text>
            </TouchableOpacity>
          )}

          {/* Add Comment */}
          <HStack
            alignItems="center"
            space={2}
            pt={2}
            borderTopWidth={1}
            borderTopColor="gray.100">
            <Avatar size="sm" bg="#E8FAF3" source={{uri: post.avatar}}>
              <Text fontSize="xs">🐾</Text>
            </Avatar>
            <Text fontSize="sm" color="gray.400" flex={1}>
              Add a comment...
            </Text>
            <Ionicons name="happy-outline" size={20} color="#9CA3AF" />
          </HStack>
        </Box>
      </Box>
    );
  };

  return (
    <Box flex={1} bg="#F9FAFB">
      <Header />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 30}}>
        {/* Enhanced Stories Section */}
        <Box bg="white" mb={2} py={3} shadow={1}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 16,
            }}>
            <HStack space={4}>
              {sampleStories.map(story => (
                <StoryCard key={story.id} story={story} />
              ))}
            </HStack>
          </ScrollView>
        </Box>

        {/* Tab Bar */}
        <HStack bg="white" shadow={1} mb={2}>
          <TouchableOpacity
            style={[styles.tabButton, selectedTab === 'home' && styles.activeTabButton]}
            onPress={() => setSelectedTab('home')}>
            <Text
              fontSize="md"
              fontFamily={selectedTab === 'home' ? 'heading' : 'body'}
              color={selectedTab === 'home' ? 'gray.800' : 'gray.500'}>
              Home
            </Text>
            {selectedTab === 'home' && <Box style={styles.tabIndicator} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, selectedTab === 'forYou' && styles.activeTabButton]}
            onPress={() => setSelectedTab('forYou')}>
            <Text
              fontSize="md"
              fontFamily={selectedTab === 'forYou' ? 'heading' : 'body'}
              color={selectedTab === 'forYou' ? 'gray.800' : 'gray.500'}>
              For You
            </Text>
            {selectedTab === 'forYou' && <Box style={styles.tabIndicator} />}
          </TouchableOpacity>
        </HStack>

        {/* Posts Feed */}
        <Box px={3} pt={2}>
          {selectedTab === 'home' ? (
            posts.map(post => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            // For You feed
            posts.slice().reverse().map(post => (
              <PostCard key={post.id} post={post} />
            ))
          )}
        </Box>

        {/* End of Feed */}
        <Center py={6}>
          <VStack alignItems="center" space={2}>
            <Box bg="#E8FAF3" p={3} borderRadius="full">
              <MaterialCommunityIcons name="paw" size={32} color="#6FE5A9" />
            </Box>
            <Text fontSize="sm" color="gray.500" fontWeight="medium">
              You're all caught up!
            </Text>
            <Text fontSize="xs" color="gray.400">
              Check back later for more adorable pets
            </Text>
          </VStack>
        </Center>
      </ScrollView>
    </Box>
  );
}

const styles = StyleSheet.create({
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    position: 'relative',
  },
  activeTabButton: {
    // active styles handled by indicator
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#6FE5A9',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  storyContainer: {
    alignItems: 'center',
    width: 80,
  },
  actionButton: {
    padding: 4,
  },
  moreButton: {
    padding: 4,
  },
  quickAction: {
    alignItems: 'center',
  },
});

export default Home;
