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
  Input,
  Icon,
} from 'native-base';
import {TouchableOpacity, StyleSheet, RefreshControl} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../themes/Colors';

// Sample conversations data
const sampleConversations = [
  {
    id: 1,
    user: {
      name: 'Sarah & Buddy',
      avatar: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=100',
      isOnline: true,
    },
    lastMessage: {
      text: 'Thanks for the training tips! Buddy loves them 🐕',
      timestamp: '2m ago',
      isRead: false,
    },
    unreadCount: 2,
  },
  {
    id: 2,
    user: {
      name: 'Emma & Luna',
      avatar:
        'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=100',
      isOnline: true,
    },
    lastMessage: {
      text: 'Would love to arrange a playdate! 😊',
      timestamp: '15m ago',
      isRead: false,
    },
    unreadCount: 1,
  },
  {
    id: 3,
    user: {
      name: 'Mike & Max',
      avatar:
        'https://images.unsplash.com/photo-1568572933382-74d440642117?w=100',
      isOnline: false,
    },
    lastMessage: {
      text: 'You: Great photos! Where did you get that collar?',
      timestamp: '1h ago',
      isRead: true,
    },
    unreadCount: 0,
  },
  {
    id: 4,
    user: {
      name: 'Jessica & Whiskers',
      avatar:
        'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=100',
      isOnline: false,
    },
    lastMessage: {
      text: 'You: That toy looks perfect for cats!',
      timestamp: '3h ago',
      isRead: true,
    },
    unreadCount: 0,
  },
  {
    id: 5,
    user: {
      name: 'Tom & Charlie',
      avatar:
        'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=100',
      isOnline: true,
    },
    lastMessage: {
      text: 'See you at the park tomorrow! 🎾',
      timestamp: '5h ago',
      isRead: true,
    },
    unreadCount: 0,
  },
  {
    id: 6,
    user: {
      name: 'Olivia & Bella',
      avatar: 'https://i.pravatar.cc/150?img=9',
      isOnline: false,
    },
    lastMessage: {
      text: 'You: Thanks for the recommendation!',
      timestamp: '1d ago',
      isRead: true,
    },
    unreadCount: 0,
  },
  {
    id: 7,
    user: {
      name: 'David & Rocky',
      avatar: 'https://i.pravatar.cc/150?img=10',
      isOnline: false,
    },
    lastMessage: {
      text: "Let's catch up soon!",
      timestamp: '2d ago',
      isRead: true,
    },
    unreadCount: 0,
  },
];

function Messages({navigation}) {
  const [conversations, setConversations] = useState(sampleConversations);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const ConversationItem = ({conversation}) => {
    const isUnread = conversation.unreadCount > 0;
    const isYourMessage = conversation.lastMessage.text.startsWith('You:');

    return (
      <Pressable>
        {({isPressed}) => (
          <Box
            bg="white"
            px={4}
            py={3}
            opacity={isPressed ? 0.7 : 1}
            borderBottomWidth={1}
            borderBottomColor="gray.100">
            <HStack space={3} alignItems="center">
              {/* Avatar with Online Status */}
              <Box position="relative">
                <Avatar
                  source={{uri: conversation.user.avatar}}
                  size="lg"
                  bg="gray.200"
                />
                {conversation.user.isOnline && (
                  <Box
                    position="absolute"
                    bottom={0}
                    right={0}
                    width={4}
                    height={4}
                    borderRadius="full"
                    bg={Colors.primary}
                    borderWidth={2}
                    borderColor="white"
                  />
                )}
              </Box>

              {/* Message Content */}
              <VStack flex={1} space={0.5}>
                <HStack alignItems="center" justifyContent="space-between">
                  <Text
                    fontSize="md"
                    fontFamily={isUnread ? 'heading' : 'body'}
                    color="gray.800"
                    numberOfLines={1}
                    flex={1}>
                    {conversation.user.name}
                  </Text>
                  <Text
                    fontSize="xs"
                    color={isUnread ? Colors.primary : 'gray.500'}
                    fontWeight={isUnread ? '600' : '400'}>
                    {conversation.lastMessage.timestamp}
                  </Text>
                </HStack>
                <HStack alignItems="center" justifyContent="space-between">
                  <Text
                    fontSize="sm"
                    color={isUnread ? 'gray.700' : 'gray.500'}
                    fontWeight={isUnread ? '500' : '400'}
                    numberOfLines={1}
                    flex={1}
                    pr={2}>
                    {conversation.lastMessage.text}
                  </Text>
                  {isUnread && (
                    <Badge
                      bg={Colors.primary}
                      borderRadius="full"
                      minW={5}
                      h={5}
                      alignItems="center"
                      justifyContent="center"
                      _text={{
                        fontSize: '2xs',
                        color: 'white',
                        fontWeight: 'bold',
                      }}>
                      {conversation.unreadCount}
                    </Badge>
                  )}
                </HStack>
              </VStack>
            </HStack>
          </Box>
        )}
      </Pressable>
    );
  };

  const unreadCount = conversations.filter(c => c.unreadCount > 0).length;

  return (
    <Box flex={1} bg="#F9FAFB">
      {/* Header */}
      <Box bg="white" pt={12} pb={3} px={5} shadow={2}>
        <HStack alignItems="center" justifyContent="space-between" mb={4}>
          <HStack alignItems="center" space={3}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="#374151" />
            </TouchableOpacity>
            <Text fontSize="lg" fontFamily="heading" color="gray.800">
              Messages {unreadCount > 0 && `(${unreadCount})`}
            </Text>
          </HStack>
          <TouchableOpacity>
            <Ionicons name="create-outline" size={26} color="#374151" />
          </TouchableOpacity>
        </HStack>

        {/* Search Bar */}
        <HStack
          bg="#F3F4F6"
          borderRadius={12}
          px={3}
          py={2}
          alignItems="center"
          space={2}>
          <Ionicons name="search" size={20} color="#9CA3AF" />
          <Input
            placeholder="Search messages..."
            placeholderTextColor="#9CA3AF"
            fontSize="sm"
            flex={1}
            borderWidth={0}
            bg="transparent"
            px={0}
            py={1}
            value={searchQuery}
            onChangeText={setSearchQuery}
            _focus={{
              bg: 'transparent',
            }}
          />
        </HStack>
      </Box>

      {/* Conversations List */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Box bg="white">
          {conversations.map(conversation => (
            <ConversationItem
              key={conversation.id}
              conversation={conversation}
            />
          ))}
        </Box>

        {/* Empty State */}
        {conversations.length === 0 && (
          <Box flex={1} alignItems="center" justifyContent="center" py={20}>
            <Box bg="#E8FAF3" p={6} borderRadius="full" mb={4}>
              <MaterialCommunityIcons
                name="message-text-outline"
                size={48}
                color={Colors.primary}
              />
            </Box>
            <Text fontSize="lg" fontFamily="heading" color="gray.700">
              No messages yet
            </Text>
            <Text fontSize="sm" color="gray.500" mt={2} textAlign="center">
              Start a conversation with your pet friends!
            </Text>
          </Box>
        )}

        {/* Bottom Padding */}
        <Box pb={100} />
      </ScrollView>
    </Box>
  );
}

const styles = StyleSheet.create({
  // Add any additional styles here if needed
});

export default Messages;
