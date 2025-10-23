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
  coverImage: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800',
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
    image: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=400',
    likes: 456,
    comments: 78,
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400',
    likes: 312,
    comments: 56,
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=400',
    likes: 523,
    comments: 91,
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400',
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
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400',
    likes: 367,
    comments: 52,
  },
  {
    id: 9,
    image: 'https://images.unsplash.com/photo-1600804889194-e6fbf08f0259?w=400',
    likes: 445,
    comments: 73,
  },
];

function PetProfile({navigation, route}) {
  // Transform post data to profile format if needed
  const passedData = route?.params?.profile;

  // If we received a post object, transform it to profile format
  const profileData = passedData
    ? {
        id: passedData.id || 1,
        petName: passedData.petName || 'Pet',
        petType: passedData.petType || 'Unknown',
        ownerName: passedData.ownerName || 'Owner',
        username: passedData.username || '@pet',
        bio: passedData.bio || passedData.caption || '🐾 Pet profile',
        avatar:
          passedData.avatar ||
          passedData.images?.[0] ||
          sampleProfileData.avatar,
        coverImage:
          passedData.images?.[0] ||
          passedData.coverImage ||
          sampleProfileData.coverImage,
        stats: passedData.stats || {
          posts: passedData.posts || 0,
          followers: passedData.followers || 0,
          following: passedData.following || 0,
        },
        isFollowing: passedData.isFollowing || false,
        isVerified: passedData.isVerified || false,
      }
    : sampleProfileData;

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
    <TouchableOpacity
      style={styles.gridItem}
      onPress={() => navigation.navigate('PostDetail', {post: {...profileData, ...post, image: post.image}})}>
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
    <Box flex={1} bg="white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {/* Header */}
        <Box
          bg="white"
          pt={12}
          pb={3}
          px={4}
          borderBottomWidth={1}
          borderBottomColor="gray.100">
          <HStack alignItems="center" justifyContent="space-between">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="#374151" />
            </TouchableOpacity>
            <HStack alignItems="center" space={2}>
              <Text fontSize="lg" fontFamily="heading" color="gray.800">
                {profileData.username}
              </Text>
              {profileData.isVerified && (
                <MaterialCommunityIcons
                  name="check-decagram"
                  size={18}
                  color={Colors.primary}
                />
              )}
            </HStack>
            <TouchableOpacity>
              <Ionicons name="ellipsis-vertical" size={24} color="#374151" />
            </TouchableOpacity>
          </HStack>
        </Box>

        {/* Profile Info Section */}
        <Box bg="white" px={4} pt={4}>
          {/* Avatar and Stats Row */}
          <HStack space={4} alignItems="center">
            {/* Avatar */}
            <Box position="relative">
              <Avatar
                source={{uri: profileData.avatar}}
                size="xl"
                bg="gray.200"
              />
              {profileData.isVerified && (
                <Box
                  position="absolute"
                  bottom={0}
                  right={0}
                  bg={Colors.primary}
                  p={1}
                  borderRadius="full"
                  borderWidth={2}
                  borderColor="white">
                  <MaterialCommunityIcons
                    name="check"
                    size={12}
                    color="white"
                  />
                </Box>
              )}
            </Box>

            {/* Stats */}
            <HStack flex={1} justifyContent="space-around">
              <StatCard label="Posts" value={profileData.stats.posts} />
              <StatCard
                label="Followers"
                value={profileData.stats.followers.toLocaleString()}
              />
              <StatCard label="Following" value={profileData.stats.following} />
            </HStack>
          </HStack>

          {/* Name and Bio */}
          <VStack mt={4} space={1}>
            <HStack alignItems="center" space={2}>
              <Text fontSize="lg" fontFamily="heading" color="gray.800">
                {profileData.petName}
              </Text>
              <Badge
                bg="#E8FAF3"
                borderRadius="full"
                px={2.5}
                py={0.5}
                _text={{
                  fontSize: '2xs',
                  color: '#2D9D78',
                  fontWeight: '600',
                }}>
                {profileData.petType}
              </Badge>
            </HStack>
            <Text fontSize="sm" color="gray.500">
              {profileData.ownerName}
            </Text>
            <Text fontSize="sm" color="gray.700" mt={2}>
              {profileData.bio}
            </Text>
          </VStack>

          {/* Action Buttons */}
          <HStack space={2} mt={4} mb={3}>
            <TouchableOpacity
              onPress={handleFollow}
              style={[
                styles.actionButton,
                isFollowing ? styles.followingButton : styles.followButton,
              ]}>
              <Text
                fontSize="sm"
                fontFamily="heading"
                color={isFollowing ? 'gray.800' : 'white'}>
                {isFollowing ? 'Following' : 'Follow'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.messageButton}>
              <Text fontSize="sm" fontFamily="heading" color="gray.800">
                Message
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="person-add-outline" size={18} color="#374151" />
            </TouchableOpacity>
          </HStack>
        </Box>

        {/* Tabs */}
        <HStack bg="white" borderTopWidth={1} borderTopColor="gray.100">
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'posts' && styles.activeTab]}
            onPress={() => setSelectedTab('posts')}>
            <MaterialCommunityIcons
              name="grid"
              size={24}
              color={selectedTab === 'posts' ? '#374151' : '#9CA3AF'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'tagged' && styles.activeTab]}
            onPress={() => setSelectedTab('tagged')}>
            <MaterialCommunityIcons
              name="account-box-outline"
              size={24}
              color={selectedTab === 'tagged' ? '#374151' : '#9CA3AF'}
            />
          </TouchableOpacity>
        </HStack>

        {/* Posts Grid */}
        <Box bg="white" pb={100}>
          <HStack flexWrap="wrap">
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
  actionButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  followButton: {
    backgroundColor: Colors.primary,
  },
  followingButton: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  messageButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButton: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#374151',
  },
  gridItem: {
    width: screenWidth / 3,
    height: screenWidth / 3,
    borderWidth: 0.5,
    borderColor: 'white',
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
