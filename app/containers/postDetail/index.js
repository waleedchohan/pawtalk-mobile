import React, {useState} from 'react';
import {
  Box,
  ScrollView,
  Text,
  VStack,
  HStack,
  Avatar,
  Badge,
  Image,
  Divider,
  Input,
} from 'native-base';
import {
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput as RNTextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../themes/Colors';

const screenWidth = Dimensions.get('window').width;

// Sample comments
const sampleComments = [
  {
    id: 1,
    userName: 'Jessica Miller',
    userAvatar: 'https://i.pravatar.cc/150?img=1',
    comment: 'Aww, so adorable! 🥰',
    timeAgo: '1h ago',
    likes: 12,
    isLiked: false,
  },
  {
    id: 2,
    userName: 'Tom Anderson',
    userAvatar: 'https://i.pravatar.cc/150?img=2',
    comment: 'What a beautiful photo! 🌲',
    timeAgo: '45m ago',
    likes: 5,
    isLiked: false,
  },
  {
    id: 3,
    userName: 'Emily Davis',
    userAvatar: 'https://i.pravatar.cc/150?img=3',
    comment: 'Give a pat from me 🐾',
    timeAgo: '30m ago',
    likes: 8,
    isLiked: false,
  },
];

function PostDetail({navigation, route}) {
  const post = route?.params?.post || {};
  
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [isSaved, setIsSaved] = useState(post.isSaved || false);
  const [likes, setLikes] = useState(post.likes || 0);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState(sampleComments);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const handleCommentLike = commentId => {
    setComments(
      comments.map(c =>
        c.id === commentId
          ? {
              ...c,
              isLiked: !c.isLiked,
              likes: c.isLiked ? c.likes - 1 : c.likes + 1,
            }
          : c,
      ),
    );
  };

  const CommentItem = ({comment}) => (
    <HStack space={3} alignItems="flex-start" mb={4}>
      <Avatar source={{uri: comment.userAvatar}} size="sm" bg="gray.200" />
      <VStack flex={1} space={1}>
        <Text fontSize="sm" color="gray.800">
          <Text fontFamily="heading">{comment.userName}</Text>{' '}
          <Text color="gray.700">{comment.comment}</Text>
        </Text>
        <HStack alignItems="center" space={4}>
          <Text fontSize="xs" color="gray.500">
            {comment.timeAgo}
          </Text>
          {comment.likes > 0 && (
            <Text fontSize="xs" color="gray.500" fontWeight="500">
              {comment.likes} {comment.likes === 1 ? 'like' : 'likes'}
            </Text>
          )}
          <TouchableOpacity>
            <Text fontSize="xs" color="gray.500" fontWeight="600">
              Reply
            </Text>
          </TouchableOpacity>
        </HStack>
      </VStack>
      <TouchableOpacity onPress={() => handleCommentLike(comment.id)}>
        <Ionicons
          name={comment.isLiked ? 'heart' : 'heart-outline'}
          size={14}
          color={comment.isLiked ? '#EF4444' : '#9CA3AF'}
        />
      </TouchableOpacity>
    </HStack>
  );

  return (
    <Box flex={1} bg="white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}
        keyboardVerticalOffset={0}>
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
            <Text fontSize="md" fontFamily="heading" color="gray.800">
              Post
            </Text>
            <TouchableOpacity>
              <Ionicons name="paper-plane-outline" size={24} color="#374151" />
            </TouchableOpacity>
          </HStack>
        </Box>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Post Header */}
          <HStack p={4} alignItems="center" justifyContent="space-between">
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('PetProfile', {profile: post})
              }
              style={{flex: 1}}>
              <HStack alignItems="center" space={3}>
                <Avatar source={{uri: post.avatar}} size="md" bg="gray.200" />
                <VStack flex={1}>
                  <HStack alignItems="center" space={2}>
                    <Text fontFamily="heading" fontSize="md" color="gray.800">
                      {post.petName}
                    </Text>
                    {post.isVerified && (
                      <MaterialCommunityIcons
                        name="check-decagram"
                        size={14}
                        color={Colors.primary}
                      />
                    )}
                  </HStack>
                  {post.location && (
                    <Text fontSize="xs" color="gray.500">
                      {post.location}
                    </Text>
                  )}
                </VStack>
              </HStack>
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialCommunityIcons
                name="dots-vertical"
                size={24}
                color="#6B7280"
              />
            </TouchableOpacity>
          </HStack>

          {/* Image */}
          <Box width="100%" height={screenWidth} bg="gray.100">
            <Image
              source={{uri: post.image || post.images?.[0]}}
              alt="Post"
              width="100%"
              height="100%"
              resizeMode="cover"
            />
          </Box>

          {/* Actions */}
          <Box px={4} pt={3}>
            <HStack justifyContent="space-between" alignItems="center" mb={2}>
              <HStack space={5} alignItems="center">
                <TouchableOpacity onPress={handleLike}>
                  <MaterialCommunityIcons
                    name={isLiked ? 'heart' : 'heart-outline'}
                    size={28}
                    color={isLiked ? '#EF4444' : '#374151'}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Ionicons
                    name="chatbubble-outline"
                    size={26}
                    color="#374151"
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Ionicons
                    name="paper-plane-outline"
                    size={26}
                    color="#374151"
                  />
                </TouchableOpacity>
              </HStack>
              <TouchableOpacity onPress={() => setIsSaved(!isSaved)}>
                <Ionicons
                  name={isSaved ? 'bookmark' : 'bookmark-outline'}
                  size={26}
                  color="#374151"
                />
              </TouchableOpacity>
            </HStack>

            {/* Likes Count */}
            <TouchableOpacity mb={2}>
              <Text fontSize="sm" fontFamily="heading" color="gray.800">
                {likes.toLocaleString()} {likes === 1 ? 'like' : 'likes'}
              </Text>
            </TouchableOpacity>

            {/* Caption */}
            <VStack space={1} mb={3}>
              <Text fontSize="sm" color="gray.800">
                <Text fontFamily="heading">{post.petName}</Text>{' '}
                <Text color="gray.700">{post.caption || post.bio}</Text>
              </Text>
              {post.tags && post.tags.length > 0 && (
                <Text fontSize="sm" color="#3B82F6">
                  {post.tags.join(' ')}
                </Text>
              )}
            </VStack>

            {/* Time */}
            <Text fontSize="xs" color="gray.400" mb={4}>
              {post.timeAgo || '2 hours ago'}
            </Text>
          </Box>

          <Divider bg="gray.200" />

          {/* Comments Section */}
          <Box px={4} py={4}>
            <Text fontSize="md" fontFamily="heading" color="gray.800" mb={4}>
              Comments
            </Text>
            {comments.map(comment => (
              <CommentItem key={comment.id} comment={comment} />
            ))}

            {comments.length === 0 && (
              <Box py={8} alignItems="center">
                <Text fontSize="sm" color="gray.500">
                  No comments yet
                </Text>
                <Text fontSize="xs" color="gray.400" mt={1}>
                  Be the first to comment!
                </Text>
              </Box>
            )}
          </Box>

          {/* Bottom spacing for keyboard */}
          <Box pb={80} />
        </ScrollView>

        {/* Comment Input */}
        <Box
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          bg="white"
          borderTopWidth={1}
          borderTopColor="gray.200"
          px={4}
          py={2}
          pb={Platform.OS === 'ios' ? 6 : 2}>
          <HStack alignItems="center" space={3}>
            <Avatar size="sm" bg="#E8FAF3">
              <Text fontSize="xs">🐾</Text>
            </Avatar>
            <Box flex={1}>
              <RNTextInput
                placeholder="Add a comment..."
                placeholderTextColor="#9CA3AF"
                value={commentText}
                onChangeText={setCommentText}
                style={styles.commentInput}
                multiline
              />
            </Box>
            <TouchableOpacity disabled={!commentText.trim()}>
              <Text
                fontSize="sm"
                fontFamily="heading"
                color={commentText.trim() ? Colors.primary : '#D1D5DB'}>
                Post
              </Text>
            </TouchableOpacity>
          </HStack>
        </Box>
      </KeyboardAvoidingView>
    </Box>
  );
}

const styles = StyleSheet.create({
  commentInput: {
    fontSize: 14,
    color: '#374151',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    maxHeight: 100,
  },
});

export default PostDetail;

