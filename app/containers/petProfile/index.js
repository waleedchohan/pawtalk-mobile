import React, {useState} from 'react';
import {
  Box,
  ScrollView,
  Text,
  VStack,
  HStack,
  Avatar,
  Badge,
  Divider,
  Image,
  Center,
} from 'native-base';
import {
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  RefreshControl,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../themes/Colors';

const screenWidth = Dimensions.get('window').width;

// Sample profile data (would come from route params or API)
const sampleProfileData = {
  id: 1,
  petName: 'Buddy',
  petType: 'Golden Retriever',
  ownerName: 'Sarah Johnson',
  username: '@buddythegolden',
  bio: '🐕 Golden Retriever living my best life\n📍 New York, NY\n🎾 Ball enthusiast & treat connoisseur',
  avatar: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400',
  coverImage:
    'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800',
  stats: {
    posts: 156,
    followers: 2847,
    following: 892,
  },
  isFollowing: false,
  isVerified: true,
};

// Sample posts grid
const samplePosts = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400',
    likes: 234,
    comments: 45,
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400',
    likes: 189,
    comments: 32,
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=400',
    likes: 456,
    comments: 78,
  },
  {
    id: 4,
    image:
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400',
    likes: 312,
    comments: 56,
  },
  {
    id: 5,
    image:
      'https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=400',
    likes: 523,
    comments: 91,
  },
  {
    id: 6,
    image:
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400',
    likes: 278,
    comments: 43,
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400',
    likes: 401,
    comments: 67,
  },
  {
    id: 8,
    image:
      'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400',
    likes: 367,
    comments: 52,
  },
  {
    id: 9,
    image:
      'https://images.unsplash.com/photo-1600804889194-e6fbf08f0259?w=400',
    likes: 445,
    comments: 73,
  },
];

function PetProfile({navigation, route}) {
  // In real app, you'd get this from route.params
  const profileData = route?.params?.profile || sampleProfileData;

  const [isFollowing, setIsFollowing] = useState(profileData.isFollowing);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTab, setSelectedTab] = useState('posts'); // 'posts' or 'tagged'

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const StatCard = ({label, value}) => (
    <VStack alignItems="center" space={0.5} flex={1}>
      <Text fontSize="xl" fontFamily="heading" color="gray.800">
        {value}
      </Text>
      <Text fontSize="xs" color="gray.500" fontWeight="500" letterSpacing={0.3}>
        {label}
      </Text>
    </VStack>
  );

  const PostGridItem = ({post}) => (
    <TouchableOpacity style={styles.gridItem}>
      <Image
        source={{uri: post.image}}
        alt="Post"
        width="100%"
        height="100%"
        resizeMode="cover"
      />
      {/* Engagement overlay on hover/press */}
      <Box style={styles.gridOverlay}>
        <HStack space={4} alignItems="center">
          <HStack alignItems="center" space={1}>
            <MaterialCommunityIcons name="heart" size={20} color="white" />
            <Text fontSize="sm" fontFamily="heading" color="white">
              {post.likes}
            </Text>
          </HStack>
          <HStack alignItems="center" space={1}>
            <Ionicons name="chatbubble" size={18} color="white" />
            <Text fontSize="sm" fontFamily="heading" color="white">
              {post.comments}
            </Text>
          </HStack>
        </HStack>
      </Box>
    </TouchableOpacity>
  );

  return (
    <Box flex={1} bg="#F9FAFB">
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {/* Header with Back Button */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          zIndex={10}
          pt={12}
          px={4}
          pb={3}>
          <HStack alignItems="center" justifyContent="space-between">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.headerButton}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <HStack space={3}>
              <TouchableOpacity style={styles.headerButton}>
                <Ionicons name="notifications-outline" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerButton}>
                <Ionicons name="ellipsis-vertical" size={24} color="white" />
              </TouchableOpacity>
            </HStack>
          </HStack>
        </Box>

        {/* Cover Image */}
        <Box position="relative" height={220}>
          <Image
            source={{uri: profileData.coverImage}}
            alt="Cover"
            width="100%"
            height="100%"
            resizeMode="cover"
          />
          <Box
            position="absolute"
            bottom={0}
            left={0}
            right={0}
            height={100}
            bg="linear-gradient(transparent, rgba(0,0,0,0.4))"
          />
        </Box>

        {/* Profile Info Section */}
        <Box bg="white" mt={-40} borderTopLeftRadius={30} borderTopRightRadius={30}>
          {/* Avatar */}
          <Center mt={-50}>
            <Box position="relative">
              <Avatar
                source={{uri: profileData.avatar}}
                size="2xl"
                borderWidth={5}
                borderColor="white"
                shadow={4}
              />
              {profileData.isVerified && (
                <Box
                  position="absolute"
                  bottom={2}
                  right={2}
                  bg={Colors.primary}
                  p={1.5}
                  borderRadius="full"
                  borderWidth={3}
                  borderColor="white">
                  <MaterialCommunityIcons
                    name="check-decagram"
                    size={16}
                    color="white"
                  />
                </Box>
              )}
            </Box>
          </Center>

          {/* Name and Bio */}
          <VStack alignItems="center" mt={4} px={5} space={1}>
            <HStack alignItems="center" space={2}>
              <Text fontSize="2xl" fontFamily="heading" color="gray.800">
                {profileData.petName}
              </Text>
            </HStack>
            <Badge
              bg="#E8FAF3"
              borderRadius="full"
              px={3}
              py={1}
              _text={{
                fontSize: 'xs',
                color: '#2D9D78',
                fontWeight: '600',
              }}>
              {profileData.petType}
            </Badge>
            <Text fontSize="sm" color="gray.500" fontWeight="500" mt={1}>
              {profileData.username}
            </Text>
            <Text
              fontSize="sm"
              color="gray.600"
              textAlign="center"
              mt={3}
              px={6}>
              {profileData.bio}
            </Text>
          </VStack>

          {/* Stats */}
          <HStack mt={6} mb={4} px={8} justifyContent="space-around">
            <StatCard label="Posts" value={profileData.stats.posts} />
            <StatCard
              label="Followers"
              value={profileData.stats.followers.toLocaleString()}
            />
            <StatCard label="Following" value={profileData.stats.following} />
          </HStack>

          {/* Action Buttons */}
          <HStack space={3} px={5} mt={2} mb={5}>
            <TouchableOpacity
              onPress={handleFollow}
              style={[
                styles.actionButton,
                isFollowing ? styles.followingButton : styles.followButton,
              ]}>
              <HStack alignItems="center" space={2}>
                <Ionicons
                  name={isFollowing ? 'checkmark' : 'person-add'}
                  size={18}
                  color={isFollowing ? Colors.primary : 'white'}
                />
                <Text
                  fontSize="sm"
                  fontFamily="heading"
                  color={isFollowing ? Colors.primary : 'white'}>
                  {isFollowing ? 'Following' : 'Follow'}
                </Text>
              </HStack>
            </TouchableOpacity>
            <TouchableOpacity style={styles.messageButton}>
              <HStack alignItems="center" space={2}>
                <Ionicons name="chatbubble-outline" size={18} color="#374151" />
                <Text fontSize="sm" fontFamily="heading" color="gray.800">
                  Message
                </Text>
              </HStack>
            </TouchableOpacity>
            <TouchableOpacity style={styles.moreButton}>
              <Ionicons name="chevron-down" size={20} color="#374151" />
            </TouchableOpacity>
          </HStack>
        </Box>

        {/* Tabs */}
        <HStack bg="white" shadow={1} mt={2}>
          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === 'posts' && styles.activeTab,
            ]}
            onPress={() => setSelectedTab('posts')}>
            <MaterialCommunityIcons
              name="grid"
              size={24}
              color={selectedTab === 'posts' ? Colors.primary : '#9CA3AF'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === 'tagged' && styles.activeTab,
            ]}
            onPress={() => setSelectedTab('tagged')}>
            <MaterialCommunityIcons
              name="account-box-outline"
              size={24}
              color={selectedTab === 'tagged' ? Colors.primary : '#9CA3AF'}
            />
          </TouchableOpacity>
        </HStack>

        {/* Posts Grid */}
        <Box bg="white" mt={2} pb={100}>
          <HStack flexWrap="wrap" m={0.5}>
            {samplePosts.map(post => (
              <PostGridItem key={post.id} post={post} />
            ))}
          </HStack>

          {/* Empty State */}
          {samplePosts.length === 0 && (
            <Center py={20}>
              <Box bg="#E8FAF3" p={6} borderRadius="full" mb={4}>
                <MaterialCommunityIcons
                  name="image-outline"
                  size={48}
                  color={Colors.primary}
                />
              </Box>
              <Text fontSize="lg" fontFamily="heading" color="gray.700">
                No posts yet
              </Text>
              <Text fontSize="sm" color="gray.500" mt={2} textAlign="center">
                When {profileData.petName} shares photos, they'll appear here
              </Text>
            </Center>
          )}
        </Box>
      </ScrollView>
    </Box>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    padding: 8,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  followButton: {
    backgroundColor: Colors.primary,
  },
  followingButton: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  messageButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreButton: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: Colors.primary,
  },
  gridItem: {
    width: (screenWidth - 3) / 3,
    height: (screenWidth - 3) / 3,
    margin: 0.5,
    position: 'relative',
  },
  gridOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
  },
});

export default PetProfile;

