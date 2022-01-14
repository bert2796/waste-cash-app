import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { Colors } from 'react-native-paper';

interface Props {
  text?: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;
}

export const Composer: React.FC<Props> = ({
  text,
  placeholder = 'Type your message here...',
  onChangeText,
}) => (
  <TextInput
    value={text}
    enablesReturnKeyAutomatically
    placeholder={placeholder}
    placeholderTextColor={Colors.grey300}
    underlineColorAndroid="transparent"
    style={styles.textInput}
    onChangeText={onChangeText}
  />
);

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    lineHeight: 16,
    height: 41,
  },
});
