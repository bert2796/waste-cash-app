import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Colors } from 'react-native-paper';
import {
  Chat as ChatUI,
  MessageType,
  User,
} from '@flyerhq/react-native-chat-ui';

import { IUser } from '../../../types';
import { Toolbar } from './Toolbar';

interface Props {
  isSendDisabled: boolean;
  isLoading?: boolean;
  messages: MessageType.Any[];
  text: string;
  user: IUser;
  onChangeText: (text: string) => void;
  onSendPress: () => void;
}

export const Chat: React.FC<Props> = ({
  isLoading,
  isSendDisabled,
  messages,
  text,
  user,
  onChangeText,
  onSendPress,
}) => {
  const me = {
    id: `${user.id}`,
  };

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator animating={true} />
        </View>
      )}

      {!isLoading && (
        <ChatUI
          messages={messages}
          user={me}
          onSendPress={onSendPress}
          customBottomComponent={() => (
            <Toolbar
              text={text}
              isSendDisabled={isSendDisabled}
              onChangeText={onChangeText}
              onSendPress={onSendPress}
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
