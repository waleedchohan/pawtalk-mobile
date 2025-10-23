import React, {useState} from 'react';
import {
  Box,
  ScrollView,
  Text,
  VStack,
  HStack,
  Avatar,
  Image,
} from 'native-base';
import {
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput as RNTextInput,
  Modal,
  Platform,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
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
  },
  {
    id: 2,
    userName: 'Tom Anderson',
    userAvatar: 'https://i.pravatar.cc/150?img=2',
    comment: 'What a beautiful photo! 🌲',
    timeAgo: '45m ago',
    likes: 5,
  },
  {
    id: 3,
    userName: 'Emily Davis',
    userAvatar: 'https://i.pravatar.cc/150?img=3',
    comment: 'Give a pat from me 🐾',
    timeAgo: '30m ago',
    likes: 8,
  },
];

function PostDetail({navigation, route}) {
  const initialPost = route?.params?.post || {};
  const allPosts = route?.params?.allPosts || [initialPost];
  
  const [posts, setPosts] = useState(
    allPosts.map(p => ({
      ...p,
      isLiked: p.isLiked || false,
      isSaved: p.isSaved || false,
    })),
  );
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [commentText, setCommentText] = useState('');

  const handleLike = postId => {
    setPosts(
      posts.map(p =>
        p.id === postId
          ? {
              ...p,
              isLiked: !p.isLiked,
              likes: p.isLiked ? p.likes - 1 : p.likes + 1,
            }
          : p,
      ),
    );
  };

  const handleSave = postId => {
    setPosts(
      posts.map(p =>
        p.id === postId ? {...p, isSaved: !p.isSaved} : p,
      ),
    );
  };

  const openCommentsModal = post => {
    setSelectedPost(post);
    setShowCommentsModal(true);
  };

  const PostItem = ({post}) => (
    <Box bg="white" mb={0.5}>
      {/* Post Header */}
      <HStack p={4} alignItems="center" justifyContent="space-between">
        <TouchableOpacity
          onPress={() => navigation.navigate('PetProfile', {profile: post})}
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
      <Box px={4} pt={3} pb={3}>
        <HStack justifyContent="space-between" alignItems="center" mb={2}>
          <HStack space={5} alignItems="center">
            <TouchableOpacity onPress={() => handleLike(post.id)}>
              <MaterialCommunityIcons
                name={post.isLiked ? 'heart' : 'heart-outline'}
                size={28}
                color={post.isLiked ? '#EF4444' : '#374151'}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openCommentsModal(post)}>
              <Ionicons name="chatbubble-outline" size={26} color="#374151" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons
                name="paper-plane-outline"
                size={26}
                color="#374151"
              />
            </TouchableOpacity>
          </HStack>
          <TouchableOpacity onPress={() => handleSave(post.id)}>
            <Ionicons
              name={post.isSaved ? 'bookmark' : 'bookmark-outline'}
              size={26}
              color="#374151"
            />
          </TouchableOpacity>
        </HStack>

        {/* Likes Count */}
        <TouchableOpacity mb={2}>
          <Text fontSize="sm" fontFamily="heading" color="gray.800">
            {post.likes?.toLocaleString() || 0}{' '}
            {post.likes === 1 ? 'like' : 'likes'}
          </Text>
        </TouchableOpacity>

        {/* Caption */}
        <VStack space={1} mb={2}>
          <Text fontSize="sm" color="gray.800" numberOfLines={3}>
            <Text fontFamily="heading">{post.petName}</Text>{' '}
            <Text color="gray.700">{post.caption || post.bio}</Text>
          </Text>
        </VStack>

        {/* View all comments */}
        {post.comments > 0 && (
          <TouchableOpacity onPress={() => openCommentsModal(post)} mb={2}>
            <Text fontSize="sm" color="gray.500">
              View all {post.comments} comments
            </Text>
          </TouchableOpacity>
        )}

        {/* Time */}
        <Text fontSize="xs" color="gray.400">
          {post.timeAgo || '2 hours ago'}
        </Text>
      </Box>
    </Box>
  );

  return (
    <Box flex={1} bg="#F9FAFB">
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
            Posts
          </Text>
          <Box width={24} />
        </HStack>
      </Box>

      {/* Posts Feed - One per row, vertically scrollable */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 20}}>
        {posts.map(post => (
          <PostItem key={post.id} post={post} />
        ))}
      </ScrollView>

      {/* Comments Modal */}
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
              <Text fontSize="lg" fontFamily="heading" color="gray.800">
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
                  {sampleComments.map(comment => (
                    <HStack
                      key={comment.id}
                      space={3}
                      alignItems="flex-start">
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
                            fontFamily="heading"
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

                  {sampleComments.length === 0 && (
                    <Box py={8} alignItems="center">
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
                    </Box>
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
        </Box>
      </Modal>
    </Box>
  );
}

const styles = StyleSheet.create({
  commentInput: {
    fontSize: 14,
    color: '#374151',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    maxHeight: 100,
  },
});

export default PostDetail;

