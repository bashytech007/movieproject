// import React from 'react';
// import {View, Text, StyleSheet} from 'react-native';

// function App() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>✅ React Native Works!</Text>
//       <Text style={styles.subtext}>Ready to build your movie app</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#000',
//   },
//   text: {
//     color: '#fff',
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   subtext: {
//     color: '#999',
//     fontSize: 16,
//   },
// });

// export default App;


// ============================================
// File: App.tsx
// ============================================
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { useFavoritesStore } from './src/store/useFavoritesStore';
import { useTrendingStore } from './src/store/useTrendingStore';
import { useThemeStore } from './src/store/useThemeStore';


function App() {
  const loadFavorites = useFavoritesStore(state => state.loadFavorites);
  const loadTrending = useTrendingStore(state => state.loadTrending);
   const loadTheme = useThemeStore(state => state.loadTheme); // ✅ Add this
  const isDark = useThemeStore(state => state.isDark); // ✅ Add this

  useEffect(() => {
    
    loadFavorites();
    loadTrending();
      loadTrending();
    loadTheme();
  }, []);

  return (
    <>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'} 
        backgroundColor={isDark ? '#121212' : '#FFFFFF'} 
        translucent={false}
      />
      <AppNavigator />
    </>
  );
}

export default App;