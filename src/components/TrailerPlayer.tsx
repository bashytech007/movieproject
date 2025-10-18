import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { COLORS } from '../constants/color';

interface Props {
  videoKey: string;
}

const TrailerPlayer = ({ videoKey }: Props) => {
  if (!videoKey) {
    return (
      <View style={styles.noTrailer}>
        <Text style={styles.noTrailerText}>No trailer available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <YoutubePlayer height={208} videoId={videoKey} play={false} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 208,
    borderRadius: 8,
    overflow: 'hidden',
  },
  noTrailer: {
    height: 208,
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noTrailerText: {
    color: COLORS.textSecondary,
  },
});

export default TrailerPlayer;