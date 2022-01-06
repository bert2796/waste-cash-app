import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from 'react-native-paper';

import { IConversationSummary, IUser } from '../../../types';
import { FlatListMessage } from '@molecules/FlatListMessage/FlastListMessage';
import { ScreenEmptyPage } from '../ScreenEmptyPage/ScreenEmptyPage';

interface Props {
  conversationList: IConversationSummary[];
  user: IUser;
}

export const ScreenBuyerMessages: React.FC<Props> = ({
  conversationList,
  user,
}) => {
  return (
    <View style={styles.container}>
      {!conversationList.length && (
        <ScreenEmptyPage icon="chatbubbles" message="No Messages" />
      )}

      {Boolean(conversationList.length) && (
        <FlatListMessage data={conversationList} me={user} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grey200,
  },
});
