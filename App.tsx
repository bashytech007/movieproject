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

function App() {
  const loadFavorites = useFavoritesStore(state => state.loadFavorites);
  const loadTrending = useTrendingStore(state => state.loadTrending);

  useEffect(() => {
    // Load saved data on app start
    loadFavorites();
    loadTrending();
  }, []);

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#121212"
        translucent={false}
      />
      <AppNavigator />
    </>
  );
}

export default App;