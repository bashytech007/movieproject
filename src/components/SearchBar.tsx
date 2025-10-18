import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../constants/color';

interface Props {
  placeholder: string;
  onPress?: () => void;
  value?: string;
  onChangeText?: (text: string) => void;
}

const SearchBar = ({ placeholder, onPress, value, onChangeText }: Props) => {
  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <View style={styles.container}>
          <Icon name="search" size={24} color={COLORS.accent} />
          <TextInput
            placeholder={placeholder}
            placeholderTextColor={COLORS.textSecondary}
            value={value}
            editable={false}
            style={styles.input}
          />
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <Icon name="search" size={24} color={COLORS.accent} />
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={COLORS.textSecondary}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    color: COLORS.text,
    fontSize: 16,
  },
});

export default SearchBar;