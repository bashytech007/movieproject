# 🎬 Movie App - React Native CLI

A cross-platform movie discovery app built with React Native CLI, featuring movie search, favorites, dark mode, and trailer playback.

![React Native](https://img.shields.io/badge/React%20Native-0.82-61dafb?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

> **Senior React Native Developer Challenge** - Smart Gate Task

---

## 📱 Demo

### Video Demo (Android)
**Watch on YouTube:**  
[![Watch Demo](https://img.shields.io/badge/▶️-Watch%20Android%20Demo-red?style=for-the-badge&logo=youtube)](https://youtube.com/shorts/vLRj3JNOb-s)

**Direct Link:** https://youtube.com/shorts/vLRj3JNOb-s

> **Note:** Demo recorded on Android device. The app is fully cross-platform compatible and works identically on iOS.

### Screenshots
<p float="left">
  <img src="./screenshots/home-light.png" width="200" alt="Home Screen Light" />
  <img src="./screenshots/home-dark.png" width="200" alt="Home Screen Dark" />
  <img src="./screenshots/search.png" width="200" alt="Search" />
  <img src="./screenshots/details.png" width="200" alt="Movie Details" />
  <img src="./screenshots/favorites.png" width="200" alt="Favorites" />
</p>

> **Note:** Add screenshots to `/screenshots` folder in your repo

---

## ✨ Features

### Core Features (Required) ✅
- 🏠 **Browse Popular Movies**: Fetch and display trending movies from TMDb API
- 🔍 **Smart Search**: Real-time movie search with debounce optimization
- 🎬 **Movie Details**: Comprehensive details including cast, budget, revenue, runtime
- ❤️ **Favorites Management**: Save/remove favorites with AsyncStorage persistence
- 📱 **Offline Support**: Favorites persist locally, works without internet
- 🎥 **Trailer Player**: Watch YouTube trailers directly in-app

### Bonus Features (Implemented) ✅
- 🌙 **Dark Mode Toggle**: Complete dark/light theme with smooth transitions
- 🎬 **Trailer Integration**: YouTube embed using react-native-youtube-iframe
- 📊 **Trending Tracker**: Tracks most searched movies for recommendations
- ⚡ **Performance Optimized**: FlatList with proper virtualization
- 🎨 **Clean UI**: Modern, intuitive interface with loading and error states
- 🔄 **State Management**: Zustand for clean, performant state handling

### Not Implemented
- ❌ Animations (react-native-reanimated) - Not added
- ❌ Push Notifications - Not implemented

---

## 🏗️ Architecture

### Tech Stack (As Required)
- ✅ **Framework**: React Native CLI 0.82 (TypeScript)
- ✅ **Navigation**: React Navigation v7 (Stack + Bottom Tabs)
- ✅ **State Management**: Zustand (lightweight, modern alternative to Redux)
- ✅ **Storage**: AsyncStorage (persistent favorites)
- ✅ **API**: TMDb API v3 with Axios
- ✅ **Styling**: React Native StyleSheet (native styling)
- ✅ **TypeScript**: Full type safety throughout
- ✅ **Video**: react-native-youtube-iframe

### Why These Choices?

**Zustand over Redux Toolkit:**
- Less boilerplate, cleaner API
- Better performance (no Provider tree)
- Easier to understand and maintain
- Perfect for this app's complexity level

**StyleSheet over UI Libraries:**
- More control over design
- Better performance (no wrapper overhead)
- Smaller bundle size
- Custom dark mode implementation

**AsyncStorage:**
- Sufficient for local favorites
- Simple API, no complex migrations
- Cross-platform compatible
- Perfect for this use case

### Project Structure
```
MovieAppNew/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── MovieCard.tsx     # Movie display card
│   │   ├── SearchBar.tsx     # Search input component
│   │   └── TrailerPlayer.tsx # YouTube player wrapper
│   ├── screens/              # Main app screens
│   │   ├── HomeScreen.tsx    # Popular movies list
│   │   ├── SearchScreen.tsx  # Search functionality
│   │   ├── MovieDetailsScreen.tsx  # Details & trailer
│   │   └── SavedScreen.tsx   # Favorites management
│   ├── navigation/           # Navigation setup
│   │   └── AppNavigator.tsx  # Tab + Stack navigation
│   ├── store/                # Zustand stores
│   │   ├── useFavoritesStore.ts    # Favorites state
│   │   ├── useTrendingStore.ts     # Trending tracking
│   │   └── useThemeStore.ts        # Dark mode state
│   ├── services/             # API layer
│   │   └── tmdbApi.ts        # TMDb API integration
│   ├── hooks/                # Custom hooks
│   │   └── useFetch.ts       # Data fetching hook
│   ├── types/                # TypeScript definitions
│   │   └── index.ts          # All type definitions
│   └── constants/            # App constants
│       └── colors.ts         # Theme colors
├── android/                  # Android native code
├── ios/                      # iOS native code
├── .env                      # Environment variables
├── babel.config.js
├── metro.config.js
└── package.json
```

### Key Design Patterns

1. **Custom Hooks Pattern**: `useFetch` for reusable data fetching logic
2. **Compound Store Pattern**: Separate stores for favorites, trending, theme
3. **Component Composition**: Reusable MovieCard for different contexts
4. **Error Boundaries**: Graceful error handling throughout
5. **Optimistic Updates**: Instant UI updates with background sync

---

## 🚀 Setup Instructions

### Prerequisites
```bash
# Required software
Node.js >= 20.0.0
npm >= 9.0.0
JDK 17 (for Android)
Android Studio (for Android)
Xcode 14+ (for iOS, Mac only)
```

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/bashytech007/movieproject.git
cd movieproject

# 2. Install dependencies
npm install

# 3. Create .env file in root directory
cat > .env << EOF
TMDB_API_KEY=your_api_key_here
TMDB_BASE_URL=https://api.themoviedb.org/3
TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/w500
EOF
```

**Get your FREE TMDb API key:**
1. Go to https://www.themoviedb.org/signup
2. Create account and verify email
3. Go to Settings → API → Create API Key
4. Copy and paste into `.env` file

---

## 📱 Running the App

### 🤖 Android

```bash
# Option 1: Using Android Studio Emulator
# 1. Open Android Studio → Device Manager
# 2. Start an emulator (Pixel 5 or newer recommended)

# Option 2: Using Physical Device
# 1. Enable Developer Options on phone
# 2. Enable USB Debugging
# 3. Connect via USB

# Setup and run
adb devices  # Verify device connected
adb reverse tcp:8081 tcp:8081  # Connect to Metro
npm run android
```

**First-time Android setup:**
```bash
# Create local.properties if needed
echo "sdk.dir=C:\\Users\\YOUR_USER\\AppData\\Local\\Android\\Sdk" > android/local.properties

# Clean build
cd android && ./gradlew clean && cd ..
npm run android
```

### 🍎 iOS (Mac Only)

```bash
# Install CocoaPods dependencies
cd ios
pod install
cd ..

# Run on simulator
npm run ios

# Run on specific simulator
npx react-native run-ios --simulator="iPhone 15 Pro"

# Run on physical device (Apple Developer account required)
npx react-native run-ios --device "Your iPhone Name"
```

**First-time iOS setup:**
```bash
# Update CocoaPods
sudo gem install cocoapods

# Clean install
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..

# Run
npm run ios
```

---

## 📹 Recording Demo Video

### For iOS (Required for Task)

**Method 1: Xcode Screen Recording**
```bash
# 1. Run app on simulator
npm run ios

# 2. In simulator menu: File → Record Screen
# 3. Perform demo actions
# 4. Stop recording → Save video
```

**Method 2: QuickTime Player (Physical Device)**
```bash
# 1. Connect iPhone to Mac via USB
# 2. Open QuickTime Player
# 3. File → New Movie Recording
# 4. Click dropdown arrow → Select iPhone
# 5. Record demo
```

**Demo Checklist:**
- [ ] Show app launch
- [ ] Browse popular movies (scroll)
- [ ] Search for a movie
- [ ] Open movie details
- [ ] Play trailer
- [ ] Add to favorites
- [ ] Toggle dark mode
- [ ] View favorites tab
- [ ] Remove from favorites
- [ ] Total: 45-60 seconds

### Upload Options

**Option 1: GitHub (Under 10MB)**
```bash
mkdir demo
mv ios-demo.mp4 demo/
git add demo/ios-demo.mp4
git commit -m "Add iOS demo video"
git push
```

**Option 2: YouTube (Recommended)**
1. Upload to YouTube
2. Update README with video link
3. Add to repository description

**Option 3: Google Drive/Dropbox**
1. Upload video
2. Set sharing to "Anyone with link"
3. Add link to README

---

## 🎯 Task Completion Checklist

### Core Requirements ✅
- [x] React Native CLI project
- [x] TypeScript throughout
- [x] Functional components + hooks
- [x] React Navigation (Stack + Bottom Tabs)
- [x] Zustand state management
- [x] Axios for API calls
- [x] TMDb API integration
- [x] FlatList for movie lists
- [x] Loading, error, empty states
- [x] Home screen with popular movies
- [x] Search screen with real-time search
- [x] Details screen with full info
- [x] Favorites with AsyncStorage
- [x] Clean, modern UI

### Bonus Features ✅
- [x] Dark mode toggle (fully implemented)
- [x] Trailer integration (YouTube embed)
- [x] Offline support (AsyncStorage)
- [x] Clean code architecture
- [x] TypeScript types everywhere
- [x] Error handling
- [x] Performance optimization

### Bonus Not Implemented ❌
- [ ] Animations (react-native-reanimated)
- [ ] Push notifications
- [ ] Code splitting/lazy loading

---

## 📦 Dependencies

### Core
```json
{
  "react": "18.3.1",
  "react-native": "0.82.0",
  "@react-navigation/native": "^7.0.0",
  "@react-navigation/bottom-tabs": "^7.0.0",
  "@react-navigation/stack": "^7.0.0",
  "zustand": "^5.0.0",
  "axios": "^1.7.0"
}
```

### UI & Storage
```json
{
  "react-native-vector-icons": "^10.3.0",
  "@react-native-async-storage/async-storage": "^2.2.0",
  "react-native-youtube-iframe": "^2.4.1",
  "react-native-webview": "^13.16.0"
}
```

### Navigation Dependencies
```json
{
  "react-native-screens": "^4.17.1",
  "react-native-safe-area-context": "^5.6.1",
  "@react-native-masked-view/masked-view": "^0.3.2"
}
```

**Full list:** See `package.json`

---

## ⏱️ Development Timeline

**Total: 24 hours** (1 day as required)

| Task | Time | Status |
|------|------|--------|
| Project setup & configuration | 3h | ✅ |
| API integration & services | 3h | ✅ |
| Component development | 5h | ✅ |
| Navigation setup | 2h | ✅ |
| State management (Zustand) | 3h | ✅ |
| Dark mode implementation | 2h | ✅ |
| Styling & UI polish | 3h | ✅ |
| Testing & debugging | 3h | ✅ |

---

## 🎨 UI/UX Features

### Loading States
- Skeleton screens for movie lists
- Loading spinners for async operations
- Progressive image loading

### Error States
- Network error handling
- API error messages
- Retry functionality
- Empty state designs

### Edge Cases Handled
- No search results
- Empty favorites
- Missing movie data
- Failed trailer loading
- Network timeouts
- Invalid API keys

---

## 🐛 Known Issues & Solutions

### Android
**Issue:** Metro connection error  
**Solution:** 
```bash
adb reverse tcp:8081 tcp:8081
```

**Issue:** Build fails with Gradle error  
**Solution:**
```bash
cd android && ./gradlew clean && cd ..
```

### iOS
**Issue:** CocoaPods installation fails  
**Solution:**
```bash
cd ios && rm -rf Pods && pod install
```

**Issue:** Simulator not launching  
**Solution:**
```bash
xcrun simctl list devices
npx react-native run-ios --simulator="iPhone 15 Pro"
```

---

## 📊 Code Quality

### Best Practices Followed
- ✅ Proper TypeScript types (no `any`)
- ✅ Modular, reusable components
- ✅ Custom hooks for logic reuse
- ✅ Separation of concerns
- ✅ Error boundaries
- ✅ Proper state management
- ✅ Clean code principles
- ✅ Meaningful variable names
- ✅ Consistent code formatting

### Performance Optimizations
- FlatList virtualization
- Image lazy loading
- Debounced search (500ms)
- Memoized components
- Optimistic UI updates
- Efficient re-renders

---

## 🧪 Testing

```bash
# Run Metro bundler
npm start

# Run on Android
npm run android

# Run on iOS (Mac)
npm run ios

# Check for errors
npx react-native doctor
```

### Manual Testing Checklist
- [ ] Browse movies on home
- [ ] Search functionality
- [ ] Movie details display
- [ ] Trailer plays
- [ ] Add/remove favorites
- [ ] Dark mode toggle
- [ ] Offline favorites persist
- [ ] Error handling
- [ ] Loading states
- [ ] Empty states

---

## 🔮 Future Enhancements

### Potential Improvements
- ✨ Add animations (react-native-reanimated)
- 🔔 Push notifications for new releases
- 🎭 Movie recommendations algorithm
- 📋 Watch list (separate from favorites)
- 📤 Social sharing functionality
- 🎨 More theme options
- 🌐 Multi-language support
- 📊 Viewing history
- 🎬 Cast & crew details
- ⭐ User ratings & reviews

### Technical Debt
- Add unit tests (Jest)
- Add E2E tests (Detox)
- CI/CD pipeline (GitHub Actions)
- Code coverage reports
- Performance monitoring
- Crash reporting

---

## 👨‍💻 Author

**Aremu Bashir**

- GitHub: [@bashytech007](https://github.com/bashytech007)
- Email: bashytech007@gmail.com
- Portfolio: [Your Portfolio URL]

---

## 📄 License

MIT License - Feel free to use this project for learning purposes.

---

## 🙏 Acknowledgments

- [TMDb API](https://www.themoviedb.org/documentation/api) - Movie data provider
- [React Navigation](https://reactnavigation.org/) - Navigation library
- [Zustand](https://github.com/pmndrs/zustand) - State management
- Smart Gate - For the challenging task
- React Native community - For amazing libraries

---

## 📞 Support & Contact

For questions or issues:
- Open an issue on GitHub
- Email: bashytech007@gmail.com
- Check the [Discussions](https://github.com/bashytech007/movieproject/discussions) tab

---

## 🎓 What I Learned

Building this app helped me strengthen:
- React Native architecture patterns
- State management with Zustand
- TypeScript best practices
- API integration strategies
- Dark mode implementation
- Performance optimization techniques
- Clean code principles

---

**⭐ If you find this project helpful, please give it a star!**

**Built with ❤️ by Aremu Bashir for Smart Gate Senior React Native Developer Challenge**