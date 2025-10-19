import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useThemeStore } from '../store/useThemeStore';

const ThemeToggle = () => {
  const { isDark, toggleTheme, colors } = useThemeStore();

  return (
    <TouchableOpacity 
      onPress={toggleTheme}
      style={[styles.button, { backgroundColor: colors.surface }]}
    >
      <Icon 
        name={isDark ? 'light-mode' : 'dark-mode'} 
        size={24} 
        color={colors.text} 
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default ThemeToggle;