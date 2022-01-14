import React from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from 'react-native-paper';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

export const SkeletonListProduct: React.FC = () => {
  return (
    <SkeletonContent
      animationType="pulse"
      animationDirection="horizontalLeft"
      boneColor={Colors.grey500}
      highlightColor={Colors.grey400}
      duration={3000}
      isLoading
      containerStyle={styles.skeleton}
      layout={[
        { key: 1, width: '100%', height: 200, marginBottom: 30 },
        { key: 2, width: '100%', height: 200, marginBottom: 30 },
        { key: 3, width: '100%', height: 200, marginBottom: 30 },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  skeleton: {
    flex: 1,
    width: '100%',
  },
});
