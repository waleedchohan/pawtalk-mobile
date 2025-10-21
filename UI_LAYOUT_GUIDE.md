# PawTalk UI Layout Guide

## 📱 Screen Structure (Top to Bottom)

```
┌─────────────────────────────────────────┐
│  HEADER                                  │
│  🐾 PawTalk 🐾    🔔 💬                 │
│                                          │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│  STORIES (Horizontal Scroll)            │
│  ┌───┐  ┌───┐  ┌───┐  ┌───┐  ┌───┐    │
│  │ + │  │ 🐕│  │ 🐱│  │ 🐕│  │ 🐱│    │
│  │Add│  │Bud│  │Whi│  │Cha│  │Lun│    │
│  └───┘  └───┘  └───┘  └───┘  └───┘    │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│  QUICK ACTIONS                           │
│  📷      🎥      📅      📍            │
│  Photo   Video   Event   Check-in       │
└─────────────────────────────────────────┘

┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  POST CARD #1                           ┃
┃  ┌────────────────────────────────┐    ┃
┃  │ 🐕 Buddy  [Golden Retriever]   ⋮   ┃
┃  │ Sarah Johnson • 📍Central Park     ┃
┃  │ 2h ago                              ┃
┃  └────────────────────────────────┘    ┃
┃  ┌────────────────────────────────┐    ┃
┃  │                                 │ 1/2┃
┃  │      [Pet Photo Carousel]      │    ┃
┃  │                                 │    ┃
┃  │         ● ○                     │    ┃
┃  └────────────────────────────────┘    ┃
┃  ♥  💬  ✈️                    🔖       ┃
┃  ❤️ 342  💬 28  ✈️ 13                ┃
┃                                         ┃
┃  Buddy Buddy loves his morning walks!  ┃
┃  🌞 Today we discovered a new trail... ┃
┃  #GoldenRetriever #DogLife             ┃
┃                                         ┃
┃  View all 28 comments                   ┃
┃  ┌────────────────────────────────┐    ┃
┃  │ 🐾 Add a comment...         😊│    ┃
┃  └────────────────────────────────┘    ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  POST CARD #2                           ┃
┃  ┌────────────────────────────────┐    ┃
┃  │ 🐱 Whiskers  [Persian Cat]     ⋮   ┃
┃  │ Mike Chen • 📍Home Sweet Home      ┃
┃  │ 4h ago                              ┃
┃  └────────────────────────────────┘    ┃
┃  ┌────────────────────────────────┐    ┃
┃  │                                 │    ┃
┃  │      [Single Pet Photo]        │    ┃
┃  │                                 │    ┃
┃  │                                 │    ┃
┃  └────────────────────────────────┘    ┃
┃  ♥  💬  ✈️                    🔖       ┃
┃  ❤️ 567  💬 42  ✈️ 25                ┃
┃                                         ┃
┃  Whiskers Nap time is the best time!   ┃
┃  😴 Whiskers found the perfect sunny.. ┃
┃  #CatNap #PersianCat #Blessed          ┃
┃                                         ┃
┃  View all 42 comments                   ┃
┃  ┌────────────────────────────────┐    ┃
┃  │ 🐾 Add a comment...         😊│    ┃
┃  └────────────────────────────────┘    ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

        ┌───────────────────┐
        │    🐾            │
        │ You're all caught │
        │     up!          │
        │                   │
        │ Check back later  │
        │ for more adorable │
        │      pets         │
        └───────────────────┘
```

## 🎨 Component Breakdown

### Header Component

```
┌──────────────────────────────────────────┐
│ 🐾 PawTalk 🐾              🔔(1) 💬(3) │
│                                           │
└──────────────────────────────────────────┘
```

- Logo + Brand name with paw icon
- Notification bell with red dot indicator
- Message icon with count badge

### Story Card

```
  Add Story          Regular Story         New Story
  ┌─────┐            ┌─────┐              ┌─────┐
  │  🐕 │            │ 🐕 │              │ 🐕 │
  │  +  │            │     │              │     │ (green ring)
  └─────┘            └─────┘              └─────┘
  Add Story           Buddy                Whiskers
```

- First card: "Add Story" with + icon
- Gray border: Viewed stories
- Green border: New/unviewed stories
- Pet name below avatar

### Post Card Header

```
┌────────────────────────────────────────┐
│  🐕● Buddy  [Golden Retriever]      ⋮ │
│  Sarah Johnson • 📍 Central Park, NY   │
│  2h ago                                 │
└────────────────────────────────────────┘
```

- Pet avatar with online status (green dot)
- Pet name (bold) with breed badge
- Owner name
- Location pin with place name
- Timestamp
- Three-dot menu

### Image Carousel

```
┌──────────────────────────────┐
│                         1/3  │ ← Counter
│                              │
│    [Pet Photo]               │
│                              │
│         ● ○ ○                │ ← Dots
└──────────────────────────────┘
```

- Swipeable horizontal scroll
- Image counter (top right)
- Dot indicators (bottom center)
- Full-width square images

### Engagement Section

```
Action Buttons:
♥  💬  ✈️                    🔖
(heart) (comment) (share)  (bookmark)

Stats Bar:
❤️ 342  💬 28  ✈️ 13
(red)   (green) (teal)
```

- Interactive buttons
- Color-coded statistics
- Like/Save state persistence

### Caption Section

```
Buddy Buddy loves his morning walks! 🌞
Today we discovered a new trail and he was
so excited! #GoldenRetriever #DogLife

View all 28 comments

┌────────────────────────────────┐
│ 🐾 Add a comment...         😊│
└────────────────────────────────┘
```

- Pet name in bold
- Caption with emojis and hashtags
- Comment count link
- Quick comment input

### Quick Actions Bar

```
┌──────────────────────────────────────┐
│  📷      🎥      📅      📍        │
│  Photo   Video   Event   Check-in   │
└──────────────────────────────────────┘
```

- Four action buttons
- Color-coded backgrounds
- Icon + label layout

## 🎯 Interactive Elements

### Touchable Areas

1. **Story Cards** → View story
2. **Post Header** → View pet/owner profile
3. **Pet Image** → View full size / carousel
4. **Heart Icon** → Like/Unlike post
5. **Comment Icon** → View all comments
6. **Share Icon** → Share post
7. **Bookmark Icon** → Save/Unsave post
8. **View Comments** → Open comment thread
9. **Add Comment** → Open comment input
10. **Quick Actions** → Create new content

## 📏 Dimensions

- **Story Avatar**: 70px diameter
- **Post Avatar**: Medium (48px)
- **Image Height**: Screen width (square)
- **Card Border Radius**: 16px
- **Card Margin**: 5px bottom
- **Padding**: 16px standard
- **Icon Sizes**: 20-28px

## 🎨 Color Usage

| Element         | Color       | Hex     |
| --------------- | ----------- | ------- |
| Primary Brand   | Green       | #6FE5A9 |
| Likes           | Red         | #EF4444 |
| Comments        | Green       | #6FE5A9 |
| Shares          | Teal        | #10B981 |
| Online Status   | Green       | #10B981 |
| Background      | Light Gray  | #F9FAFB |
| Card Background | White       | #FFFFFF |
| Text Primary    | Dark Gray   | #374151 |
| Text Secondary  | Medium Gray | #6B7280 |
| Text Tertiary   | Light Gray  | #9CA3AF |

## 📱 Responsive Features

- Dynamic screen width calculations
- Responsive image sizing
- Flexible text wrapping
- Adaptive spacing
- Touch-friendly tap targets (44px minimum)

---

_This layout creates a modern, engaging pet social media experience similar to Instagram but tailored specifically for pet content and pet parent interactions._
