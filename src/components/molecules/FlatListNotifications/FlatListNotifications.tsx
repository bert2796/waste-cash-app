import React from 'react';
import { FlatList, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import { ListItemNotification } from '../ListItemNotification/ListItemNotification';

interface Props {
  list: Objects.Notification[];
  onSeenNotification: (notification: Objects.Notification) => void;
}

export const FlatListNotifications: React.FC<Props> = ({
  list,
  onSeenNotification,
}) => {
  const renderItem = ({ item }: { item: Objects.Notification }) => (
    <TouchableWithoutFeedback onPress={() => onSeenNotification(item)}>
      <ListItemNotification notification={item} />
    </TouchableWithoutFeedback>
  );

  return (
    <FlatList<Objects.Notification>
      data={list}
      keyExtractor={(notification) => `${notification.id}`}
      renderItem={renderItem}
      style={styles.flatList}
    />
  );
};

const styles = StyleSheet.create({
  flatList: {
    marginBottom: -20,
  },
});
