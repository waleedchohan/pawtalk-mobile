# PawTalk Implementation Tips & Best Practices

## 🚀 Getting Started

### Running the Updated UI

```bash
# Navigate to mobile directory
cd pawtalk-mobile

# Install dependencies (if needed)
npm install

# Run on iOS
npm run ios

# Run on Android
npm run android
```

### Testing the New Features

1. **Story Section**

   - Scroll horizontally through stories
   - Tap "Add Story" to test navigation
   - Verify purple ring on new stories
   - Check responsive layout

2. **Feed Cards**

   - Test image carousel swiping
   - Tap like button to see animation
   - Try bookmark/save functionality
   - Verify all badges and indicators

3. **Quick Actions**
   - Test each action button
   - Verify color-coded backgrounds
   - Check touch feedback

## 🎨 Customization Guide

### Changing Brand Colors

Edit `/app/Themes/Colors.js`:

```javascript
const colors = {
  primaryText: '#323243',
  secondaryText: '#6A778B',
  red: '#FF5733',
  blue: '#0A1849',
  lightBlue: '#E7F4FC',
  bg: '#F5F5F5',
  btnBg: '#6FE5A9',
  grey: '#FAFAFA',
  orange: '#FC905F',
  purple: '#555EEE', // Main brand color - update this
  lightGrey: '#D3D3D3',
  darkGrey: '#EFEFEF',
};
```

Then update in Home/index.js:

- Replace `#6FE5A9` with your brand color
- Replace `#EF4444` with your preferred like color
- Replace `#10B981` with your preferred share color

### Customizing Card Layout

In `/app/Containers/Home/index.js`:

```javascript
// Adjust card spacing
<Box bg="white" borderRadius={16} shadow={3} mb={5}>
//                    ↑ Radius    ↑ Shadow  ↑ Margin

// Adjust image aspect ratio
<Box width={screenWidth} height={screenWidth}>
//                               ↑ Change to screenWidth * 0.75 for 4:3
```

### Modifying Story Size

```javascript
// In StoryCard component
<Box
  width={70}    // Change to 80 for larger
  height={70}   // Change to 80 for larger
  borderRadius={35}  // Keep half of width/height
```

## 🔧 Common Customizations

### 1. Add Loading States

```javascript
const [loading, setLoading] = useState(true);
const [posts, setPosts] = useState([]);

// In ScrollView
{
  loading ? (
    <Spinner color="purple.500" />
  ) : (
    posts.map(post => <PostCard key={post.id} post={post} />)
  );
}
```

### 2. Pull-to-Refresh

```javascript
import {RefreshControl} from 'react-native';

const [refreshing, setRefreshing] = useState(false);

const onRefresh = () => {
  setRefreshing(true);
  // Fetch new data
  setTimeout(() => setRefreshing(false), 2000);
};

<ScrollView
  refreshControl={
    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
  }
>
```

### 3. Infinite Scroll

```javascript
const [page, setPage] = useState(1);

const loadMore = () => {
  // Fetch more posts
  setPage(page + 1);
};

<ScrollView
  onScroll={({nativeEvent}) => {
    if (isCloseToBottom(nativeEvent)) {
      loadMore();
    }
  }}
  scrollEventThrottle={400}
>
```

### 4. Image Error Handling

```javascript
<Image
  source={{uri: post.avatar}}
  alt={post.petName}
  fallbackSource={require('../../assets/images/default-pet.png')}
  onError={() => console.log('Image failed to load')}
/>
```

### 5. Navigation Setup

```javascript
// In PostCard header
<TouchableOpacity onPress={() => navigation.navigate('PetProfile', {
  petId: post.id,
  petName: post.petName
})}>
  <HStack alignItems="center" space={3}>
    <Avatar source={{uri: post.avatar}} />
    <Text>{post.petName}</Text>
  </HStack>
</TouchableOpacity>

// In StoryCard
<TouchableOpacity onPress={() => navigation.navigate('StoryViewer', {
  storyId: story.id
})}>
```

## 📊 API Integration Examples

### Fetching Posts

```javascript
import axios from 'axios';

useEffect(() => {
  fetchPosts();
}, []);

const fetchPosts = async () => {
  try {
    const response = await axios.get('/api/posts/feed');
    setPosts(response.data.posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
};
```

### Like Post

```javascript
const handleLike = async postId => {
  // Optimistic update
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

  // API call
  try {
    await axios.post(`/api/posts/${postId}/like`);
  } catch (error) {
    // Revert on error
    console.error('Error liking post:', error);
    // Revert state
  }
};
```

### Upload Story

```javascript
import ImagePicker from 'react-native-image-picker';

const addStory = async () => {
  const result = await ImagePicker.launchCamera({
    mediaType: 'photo',
    quality: 0.8,
  });

  if (result.assets && result.assets[0]) {
    const formData = new FormData();
    formData.append('story', {
      uri: result.assets[0].uri,
      type: 'image/jpeg',
      name: 'story.jpg',
    });

    await axios.post('/api/stories', formData, {
      headers: {'Content-Type': 'multipart/form-data'},
    });
  }
};
```

## 🎯 Performance Optimization

### 1. Memoize Components

```javascript
import React, {memo} from 'react';

const PostCard = memo(({post}) => {
  // Component code
});

// With custom comparison
const PostCard = memo(
  ({post}) => {
    // Component code
  },
  (prevProps, nextProps) => {
    return (
      prevProps.post.id === nextProps.post.id &&
      prevProps.post.isLiked === nextProps.post.isLiked
    );
  },
);
```

### 2. Lazy Load Images

```javascript
import FastImage from 'react-native-fast-image';

<FastImage
  source={{
    uri: post.image,
    priority: FastImage.priority.normal,
  }}
  resizeMode={FastImage.resizeMode.cover}
  style={{width: '100%', height: '100%'}}
/>;
```

### 3. Virtual List for Large Feeds

```javascript
import {FlatList} from 'react-native';

<FlatList
  data={posts}
  renderItem={({item}) => <PostCard post={item} />}
  keyExtractor={item => item.id.toString()}
  maxToRenderPerBatch={5}
  windowSize={5}
  initialNumToRender={3}
  removeClippedSubviews={true}
/>;
```

## 🐛 Common Issues & Solutions

### Issue 1: Images Not Loading

**Solution**: Check network permissions and CORS settings

```javascript
// iOS: Info.plist
<key>NSAppTransportSecurity</key>
<dict>
  <key>NSAllowsArbitraryLoads</key>
  <true/>
</dict>

// Android: AndroidManifest.xml
<uses-permission android:name="android.permission.INTERNET" />
```

### Issue 2: Carousel Not Scrolling Smoothly

**Solution**: Use pagingEnabled and snapToInterval

```javascript
<ScrollView
  horizontal
  pagingEnabled
  snapToInterval={screenWidth}
  decelerationRate="fast"
  showsHorizontalScrollIndicator={false}
>
```

### Issue 3: Stories Cutting Off

**Solution**: Add padding to ScrollView

```javascript
<ScrollView
  horizontal
  contentContainerStyle={{
    paddingHorizontal: 16,
    paddingRight: 32,  // Extra padding on right
  }}
>
```

### Issue 4: Avatar Images Circular

**Solution**: Ensure borderRadius is half of width/height

```javascript
<Avatar
  size="md" // or specific number
  borderRadius={32} // Half of 64px
  source={{uri: avatar}}
/>
```

## 📱 Platform-Specific Considerations

### iOS Specific

```javascript
import {Platform} from 'react-native';

const shadow = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  android: {
    elevation: 3,
  },
});
```

### Android Specific

```javascript
// Add ripple effect
import {TouchableNativeFeedback} from 'react-native';

<TouchableNativeFeedback
  background={TouchableNativeFeedback.Ripple('#e0e0e0', false)}>
  <View>
    <Text>Action Button</Text>
  </View>
</TouchableNativeFeedback>;
```

## 🔐 Security Best Practices

1. **Image URLs**: Always use HTTPS
2. **Authentication**: Include auth tokens in API requests
3. **Validation**: Validate user inputs before posting
4. **Sanitization**: Clean caption text to prevent XSS

```javascript
const sanitizeCaption = text => {
  return text.replace(/<script[^>]*>.*?<\/script>/gi, '');
};
```

## 📈 Analytics Integration

```javascript
// Track post views
const trackPostView = postId => {
  analytics().logEvent('post_viewed', {
    post_id: postId,
    screen: 'home_feed',
  });
};

// Track likes
const trackLike = (postId, isLiked) => {
  analytics().logEvent(isLiked ? 'post_liked' : 'post_unliked', {
    post_id: postId,
  });
};
```

## 🧪 Testing

```javascript
// Unit test for like handler
test('handleLike toggles like state', () => {
  const post = {id: 1, isLiked: false, likes: 10};
  const result = handleLike(post);
  expect(result.isLiked).toBe(true);
  expect(result.likes).toBe(11);
});

// Component test
import {render, fireEvent} from '@testing-library/react-native';

test('PostCard renders correctly', () => {
  const {getByText} = render(<PostCard post={mockPost} />);
  expect(getByText('Buddy')).toBeTruthy();
});
```

## 📝 Additional Features to Consider

1. **Video Support**: Add video player for video posts
2. **Live Streaming**: Real-time pet streams
3. **Filters**: Instagram-style image filters
4. **Stickers**: Pet-themed stickers and overlays
5. **Mentions**: @mention other pets/owners
6. **Polls**: Add polls to posts
7. **Reactions**: Multiple reaction types (paw, heart, laugh)
8. **Collections**: Save posts to collections
9. **Archive**: Archive old posts
10. **Insights**: View post analytics

---

_For additional support, refer to React Native and Native Base documentation_
_Last Updated: October 21, 2025_
