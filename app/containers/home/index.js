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
import {
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Platform,
  TextInput as RNTextInput,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
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

// Sample comments data
const sampleComments = {
  1: [
    {
      id: 1,
      userName: 'Jessica Miller',
      userAvatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
      comment: 'Aww, Buddy is so adorable! 🥰',
      timeAgo: '1h ago',
      likes: 12,
    },
    {
      id: 2,
      userName: 'Tom Anderson',
      userAvatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      comment: 'What a beautiful trail! Where is this? 🌲',
      timeAgo: '45m ago',
      likes: 5,
    },
    {
      id: 3,
      userName: 'Emily Davis',
      userAvatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      comment: 'Golden Retrievers are the best! Give him a pat from me 🐾',
      timeAgo: '30m ago',
      likes: 8,
    },
  ],
  2: [
    {
      id: 4,
      userName: 'David Lee',
      userAvatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
      comment: 'That face! 😍',
      timeAgo: '2h ago',
      likes: 15,
    },
    {
      id: 5,
      userName: 'Lisa Wong',
      userAvatar:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100',
      comment: 'Cats really know how to find the best nap spots!',
      timeAgo: '1h ago',
      likes: 6,
    },
  ],
  3: [
    {
      id: 6,
      userName: 'Mark Johnson',
      userAvatar:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100',
      comment: 'Impressive! How long did it take to train him?',
      timeAgo: '3h ago',
      likes: 20,
    },
  ],
};

function Home({navigation}) {
  const [posts, setPosts] = useState(samplePosts);
  const [selectedTab, setSelectedTab] = useState('following'); // 'following' or 'forYou'
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [commentText, setCommentText] = useState('');

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

  const openCommentsModal = post => {
    setSelectedPost(post);
    setShowCommentsModal(true);
  };

  // Enhanced Post Card Component
  const PostCard = ({post}) => {
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

        {/* Single Image */}
        <Box width="100%" height={screenWidth} bg="gray.100">
          <Image
            source={{uri: post.images[0]}}
            alt={`${post.petName} photo`}
            width="100%"
            height="100%"
            resizeMode="cover"
          />
        </Box>

        {/* Actions */}
        <Box px={4} pt={3} pb={2}>
          <HStack justifyContent="space-between" alignItems="center" mb={2}>
            <HStack space={5} alignItems="center">
              <TouchableOpacity
                onPress={() => handleLike(post.id)}
                style={styles.actionButton}>
                <HStack alignItems="center" space={1}>
                  <MaterialCommunityIcons
                    name={post.isLiked ? 'heart' : 'heart-outline'}
                    size={26}
                    color={post.isLiked ? '#EF4444' : '#374151'}
                  />
                  <Text
                    fontSize="sm"
                    fontWeight="semibold"
                    color={post.isLiked ? '#EF4444' : 'gray.600'}>
                    {post.likes}
                  </Text>
                </HStack>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => openCommentsModal(post)}
                style={styles.actionButton}>
                <HStack alignItems="center" space={1}>
                  <Ionicons
                    name="chatbubble-outline"
                    size={24}
                    color="#374151"
                  />
                  <Text fontSize="sm" fontWeight="semibold" color="gray.600">
                    {post.comments}
                  </Text>
                </HStack>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <HStack alignItems="center" space={1}>
                  <Ionicons
                    name="paper-plane-outline"
                    size={24}
                    color="#374151"
                  />
                  <Text fontSize="sm" fontWeight="semibold" color="gray.600">
                    {post.shares}
                  </Text>
                </HStack>
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

          {/* Caption */}
          <VStack space={1} mt={1}>
            <Text fontSize="sm" color="gray.800">
              <Text fontWeight="bold">{post.petName}</Text>{' '}
              <Text color="gray.700">{post.caption}</Text>
            </Text>
          </VStack>
        </Box>
      </Box>
    );
  };

  return (
    <Box flex={1} bg="#F9FAFB">
      <Header />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 180}}>
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
            style={[
              styles.tabButton,
              selectedTab === 'following' && styles.activeTabButton,
            ]}
            onPress={() => setSelectedTab('following')}>
            <Text
              fontSize="md"
              fontFamily={selectedTab === 'following' ? 'heading' : 'body'}
              color={selectedTab === 'following' ? 'gray.800' : 'gray.500'}>
              Following
            </Text>
            {selectedTab === 'following' && <Box style={styles.tabIndicator} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedTab === 'forYou' && styles.activeTabButton,
            ]}
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
          {selectedTab === 'following'
            ? posts.map(post => <PostCard key={post.id} post={post} />)
            : // For You feed
              posts
                .slice()
                .reverse()
                .map(post => <PostCard key={post.id} post={post} />)}
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

      {/* Instagram-Style Comments Modal */}
      <Modal
        visible={showCommentsModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCommentsModal(false)}>
        <Box
          flex={1}
          bg="rgba(0,0,0,0.5)"
          justifyContent="flex-end"
          onTouchEnd={() => setShowCommentsModal(false)}>
          <Box
            bg="white"
            borderTopLeftRadius={20}
            borderTopRightRadius={20}
            maxH="90%"
            onTouchEnd={e => e.stopPropagation()}>
            {/* Modal Header */}
            <HStack
              alignItems="center"
              justifyContent="space-between"
              p={4}
              borderBottomWidth={1}
              borderBottomColor="gray.200">
              <Text fontSize="lg" fontWeight="bold" color="gray.800">
                Comments
              </Text>
              <TouchableOpacity onPress={() => setShowCommentsModal(false)}>
                <Ionicons name="close" size={28} color="#374151" />
              </TouchableOpacity>
            </HStack>

            {/* Comments List */}
            <KeyboardAwareScrollView
              showsVerticalScrollIndicator={false}
              enableOnAndroid={true}
              enableAutomaticScroll={true}
              extraScrollHeight={20}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{padding: 16}}
              style={{maxHeight: screenWidth * 1.5}}>
              {selectedPost && (
                <VStack space={4}>
                  {/* Post Preview */}
                  <HStack
                    space={3}
                    pb={4}
                    borderBottomWidth={1}
                    borderBottomColor="gray.100">
                    <Avatar
                      size="md"
                      source={{uri: selectedPost.avatar}}
                      bg="#E8FAF3"
                    />
                    <VStack flex={1}>
                      <HStack alignItems="center" space={2}>
                        <Text fontSize="md" fontWeight="bold" color="gray.800">
                          {selectedPost.petName}
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
                          {selectedPost.petType}
                        </Badge>
                      </HStack>
                      <Text fontSize="sm" color="gray.600" numberOfLines={2}>
                        {selectedPost.caption}
                      </Text>
                    </VStack>
                  </HStack>

                  {/* Comments */}
                  {(sampleComments[selectedPost.id] || []).map(comment => (
                    <HStack key={comment.id} space={3} alignItems="flex-start">
                      <Avatar
                        size="sm"
                        source={{uri: comment.userAvatar}}
                        bg="gray.200"
                      />
                      <VStack flex={1} space={1}>
                        <HStack
                          alignItems="center"
                          justifyContent="space-between">
                          <Text
                            fontSize="sm"
                            fontWeight="bold"
                            color="gray.800">
                            {comment.userName}
                          </Text>
                          <Text fontSize="xs" color="gray.400">
                            {comment.timeAgo}
                          </Text>
                        </HStack>
                        <Text fontSize="sm" color="gray.700">
                          {comment.comment}
                        </Text>
                        <HStack alignItems="center" space={4} mt={1}>
                          <TouchableOpacity>
                            <HStack alignItems="center" space={1}>
                              <Ionicons
                                name="heart-outline"
                                size={16}
                                color="#9CA3AF"
                              />
                              <Text
                                fontSize="xs"
                                color="gray.500"
                                fontWeight="medium">
                                {comment.likes}
                              </Text>
                            </HStack>
                          </TouchableOpacity>
                          <TouchableOpacity>
                            <Text
                              fontSize="xs"
                              color="gray.500"
                              fontWeight="semibold">
                              Reply
                            </Text>
                          </TouchableOpacity>
                        </HStack>
                      </VStack>
                    </HStack>
                  ))}

                  {(sampleComments[selectedPost.id] || []).length === 0 && (
                    <Center py={8}>
                      <MaterialCommunityIcons
                        name="comment-outline"
                        size={48}
                        color="#D1D5DB"
                      />
                      <Text fontSize="md" color="gray.500" mt={2}>
                        No comments yet
                      </Text>
                      <Text fontSize="sm" color="gray.400" mt={1}>
                        Be the first to comment!
                      </Text>
                    </Center>
                  )}
                </VStack>
              )}
            </KeyboardAwareScrollView>

            {/* Comment Input */}
            <HStack
              alignItems="center"
              space={2}
              px={3}
              py={2}
              borderTopWidth={1}
              borderTopColor="gray.200"
              bg="white">
              <Avatar size="sm" bg="#E8FAF3">
                <Text fontSize="xs">🐾</Text>
              </Avatar>
              <Box flex={1} shadow={0}>
                <RNTextInput
                  placeholder="Add a comment..."
                  placeholderTextColor="#9CA3AF"
                  value={commentText}
                  onChangeText={setCommentText}
                  style={{
                    fontSize: 14,
                    borderRadius: 20,
                    backgroundColor: '#F9FAFB',
                    borderWidth: 1,
                    borderColor: '#E5E7EB',
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                  }}
                  multiline
                />
              </Box>
              <TouchableOpacity
                disabled={!commentText.trim()}
                onPress={() => {
                  // TODO: Handle comment submission
                  console.log('Comment:', commentText);
                  setCommentText('');
                }}>
                <Text
                  fontSize="sm"
                  fontWeight="bold"
                  color={commentText.trim() ? '#6FE5A9' : '#D1D5DB'}>
                  Post
                </Text>
              </TouchableOpacity>
            </HStack>
          </Box>
        </Box>
      </Modal>
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
