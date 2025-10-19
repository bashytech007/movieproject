import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../constants/color';

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
          <Icon name="search" size={24} color={colors.accent} />
          <TextInput
            placeholder={placeholder}
            placeholderTextColor={colors.textSecondary}
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
      <Icon name="search" size={24} color={colors.accent} />
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={colors.textSecondary}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    color: colors.text,
    fontSize: 16,
  },
});

export default SearchBar;