import React, {useState} from 'react';
import {
  Box,
  Text,
  VStack,
  HStack,
  Input,
  ScrollView,
  Image,
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

// Filter categories
const filters = [
  {id: 'nearby', label: 'Nearby', icon: 'location-outline'},
  {id: 'trending', label: 'Trending', icon: 'flame'},
  {id: 'dogs', label: 'Dogs', icon: 'paw'},
  {id: 'cats', label: 'paw'},
  {id: 'birds', label: 'Birds', icon: 'paw'},
  {id: 'new', label: 'New', icon: 'sparkles'},
];

// Sample discover posts (mixed content)
const discoverPosts = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600',
    petName: 'Buddy',
    petType: 'dog',
    likes: 1234,
    comments: 89,
    isVerified: true,
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600',
    petName: 'Whiskers',
    petType: 'cat',
    likes: 2345,
    comments: 156,
    isVerified: true,
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600',
    petName: 'Charlie',
    petType: 'dog',
    likes: 987,
    comments: 67,
    isVerified: false,
  },
  {
    id: 4,
    image:
      'https://images.unsplash.com/photo-1568572933382-74d440642117?w=600',
    petName: 'Max',
    petType: 'dog',
    likes: 3456,
    comments: 234,
    isVerified: true,
  },
  {
    id: 5,
    image:
      'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=600',
    petName: 'Luna',
    petType: 'cat',
    likes: 2987,
    comments: 178,
    isVerified: true,
  },
  {
    id: 6,
    image:
      'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=600',
    petName: 'Rocky',
    petType: 'dog',
    likes: 1567,
    comments: 98,
    isVerified: false,
  },
  {
    id: 7,
    image:
      'https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=600',
    petName: 'Bella',
    petType: 'dog',
    likes: 4123,
    comments: 312,
    isVerified: true,
  },
  {
    id: 8,
    image:
      'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600',
    petName: 'Milo',
    petType: 'cat',
    likes: 1876,
    comments: 145,
    isVerified: false,
  },
  {
    id: 9,
    image:
      'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=600',
    petName: 'Daisy',
    petType: 'dog',
    likes: 2234,
    comments: 167,
    isVerified: true,
  },
  {
    id: 10,
    image:
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600',
    petName: 'Oliver',
    petType: 'dog',
    likes: 3678,
    comments: 289,
    isVerified: true,
  },
  {
    id: 11,
    image:
      'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=600',
    petName: 'Simba',
    petType: 'cat',
    likes: 2543,
    comments: 198,
    isVerified: false,
  },
  {
    id: 12,
    image:
      'https://images.unsplash.com/photo-1600804889194-e6fbf08f0259?w=600',
    petName: 'Cooper',
    petType: 'dog',
    likes: 1987,
    comments: 134,
    isVerified: true,
  },
];

function Discover({navigation}) {
  const [selectedFilter, setSelectedFilter] = useState('trending');
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  // Filter posts based on selected filter
  const getFilteredPosts = () => {
    let filtered = discoverPosts;

    if (selectedFilter === 'dogs') {
      filtered = discoverPosts.filter(p => p.petType === 'dog');
    } else if (selectedFilter === 'cats') {
      filtered = discoverPosts.filter(p => p.petType === 'cat');
    } else if (selectedFilter === 'trending') {
      filtered = discoverPosts.sort((a, b) => b.likes - a.likes);
    } else if (selectedFilter === 'nearby') {
      // In real app, this would filter by location
      filtered = discoverPosts;
    } else if (selectedFilter === 'new') {
      filtered = discoverPosts.slice().reverse();
    }

    return filtered;
  };

  const filteredPosts = getFilteredPosts();

  const DiscoverPostItem = ({post, index}) => {
    // Vary the heights for more dynamic grid (like Instagram)
    const isLarge = index % 7 === 0 || index % 11 === 0;
    const height = isLarge ? screenWidth * 0.65 : screenWidth / 3;

    return (
      <TouchableOpacity
        style={[styles.gridItem, {height}]}
        onPress={() =>
          navigation.navigate('PostDetail', {
            post: {
              ...post,
              images: [post.image],
              avatar: post.image,
              caption: `Amazing photo from ${post.petName}! 🐾`,
              bio: `${post.petType.charAt(0).toUpperCase() + post.petType.slice(1)} lover`,
              ownerName: `${post.petName}'s Owner`,
              username: `@${post.petName.toLowerCase()}`,
              timeAgo: '1h ago',
              shares: Math.floor(post.likes / 10),
            },
            allPosts: filteredPosts.map(p => ({
              ...p,
              images: [p.image],
              avatar: p.image,
              caption: `Amazing photo from ${p.petName}! 🐾`,
              bio: `${p.petType.charAt(0).toUpperCase() + p.petType.slice(1)} lover`,
              ownerName: `${p.petName}'s Owner`,
              username: `@${p.petName.toLowerCase()}`,
              timeAgo: '1h ago',
              shares: Math.floor(p.likes / 10),
            })),
          })
        }>
        <Image
          source={{uri: post.image}}
          alt={post.petName}
          width="100%"
          height="100%"
          resizeMode="cover"
        />

        {/* Overlay with engagement stats */}
        <Box style={styles.imageOverlay}>
          <HStack space={3} alignItems="center">
            <HStack alignItems="center" space={1}>
              <MaterialCommunityIcons name="heart" size={18} color="white" />
              <Text fontSize="sm" fontFamily="heading" color="white">
                {post.likes > 1000
                  ? `${(post.likes / 1000).toFixed(1)}k`
                  : post.likes}
              </Text>
            </HStack>
            {post.comments > 0 && (
              <HStack alignItems="center" space={1}>
                <Ionicons name="chatbubble" size={16} color="white" />
                <Text fontSize="sm" fontFamily="heading" color="white">
                  {post.comments}
                </Text>
              </HStack>
            )}
          </HStack>
        </Box>

        {/* Verified badge */}
        {post.isVerified && (
          <Box style={styles.verifiedBadge}>
            <MaterialCommunityIcons
              name="check-decagram"
              size={16}
              color="white"
            />
          </Box>
        )}
      </TouchableOpacity>
    );
  };

  const FilterChip = ({filter}) => {
    const isSelected = selectedFilter === filter.id;

    return (
      <TouchableOpacity
        style={[styles.filterChip, isSelected && styles.filterChipActive]}
        onPress={() => setSelectedFilter(filter.id)}>
        <HStack alignItems="center" space={1.5}>
          {filter.icon && (
            <Ionicons
              name={filter.icon}
              size={16}
              color={isSelected ? 'white' : '#6B7280'}
            />
          )}
          <Text
            fontSize="sm"
            fontFamily={isSelected ? 'heading' : 'body'}
            color={isSelected ? 'white' : 'gray.700'}>
            {filter.label}
          </Text>
        </HStack>
      </TouchableOpacity>
    );
  };

  return (
    <Box flex={1} bg="#F9FAFB">
      {/* Header with Search */}
      <Box bg="white" pt={12} pb={3} px={4} shadow={1}>
        <Text fontSize="2xl" fontFamily="heading" color="gray.800" mb={3}>
          Discover
        </Text>

        {/* Search Bar */}
        <HStack
          bg="#F3F4F6"
          borderRadius={12}
          px={3}
          py={2.5}
          alignItems="center"
          space={2}
          mb={3}>
          <Ionicons name="search" size={20} color="#9CA3AF" />
          <Input
            placeholder="Search pets, breeds, or tags..."
            placeholderTextColor="#9CA3AF"
            fontSize="sm"
            flex={1}
            borderWidth={0}
            bg="transparent"
            px={0}
            py={0}
            value={searchQuery}
            onChangeText={setSearchQuery}
            _focus={{
              bg: 'transparent',
            }}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </HStack>

        {/* Filter Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 4}}>
          <HStack space={2}>
            {filters.map(filter => (
              <FilterChip key={filter.id} filter={filter} />
            ))}
          </HStack>
        </ScrollView>
      </Box>

      {/* Posts Grid */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{paddingBottom: 100}}>
        {/* Stats Banner */}
        <Box bg="white" px={4} py={3} mb={2}>
          <HStack justifyContent="space-around">
            <VStack alignItems="center">
              <Text fontSize="lg" fontFamily="heading" color="gray.800">
                {filteredPosts.length}
              </Text>
              <Text fontSize="xs" color="gray.500">
                Posts
              </Text>
            </VStack>
            <VStack alignItems="center">
              <Text fontSize="lg" fontFamily="heading" color="gray.800">
                {filteredPosts
                  .reduce((sum, post) => sum + post.likes, 0)
                  .toLocaleString()}
              </Text>
              <Text fontSize="xs" color="gray.500">
                Total Likes
              </Text>
            </VStack>
            <VStack alignItems="center">
              <Text fontSize="lg" fontFamily="heading" color={Colors.primary}>
                {selectedFilter.charAt(0).toUpperCase() +
                  selectedFilter.slice(1)}
              </Text>
              <Text fontSize="xs" color="gray.500">
                Category
              </Text>
            </VStack>
          </HStack>
        </Box>

        {/* Dynamic Grid */}
        <Box bg="white">
          <HStack flexWrap="wrap">
            {filteredPosts.map((post, index) => (
              <DiscoverPostItem key={post.id} post={post} index={index} />
            ))}
          </HStack>

          {/* Empty State */}
          {filteredPosts.length === 0 && (
            <Box py={20} alignItems="center">
              <Box bg="#E8FAF3" p={6} borderRadius="full" mb={4}>
                <MaterialCommunityIcons
                  name="magnify"
                  size={48}
                  color={Colors.primary}
                />
              </Box>
              <Text fontSize="lg" fontFamily="heading" color="gray.700">
                No posts found
              </Text>
              <Text fontSize="sm" color="gray.500" mt={2} textAlign="center">
                Try a different filter or search term
              </Text>
            </Box>
          )}
        </Box>

        {/* Featured Pets Section */}
        <Box bg="white" mt={2} px={4} py={4}>
          <HStack alignItems="center" justifyContent="space-between" mb={3}>
            <Text fontSize="lg" fontFamily="heading" color="gray.800">
              Featured Pets 🌟
            </Text>
            <TouchableOpacity>
              <Text fontSize="sm" color={Colors.primary} fontWeight="600">
                See All
              </Text>
            </TouchableOpacity>
          </HStack>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 4}}>
            <HStack space={3}>
              {filteredPosts.slice(0, 6).map(post => (
                <TouchableOpacity
                  key={`featured-${post.id}`}
                  style={styles.featuredCard}>
                  <Image
                    source={{uri: post.image}}
                    alt={post.petName}
                    width="100%"
                    height={120}
                    borderRadius={12}
                    resizeMode="cover"
                  />
                  <VStack mt={2} space={0.5}>
                    <HStack alignItems="center" space={1}>
                      <Text fontSize="sm" fontFamily="heading" color="gray.800">
                        {post.petName}
                      </Text>
                      {post.isVerified && (
                        <MaterialCommunityIcons
                          name="check-decagram"
                          size={12}
                          color={Colors.primary}
                        />
                      )}
                    </HStack>
                    <HStack alignItems="center" space={2}>
                      <HStack alignItems="center" space={0.5}>
                        <Ionicons name="heart" size={12} color="#EF4444" />
                        <Text fontSize="xs" color="gray.600">
                          {post.likes > 1000
                            ? `${(post.likes / 1000).toFixed(1)}k`
                            : post.likes}
                        </Text>
                      </HStack>
                    </HStack>
                  </VStack>
                </TouchableOpacity>
              ))}
            </HStack>
          </ScrollView>
        </Box>
      </ScrollView>
    </Box>
  );
}

const styles = StyleSheet.create({
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  filterChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  gridItem: {
    width: screenWidth / 3,
    borderWidth: 0.5,
    borderColor: 'white',
    position: 'relative',
  },
  imageOverlay: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  verifiedBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: Colors.primary,
    padding: 4,
    borderRadius: 12,
  },
  featuredCard: {
    width: 140,
  },
});

export default Discover;
