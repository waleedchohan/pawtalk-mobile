# Post Screen - PawTalk

## Overview

The Post Creation screen allows users to create posts for their pets. Since one owner can have multiple pets, users must select which pet the post is about before sharing.

## ✨ Key Features

### 1. **Pet Selection** (Required)

- Users can select from their list of pets
- Shows pet avatar, name, and breed/type
- Multiple pets are displayed in a modal selector
- Selected pet is highlighted with green accent
- "Add New Pet" option available

### 2. **Media Upload** (Required - One at a time)

- Support for both photos and videos
- Two options:
  - 📷 Take photo/video with camera
  - 🖼️ Choose from gallery
- Preview of selected media
- Remove button to change selection
- Video indicator with play icon overlay
- Square aspect ratio preview

### 3. **Caption Input** (Required)

- Multi-line text area (up to 500 characters)
- Character counter
- Hashtag support with helpful tip
- Placeholder suggests adding #hashtags
- Focus state with green border

### 4. **Additional Options**

- 📍 **Add Location**: Tag where the photo was taken
- 🐾 **Tag Other Pets**: Tag friend's pets in the post
- ⚙️ **Advanced Settings**: Privacy, comments, etc.

### 5. **Tips Section**

- Helpful tips for creating great posts
- Suggests best practices:
  - Use clear, well-lit photos
  - Add engaging captions with emojis
  - Include relevant hashtags
  - Tag location for local community

## 🎨 UI/UX Design

### Color Scheme

- **Primary**: #6FE5A9 (brand green)
- **Background**: #F9FAFB (light gray)
- **Cards**: White with subtle shadows
- **Accents**: Color-coded by feature
  - Location: Orange (#FC905F)
  - Tag Pets: Green (#6FE5A9)
  - Settings: Blue (#0A1849)

### Layout Structure

```
┌─────────────────────────────────────┐
│ [X]  Create Post         [Post]    │ ← Header
├─────────────────────────────────────┤
│                                     │
│ Select Pet * ┌─────────────────┐  │
│              │ 🐕 Buddy        │  │ ← Pet Selector
│              │ Golden Retriever│  │
│              └─────────────────┘  │
│                                     │
│ Add Photo/Video *                  │
│ ┌─────────────────────────────┐   │
│ │                             │   │
│ │      [Photo Preview]        │   │ ← Media Upload
│ │      or Upload Area         │   │
│ │                             │   │
│ └─────────────────────────────┘   │
│                                     │
│ Caption *                          │
│ ┌─────────────────────────────┐   │
│ │ Share something about       │   │ ← Caption Input
│ │ your pet... Add #hashtags   │   │
│ │                             │   │
│ └─────────────────────────────┘   │
│ Use hashtags...        234/500     │
│                                     │
│ 📍 Add Location             →      │
│ 🐾 Tag Other Pets           →      │ ← Additional Options
│ ⚙️ Advanced Settings        →      │
│                                     │
│ ┌───────────────────────────┐     │
│ │ 💡 Tips for great posts   │     │ ← Tips Section
│ │ • Use clear photos        │     │
│ │ • Add engaging captions   │     │
│ └───────────────────────────┘     │
└─────────────────────────────────────┘
```

## 📱 User Flow

### Step-by-Step Process

1. **Open Post Screen**

   - Tap "+" button or "Create Post" from feed

2. **Select Pet** (Required)

   - Tap on pet selector
   - Modal opens showing all user's pets
   - Select the pet this post is about
   - Can add new pet if needed

3. **Add Media** (Required)

   - Tap on media upload area
   - Choose camera or gallery
   - Select one photo or video
   - Preview appears with remove option

4. **Write Caption** (Required)

   - Tap caption field
   - Type message about the pet
   - Add emojis and #hashtags
   - Monitor character count (max 500)

5. **Add Optional Details**

   - Add location (optional)
   - Tag other pets (optional)
   - Configure settings (optional)

6. **Post**
   - Tap "Post" button (enabled when required fields are filled)
   - Validation checks
   - Success message
   - Form resets

## 🔒 Validation Rules

### Required Fields

- ✅ **Pet Selected**: Must choose which pet
- ✅ **Media Added**: Must have one photo/video
- ✅ **Caption Written**: Must have caption text (min 1 char, max 500)

### Post Button States

- **Disabled** (Gray): Missing required field(s)
- **Enabled** (Green): All required fields filled

### Error Messages

| Scenario        | Alert Message                                |
| --------------- | -------------------------------------------- |
| No pet selected | "Please select which pet this post is about" |
| No media        | "Please add a photo or video"                |
| No caption      | "Please add a caption to your post"          |

## 🎯 Pet Selector Modal

### Features

- Shows all user's pets with:
  - Pet avatar (circular, 50px)
  - Pet name (bold)
  - Pet breed/type
- Selected pet highlighted:
  - Green background (#E8FAF3)
  - Green border (#6FE5A9)
  - Checkmark icon
- "Add New Pet" button at bottom
- Scrollable if many pets

### Sample Data Structure

```javascript
const userPets = [
  {
    id: 1,
    name: 'Buddy',
    type: 'Golden Retriever',
    avatar: 'https://...',
  },
  {
    id: 2,
    name: 'Max',
    type: 'German Shepherd',
    avatar: 'https://...',
  },
  // ... more pets
];
```

## 📸 Media Upload

### Supported Formats

- **Photos**: JPG, PNG, HEIC
- **Videos**: MP4, MOV
- **Limit**: One media item at a time

### Upload Options

#### Option 1: Camera

```javascript
{
  mediaType: 'photo', // or 'video'
  quality: 0.8,
  videoQuality: 'high'
}
```

#### Option 2: Gallery

```javascript
{
  mediaType: 'photo', // allows videos too
  quality: 0.8,
}
```

### Preview Features

- Full-width square display
- Video: Shows play icon overlay
- Remove button: Top-right corner
- Semi-transparent background for icon

## 💬 Caption Features

### Character Limit

- Maximum: 500 characters
- Counter updates in real-time
- Turns red when exceeding limit

### Hashtag Support

- Auto-detect # symbol
- Helpful tip displayed
- Example: `#GoldenRetriever #DogLife #AdventurePup`

### Best Practices Tip

Shown below caption:

> "Use hashtags to reach more pet lovers"

## 🚀 Future Enhancements

### Planned Features

1. **Multiple Media**: Support 2-10 photos per post
2. **Video Trimming**: Edit video length before posting
3. **Filters**: Instagram-style photo filters
4. **Stickers**: Pet-themed stickers and overlays
5. **Scheduled Posts**: Post at specific time
6. **Draft Saving**: Save post as draft
7. **Location Search**: Search and select locations
8. **Pet Tagging**: Tag friend's pets in photos
9. **Mentions**: @mention other users
10. **Polls**: Add polls to posts

## 🔧 Technical Implementation

### State Management

```javascript
const [selectedPet, setSelectedPet] = useState(null);
const [selectedMedia, setSelectedMedia] = useState(null);
const [caption, setCaption] = useState('');
const [location, setLocation] = useState('');
const [showPetSelector, setShowPetSelector] = useState(false);
const [showMediaOptions, setShowMediaOptions] = useState(false);
```

### API Integration (TODO)

```javascript
// POST /api/posts
{
  petId: selectedPet.id,
  media: {
    uri: selectedMedia.uri,
    type: selectedMedia.type,
    fileName: selectedMedia.fileName
  },
  caption: caption,
  location: location,
  tags: [],
  privacy: 'public'
}
```

### Permissions Required

- **Camera**: `ios.permission.CAMERA`
- **Photo Library**: `ios.permission.PHOTO_LIBRARY`
- **Location** (optional): `ios.permission.LOCATION_WHEN_IN_USE`

## 📝 Code Structure

```
Post/index.js
├── State Hooks
├── Handler Functions
│   ├── handleMediaPicker()
│   ├── handlePost()
│   └── Validation
├── Main Layout
│   ├── Header (Close, Title, Post Button)
│   ├── ScrollView
│   │   ├── Pet Selector
│   │   ├── Media Upload
│   │   ├── Caption Input
│   │   ├── Additional Options
│   │   └── Tips Section
│   └── Modals
│       ├── Pet Selector Modal
│       └── Media Options Modal
└── Styles
```

## 🎨 Component Variations

### Pet Selector - Empty State

```
┌─────────────────────────────┐
│  🐾  Tap to select your pet │
└─────────────────────────────┘
```

### Pet Selector - Selected State

```
┌─────────────────────────────┐
│ 🐕  Buddy               ▼  │
│     Golden Retriever        │
└─────────────────────────────┘
```

### Media Upload - Empty State

```
┌─────────────────────────────┐
│                             │
│     🖼️                      │
│  Add Photo or Video         │
│  Tap to select from         │
│  gallery or camera          │
│                             │
└─────────────────────────────┘
```

### Media Upload - With Photo

```
┌─────────────────────────────┐
│  [Full Photo Preview]   ❌  │
│                             │
└─────────────────────────────┘
```

### Media Upload - With Video

```
┌─────────────────────────────┐
│  [Video Thumbnail]      ❌  │
│       ▶️ Play                │
└─────────────────────────────┘
```

## 🎯 Accessibility

- All touchable areas have minimum 44px touch target
- Form labels for screen readers
- Color contrast meets WCAG AA standards
- Loading states for async operations
- Error messages are clear and actionable

## ✅ Testing Checklist

- [ ] Pet selector opens and closes
- [ ] Can select different pets
- [ ] Camera permission request works
- [ ] Gallery picker opens correctly
- [ ] Photo preview displays correctly
- [ ] Video preview shows play icon
- [ ] Remove media button works
- [ ] Caption input accepts text
- [ ] Character counter updates
- [ ] Validation prevents posting without required fields
- [ ] Post button disabled when incomplete
- [ ] Post button enabled when complete
- [ ] Success message after posting
- [ ] Form resets after successful post

---

**Created:** October 21, 2025  
**Version:** 1.0  
**Status:** ✅ Ready for Testing
