import React from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from 'react-native-paper';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

export const SkeletonCreateProduct: React.FC = () => {
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
        { key: 1, width: '100%', height: 50, marginBottom: 20 },
        { key: 2, width: '100%', height: 60, marginBottom: 20 },
        { key: 3, width: '100%', height: 100, marginBottom: 20 },
        { key: 4, width: '100%', height: 50, marginBottom: 20 },
        { key: 5, width: '100%', height: 40, marginBottom: 20 },
        { key: 6, width: '100%', height: 40, marginBottom: 20 },
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
