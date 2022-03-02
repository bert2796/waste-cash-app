import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Colors, Divider, List, Text } from 'react-native-paper';

dayjs.extend(isToday);

interface Props {
  conversationSummary: Objects.ConversationSummary;
  isMessageWasSeen: boolean;
  isMessageWasSentByMe: boolean;
  recipient: Partial<Objects.User>;
}

export const ListItemConversation: React.FC<Props> = ({
  conversationSummary: conversation,
  isMessageWasSeen,
  isMessageWasSentByMe,
  recipient,
}) => (
  <View>
    <List.Item
      description={`${isMessageWasSentByMe ? 'You: ' : ''}${
        conversation.message.content
      }`}
      descriptionStyle={isMessageWasSeen ? styles.seen : styles.unseen}
      left={() => (
        <View style={styles.avatarContainer}>
          <Avatar.Text
            label={`${recipient.firstName?.[0]}${recipient.lastName?.[0]}`}
            size={45}
          />
        </View>
      )}
      right={() => (
        <Text style={isMessageWasSeen ? styles.seen : styles.unseen}>
          {dayjs(conversation.message.createdAt).isToday()
            ? dayjs(conversation.message.createdAt).format('h:mm')
            : dayjs(conversation.message.createdAt).format('MMM D')}
        </Text>
      )}
      testID="list-item-notification"
      title={`${recipient.firstName} ${recipient.lastName}`}
    />
    <Divider />
  </View>
);

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    margin: 5,
  },
  seen: {
    color: Colors.grey800,
    fontWeight: 'normal',
  },
  unseen: {
    color: Colors.black,
    fontWeight: '900',
  },
});
