import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { List, Avatar, Text, Divider, Colors } from 'react-native-paper';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';

import { IConversationSummary, IUser } from '../../../types';

dayjs.extend(isToday);

interface Props {
  data: IConversationSummary[];
  me: IUser;
}

export const FlatListMessage: React.FC<Props> = ({ data, me }) => {
  const renderItem = ({ item }: { item: IConversationSummary }) => {
    const conversationRecipient =
      item.recipient.id === me.id ? item.sender : item.recipient;
    const isLastMessageWasSentByMe = item.sender.id === me.id;
    const messageIsSeen = isLastMessageWasSentByMe || item.message.isSeen;

    return (
      <View>
        <List.Item
          title={`${conversationRecipient.firstName} ${conversationRecipient.lastName}`}
          description={`${isLastMessageWasSentByMe ? 'You: ' : ''}${
            item.message.content
          }`}
          left={() => (
            <View style={styles.avatarContainer}>
              <Avatar.Text
                label={`${conversationRecipient?.firstName?.[0]}${conversationRecipient?.lastName?.[0]}`}
                size={45}
              />
            </View>
          )}
          right={() => (
            <Text style={messageIsSeen ? styles.seen : styles.unseen}>
              {dayjs(item.message.createdAt).isToday()
                ? dayjs(item.message.createdAt).format('h:mm')
                : dayjs(item.message.createdAt).format('MMM D')}
            </Text>
          )}
          titleStyle={messageIsSeen ? styles.seen : styles.unseen}
          descriptionStyle={messageIsSeen ? styles.seen : styles.unseen}
        />
        <Divider />
      </View>
    );
  };
  return (
    <FlatList<IConversationSummary>
      data={data}
      renderItem={renderItem}
      keyExtractor={(conversation) => `${conversation.id}`}
      style={styles.flatList}
    />
  );
};

const styles = StyleSheet.create({
  flatList: {
    marginBottom: -20,
  },
  avatarContainer: {
    margin: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  unseen: {
    color: Colors.black,
    fontWeight: '900',
  },
  seen: {
    color: Colors.grey800,
    fontWeight: 'normal',
  },
});
