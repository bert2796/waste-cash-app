import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Colors, Divider, List, Text } from 'react-native-paper';

import { formatNotificationTitle } from '@/utils/index';

dayjs.extend(isToday);

interface Props {
  notification: Objects.Notification;
}

export const ListItemNotification: React.FC<Props> = ({ notification }) => (
  <View>
    <List.Item
      description={notification.description}
      descriptionStyle={notification.isSeen ? styles.seen : styles.unseen}
      left={() => (
        <View style={styles.avatarContainer}>
          <Avatar.Icon
            color={Colors.green700}
            icon="tag"
            size={45}
            style={styles.avatar}
          />
        </View>
      )}
      right={() => (
        <Text style={notification.isSeen ? styles.seen : styles.unseen}>
          {dayjs(notification.createdAt).isToday()
            ? dayjs(notification.createdAt).format('h:mm')
            : dayjs(notification.createdAt).format('MMM D')}
        </Text>
      )}
      testID="list-item-notification"
      title={formatNotificationTitle(notification.event)}
    />
    <Divider />
  </View>
);

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: Colors.green100,
  },
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
