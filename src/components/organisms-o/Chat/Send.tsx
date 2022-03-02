import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Colors } from 'react-native-paper';

interface Props {
  label?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  onPress?: () => void;
}

export const Send: React.FC<Props> = ({
  label = 'Send',
  disabled,
  children,
  onPress,
}) => (
  <TouchableOpacity
    disabled={disabled}
    style={[
      styles.container,
      disabled ? styles.buttonDisabled : styles.butttonEnabled,
    ]}
    onPress={onPress}
  >
    <View>{children || <Text style={styles.text}>{label}</Text>}</View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    height: 44,
    justifyContent: 'flex-end',
  },
  buttonDisabled: {
    backgroundColor: Colors.green200,
  },
  butttonEnabled: {
    backgroundColor: Colors.green400,
  },
  text: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: 17,
    // backgroundColor: Colors.white,
    marginBottom: 12,
    marginLeft: 10,
    marginRight: 10,
  },
});
