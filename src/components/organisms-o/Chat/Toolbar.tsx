import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from 'react-native-paper';

import { Composer } from './Composer';
import { Send } from './Send';

interface Props {
  text?: string;
  isSendDisabled?: boolean;
  onChangeText?: (text: string) => void;
  onSendPress?: () => void;
}

export const Toolbar: React.FC<Props> = ({
  text,
  isSendDisabled,
  onChangeText,
  onSendPress,
}) => (
  <View style={styles.container}>
    <View style={styles.primary}>
      <Composer text={text} onChangeText={onChangeText} />
      <Send disabled={isSendDisabled} onPress={onSendPress} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderTopColor: Colors.grey300,
    backgroundColor: Colors.white,
    bottom: 0,
    left: 0,
    right: 0,
  },
  primary: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
});
