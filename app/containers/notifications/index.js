import React, {useState} from 'react';
import {
  Box,
  ScrollView,
  Text,
  VStack,
  HStack,
  Avatar,
  Pressable,
  Badge,
  Divider,
} from 'native-base';
import {TouchableOpacity, StyleSheet, RefreshControl} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../themes/Colors';

// Sample notifications data
const sampleNotifications = [
  {
    id: 1,
    type: 'like',
    user: {
      name: 'Sarah Johnson',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    petName: 'Buddy',
    post: {
      image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=100',
    },
    message: 'liked your post',
    timeAgo: '5m ago',
    isRead: false,
  },
  {
    id: 2,
    type: 'comment',
    user: {
      name: 'Mike Anderson',
      avatar: 'https://i.pravatar.cc/150?img=2',
    },
    petName: 'Luna',
    post: {
      image:
        'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=100',
    },
    message: 'commented: "What a beautiful cat! 😍"',
    timeAgo: '15m ago',
    isRead: false,
  },
  {
    id: 3,
    type: 'follow',
    user: {
      name: 'Emma Davis',
      avatar: 'https://i.pravatar.cc/150?img=3',
    },
    message: 'started following you',
    timeAgo: '1h ago',
    isRead: false,
  },
  {
    id: 4,
    type: 'like',
    user: {
      name: 'James Wilson',
      avatar: 'https://i.pravatar.cc/150?img=4',
    },
    petName: 'Max',
    post: {
      image:
        'https://images.unsplash.com/photo-1568572933382-74d440642117?w=100',
    },
    message: 'and 12 others liked your post',
    timeAgo: '2h ago',
    isRead: true,
  },
  {
    id: 5,
    type: 'mention',
    user: {
      name: 'Olivia Brown',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
    message: 'mentioned you in a comment',
    timeAgo: '3h ago',
    isRead: true,
  },
  {
    id: 6,
    type: 'comment',
    user: {
      name: 'Alex Taylor',
      avatar: 'https://i.pravatar.cc/150?img=6',
    },
    petName: 'Charlie',
    post: {
      image:
        'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=100',
    },
    message: 'commented: "Amazing shot! 📸"',
    timeAgo: '5h ago',
    isRead: true,
  },
  {
    id: 7,
    type: 'follow',
    user: {
      name: 'Sophia Martinez',
      avatar: 'https://i.pravatar.cc/150?img=7',
    },
    message: 'started following you',
    timeAgo: '1d ago',
    isRead: true,
  },
  {
    id: 8,
    type: 'like',
    user: {
      name: 'Noah Garcia',
      avatar: 'https://i.pravatar.cc/150?img=8',
    },
    petName: 'Buddy',
    post: {
      image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=100',
    },
    message: 'liked your post',
    timeAgo: '2d ago',
    isRead: true,
  },
];

function Notifications({navigation}) {
  const [notifications, setNotifications] = useState(sampleNotifications);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTab, setSelectedTab] = useState('all'); // 'all' or 'mentions'

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const getNotificationIcon = type => {
    switch (type) {
      case 'like':
        return {name: 'heart', color: '#EF4444', bg: '#FEE2E2'};
      case 'comment':
        return {name: 'chatbubble', color: '#3B82F6', bg: '#DBEAFE'};
      case 'follow':
        return {name: 'person-add', color: Colors.primary, bg: '#E8F8F1'};
      case 'mention':
        return {name: 'at', color: '#8B5CF6', bg: '#EDE9FE'};
      default:
        return {name: 'notifications', color: '#6B7280', bg: '#F3F4F6'};
    }
  };

  const NotificationItem = ({notification}) => {
    const iconConfig = getNotificationIcon(notification.type);

    return (
      <Pressable>
        {({isPressed}) => (
          <Box
            bg={notification.isRead ? 'white' : '#F0F9FF'}
            px={4}
            py={3}
            opacity={isPressed ? 0.7 : 1}>
            <HStack space={3} alignItems="center">
              {/* User Avatar with Icon Badge */}
              <Box position="relative">
                <Avatar
                  source={{uri: notification.user.avatar}}
                  size="md"
                  bg="gray.200"
                />
                <Box
                  position="absolute"
                  bottom={-2}
                  right={-2}
                  bg={iconConfig.bg}
                  p={1}
                  borderRadius="full"
                  borderWidth={2}
                  borderColor="white">
                  <Ionicons
                    name={iconConfig.name}
                    size={12}
                    color={iconConfig.color}
                  />
                </Box>
              </Box>

              {/* Notification Content */}
              <VStack flex={1} space={0.5}>
                <Text fontSize="sm" color="gray.800">
                  <Text fontFamily="heading">{notification.user.name}</Text>{' '}
                  <Text color="gray.600">{notification.message}</Text>
                </Text>
                <Text fontSize="xs" color="gray.500">
                  {notification.timeAgo}
                </Text>
              </VStack>

              {/* Post Thumbnail or Follow Button */}
              {notification.post ? (
                <Box
                  width={12}
                  height={12}
                  borderRadius={8}
                  overflow="hidden"
                  borderWidth={1}
                  borderColor="gray.200">
                  <Avatar
                    source={{uri: notification.post.image}}
                    size="full"
                    bg="gray.100"
                  />
                </Box>
              ) : notification.type === 'follow' ? (
                <TouchableOpacity style={styles.followButton}>
                  <Text
                    fontSize="xs"
                    fontFamily="heading"
                    color={Colors.primary}>
                    Follow
                  </Text>
                </TouchableOpacity>
              ) : null}

              {/* Unread Indicator */}
              {!notification.isRead && (
                <Box
                  width={2}
                  height={2}
                  borderRadius="full"
                  bg={Colors.primary}
                />
              )}
            </HStack>
          </Box>
        )}
      </Pressable>
    );
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <Box flex={1} bg="#F9FAFB">
      {/* Header */}
      <Box bg="white" pt={12} pb={4} px={5} shadow={2}>
        <HStack alignItems="center" justifyContent="space-between" mb={4}>
          <HStack alignItems="center" space={3}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="#374151" />
            </TouchableOpacity>
            <Text fontSize="lg" fontFamily="heading" color="gray.800">
              Notifications
            </Text>
          </HStack>
        </HStack>

        {/* Tabs */}
        <HStack space={4}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'all' && styles.activeTab]}
            onPress={() => setSelectedTab('all')}>
            <Text
              fontSize="sm"
              fontFamily={selectedTab === 'all' ? 'heading' : 'body'}
              color={selectedTab === 'all' ? Colors.primary : 'gray.500'}>
              All {unreadCount > 0 && `(${unreadCount})`}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'mentions' && styles.activeTab]}
            onPress={() => setSelectedTab('mentions')}>
            <Text
              fontSize="sm"
              fontFamily={selectedTab === 'mentions' ? 'heading' : 'body'}
              color={selectedTab === 'mentions' ? Colors.primary : 'gray.500'}>
              Mentions
            </Text>
          </TouchableOpacity>
        </HStack>
      </Box>

      {/* Notifications List */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {/* Today Section */}
        {notifications.some(
          n => n.timeAgo.includes('m') || n.timeAgo.includes('h'),
        ) && (
          <Box>
            <Box px={4} py={2} bg="gray.50">
              <Text fontSize="xs" fontFamily="heading" color="gray.600">
                TODAY
              </Text>
            </Box>
            {notifications
              .filter(n => n.timeAgo.includes('m') || n.timeAgo.includes('h'))
              .map((notification, index, arr) => (
                <Box key={notification.id}>
                  <NotificationItem notification={notification} />
                  {index < arr.length - 1 && <Divider bg="gray.100" />}
                </Box>
              ))}
          </Box>
        )}

        {/* Earlier Section */}
        {notifications.some(n => n.timeAgo.includes('d')) && (
          <Box mt={2}>
            <Box px={4} py={2} bg="gray.50">
              <Text fontSize="xs" fontFamily="heading" color="gray.600">
                EARLIER
              </Text>
            </Box>
            {notifications
              .filter(n => n.timeAgo.includes('d'))
              .map((notification, index, arr) => (
                <Box key={notification.id}>
                  <NotificationItem notification={notification} />
                  {index < arr.length - 1 && <Divider bg="gray.100" />}
                </Box>
              ))}
          </Box>
        )}

        {/* Bottom Padding */}
        <Box pb={100} />
      </ScrollView>
    </Box>
  );
}

const styles = StyleSheet.create({
  tab: {
    paddingBottom: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
  },
  followButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    backgroundColor: 'white',
  },
});

export default Notifications;
