import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors, Text } from 'react-native-paper';

export const ScreenSellerMessages: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Messages</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grey200,
  },
});
