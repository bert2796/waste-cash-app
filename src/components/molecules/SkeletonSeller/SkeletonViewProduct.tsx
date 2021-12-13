import React from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from 'react-native-paper';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

export const SkeletonViewProduct: React.FC = () => {
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
        { key: 1, width: '100%', height: 200, marginBottom: 20 },
        {
          key: 2,
          width: 150,
          height: 30,
          marginBottom: 15,
          marginLeft: 20,
          borderRadius: 30,
        },
        {
          key: 3,
          width: '70%',
          height: 40,
          marginBottom: 10,
          marginLeft: 20,
        },
        {
          key: 4,
          width: '50%',
          height: 30,
          marginBottom: 30,
          marginLeft: 20,
        },
        {
          key: 5,
          width: '90%',
          height: 30,
          marginBottom: 10,
          marginLeft: 20,
        },
        {
          key: 6,
          width: '90%',
          height: 30,
          marginBottom: 10,
          marginLeft: 20,
        },
        {
          key: 7,
          width: '60%',
          height: 30,
          marginBottom: 10,
          marginLeft: 20,
        },
        {
          key: 8,
          width: '80%',
          height: 30,
          marginBottom: 10,
          marginLeft: 20,
        },
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
