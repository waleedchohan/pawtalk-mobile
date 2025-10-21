import React, {useState} from 'react';
import {
  Box,
  ScrollView,
  Text,
  VStack,
  HStack,
  Avatar,
  Pressable,
  Center,
  Image,
  Badge,
  Divider,
} from 'native-base';
import {
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../themes/Colors';

const screenWidth = Dimensions.get('window').width;

// Sample user data
const userData = {
  name: 'Sarah Anderson',
  username: '@sarahluvspets',
  bio: 'Pet lover 🐾 | Dog mom of 3 | Cat enthusiast',
  avatar: 'https://i.pravatar.cc/300',
  followers: 1247,
  following: 892,
  posts: 156,
};

// Sample pets data with stats
const userPets = [
  {
    id: 1,
    name: 'Buddy',
    type: 'Golden Retriever',
    age: '3 years',
    avatar: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400',
    stats: {
      posts: 45,
      followers: 523,
      treats: 1234,
    },
    badges: ['Most Active', 'Friendly'],
    color: '#FFB84D',
  },
  {
    id: 2,
    name: 'Max',
    type: 'German Shepherd',
    age: '5 years',
    avatar:
      'https://images.unsplash.com/photo-1568572933382-74d440642117?w=400',
    stats: {
      posts: 38,
      followers: 421,
      treats: 987,
    },
    badges: ['Guardian', 'Loyal'],
    color: '#FF6B6B',
  },
  {
    id: 3,
    name: 'Luna',
    type: 'Persian Cat',
    age: '2 years',
    avatar:
      'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=400',
    stats: {
      posts: 52,
      followers: 678,
      treats: 1456,
    },
    badges: ['Cutest', 'Trending'],
    color: '#A78BFA',
  },
  {
    id: 4,
    name: 'Charlie',
    type: 'Border Collie',
    age: '4 years',
    avatar:
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400',
    stats: {
      posts: 31,
      followers: 345,
      treats: 756,
    },
    badges: ['Playful'],
    color: '#4ECDC4',
  },
];

function Profile({navigation}) {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTab, setSelectedTab] = useState('pets'); // 'pets' or 'posts'

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const StatCard = ({icon, iconColor, label, value}) => (
    <VStack alignItems="center" space={2} flex={1}>
      <Box bg={`${iconColor}10`} p={2.5} borderRadius={12}>
        <MaterialCommunityIcons name={icon} size={22} color={iconColor} />
      </Box>
      <VStack alignItems="center" space={0.5}>
        <Text fontSize="xl" fontFamily="heading" color="gray.800">
          {value}
        </Text>
        <Text
          fontSize="xs"
          color="gray.500"
          fontWeight="500"
          letterSpacing={0.3}>
          {label}
        </Text>
      </VStack>
    </VStack>
  );

  const PetCard = ({pet}) => (
    <Pressable>
      {({isPressed}) => (
        <Box
          bg="white"
          borderRadius={20}
          overflow="hidden"
          mb={4}
          shadow={2}
          transform={[{scale: isPressed ? 0.98 : 1}]}
          style={{
            shadowColor: pet.color,
            shadowOpacity: 0.15,
          }}>
          {/* Pet Header with Image */}
          <Box position="relative" height={200}>
            <Image
              source={{uri: pet.avatar}}
              alt={pet.name}
              width="100%"
              height={200}
              resizeMode="cover"
            />
            <Box
              position="absolute"
              bottom={0}
              left={0}
              right={0}
              bg="rgba(0,0,0,0.5)"
              px={4}
              py={3}>
              <HStack alignItems="center" justifyContent="space-between">
                <VStack>
                  <Text fontSize="2xl" fontFamily="heading" color="white">
                    {pet.name}
                  </Text>
                  <HStack alignItems="center" space={2}>
                    <Text fontSize="sm" color="white" opacity={0.9}>
                      {pet.type}
                    </Text>
                    <Text fontSize="sm" color="white" opacity={0.7}>
                      • {pet.age}
                    </Text>
                  </HStack>
                </VStack>
                <Box
                  bg={pet.color}
                  p={2.5}
                  borderRadius="full"
                  borderWidth={3}
                  borderColor="white">
                  <MaterialCommunityIcons name="paw" size={20} color="white" />
                </Box>
              </HStack>
            </Box>
          </Box>

          {/* Pet Stats */}
          <HStack
            px={4}
            py={4}
            bg="gray.50"
            justifyContent="space-around"
            borderBottomWidth={1}
            borderBottomColor="gray.100">
            <VStack alignItems="center" flex={1}>
              <Text fontSize="lg" fontFamily="heading" color="gray.800">
                {pet.stats.posts}
              </Text>
              <Text fontSize="xs" color="gray.500" mt={0.5}>
                Posts
              </Text>
            </VStack>
            <Divider orientation="vertical" bg="gray.300" />
            <VStack alignItems="center" flex={1}>
              <Text fontSize="lg" fontFamily="heading" color="gray.800">
                {pet.stats.followers}
              </Text>
              <Text fontSize="xs" color="gray.500" mt={0.5}>
                Followers
              </Text>
            </VStack>
            <Divider orientation="vertical" bg="gray.300" />
            <VStack alignItems="center" flex={1}>
              <HStack alignItems="center" space={1}>
                <MaterialCommunityIcons
                  name="bone"
                  size={16}
                  color={Colors.orange}
                />
                <Text fontSize="lg" fontFamily="heading" color="gray.800">
                  {pet.stats.treats}
                </Text>
              </HStack>
              <Text fontSize="xs" color="gray.500" mt={0.5}>
                Treats
              </Text>
            </VStack>
          </HStack>

          {/* Badges */}
          <HStack px={4} py={3} space={2} flexWrap="wrap">
            {pet.badges.map((badge, index) => (
              <Badge
                key={index}
                bg={`${pet.color}20`}
                borderRadius="full"
                px={3}
                py={1}
                mb={1}
                _text={{
                  color: pet.color,
                  fontSize: 'xs',
                  fontWeight: '600',
                }}>
                {badge}
              </Badge>
            ))}
          </HStack>
        </Box>
      )}
    </Pressable>
  );

  return (
    <Box flex={1} bg="#F9FAFB">
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {/* Profile Header */}
        <Box bg="white" pt={12} pb={6} px={5} shadow={1}>
          {/* Settings Icon */}
          <TouchableOpacity style={styles.settingsButton}>
            <Ionicons name="settings-outline" size={24} color="#374151" />
          </TouchableOpacity>

          {/* Profile Image */}
          <Center>
            <Box position="relative">
              <Avatar
                source={{uri: userData.avatar}}
                size="2xl"
                borderWidth={4}
                borderColor="white"
                shadow={4}
              />
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
            </Box>
          </Center>

          {/* User Info */}
          <VStack alignItems="center" mt={4} space={1}>
            <Text fontSize="lg" fontFamily="heading" color="gray.800">
              {userData.name}
            </Text>
            <Text fontSize="sm" color="gray.500" fontWeight="500">
              {userData.username}
            </Text>
            <Text
              fontSize="sm"
              color="gray.600"
              textAlign="center"
              mt={2}
              px={6}>
              {userData.bio}
            </Text>
          </VStack>

          {/* User Stats */}
          <HStack space={3} mt={6} mb={4} px={4}>
            <Box
              flex={1}
              bg="white"
              borderRadius={16}
              py={4}
              shadow={2}
              borderWidth={1}
              borderColor="gray.100">
              <StatCard
                icon="image-multiple"
                iconColor="#8B5CF6"
                label="Posts"
                value={userData.posts}
              />
            </Box>
            <Box
              flex={1}
              bg="white"
              borderRadius={16}
              py={4}
              shadow={2}
              borderWidth={1}
              borderColor="gray.100">
              <StatCard
                icon="account-heart"
                iconColor="#6FE5A9"
                label="Followers"
                value={userData.followers.toLocaleString()}
              />
            </Box>
            <Box
              flex={1}
              bg="white"
              borderRadius={16}
              py={4}
              shadow={2}
              borderWidth={1}
              borderColor="gray.100">
              <StatCard
                icon="account-multiple-plus"
                iconColor="#FF6B6B"
                label="Following"
                value={userData.following}
              />
            </Box>
          </HStack>

          {/* Action Buttons */}
          <HStack space={3} px={4} mt={2}>
            <TouchableOpacity style={styles.editButton}>
              <Text fontSize="sm" fontFamily="heading" color="white">
                Edit Profile
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareButton}>
              <Ionicons name="share-social-outline" size={20} color="#374151" />
            </TouchableOpacity>
          </HStack>
        </Box>

        {/* Tabs */}
        <HStack bg="white" mt={2} px={5} pt={3} shadow={1}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'pets' && styles.activeTab]}
            onPress={() => setSelectedTab('pets')}>
            <HStack alignItems="center" space={2}>
              <MaterialCommunityIcons
                name="paw"
                size={20}
                color={selectedTab === 'pets' ? Colors.primary : '#9CA3AF'}
              />
              <Text
                fontSize="sm"
                fontFamily="heading"
                color={selectedTab === 'pets' ? Colors.primary : '#9CA3AF'}>
                My Pets ({userPets.length})
              </Text>
            </HStack>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, selectedTab === 'posts' && styles.activeTab]}
            onPress={() => setSelectedTab('posts')}>
            <HStack alignItems="center" space={2}>
              <MaterialCommunityIcons
                name="grid"
                size={20}
                color={selectedTab === 'posts' ? Colors.primary : '#9CA3AF'}
              />
              <Text
                fontSize="sm"
                fontFamily="heading"
                color={selectedTab === 'posts' ? Colors.primary : '#9CA3AF'}>
                Posts
              </Text>
            </HStack>
          </TouchableOpacity>
        </HStack>

        {/* Content */}
        {selectedTab === 'pets' ? (
          <Box px={4} pt={4} pb={100}>
            {/* Add Pet Button */}
            <Pressable mb={4}>
              {({isPressed}) => (
                <Box
                  bg="white"
                  borderRadius={20}
                  borderWidth={2}
                  borderColor={Colors.primary}
                  borderStyle="dashed"
                  p={6}
                  alignItems="center"
                  transform={[{scale: isPressed ? 0.98 : 1}]}>
                  <Box
                    bg={`${Colors.primary}15`}
                    p={4}
                    borderRadius="full"
                    mb={3}>
                    <MaterialCommunityIcons
                      name="plus"
                      size={32}
                      color={Colors.primary}
                    />
                  </Box>
                  <Text
                    fontSize="md"
                    fontFamily="heading"
                    color={Colors.primary}>
                    Add New Pet
                  </Text>
                  <Text fontSize="xs" color="gray.500" mt={1}>
                    Share your furry friend with the world
                  </Text>
                </Box>
              )}
            </Pressable>

            {/* Pet Cards */}
            {userPets.map(pet => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </Box>
        ) : (
          <Box px={4} pt={4} pb={100}>
            <Center py={20}>
              <Box bg="#E8FAF3" p={6} borderRadius="full" mb={4}>
                <MaterialCommunityIcons
                  name="grid-large"
                  size={48}
                  color={Colors.primary}
                />
              </Box>
              <Text fontSize="lg" fontFamily="heading" color="gray.700">
                No posts yet
              </Text>
              <Text fontSize="sm" color="gray.500" mt={2} textAlign="center">
                Your posts will appear here
              </Text>
            </Center>
          </Box>
        )}
      </ScrollView>
    </Box>
  );
}

const styles = StyleSheet.create({
  settingsButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    padding: 8,
  },
  editButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareButton: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: Colors.primary,
  },
});

export default Profile;
