import React from 'react';
import {
  TouchableWithoutFeedback,
  View,
  FlatList,
  StyleSheet,
} from 'react-native';
import { List, Avatar, Text, Divider, Colors } from 'react-native-paper';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';

import { INotification } from '../../../types';

interface Props {
  data: INotification[];
  onSeenNotification: (notification: INotification) => void;
}

dayjs.extend(isToday);

const extractTitle = (event: string): string => {
  let title = '';

  switch (event) {
    case 'create-product-offer':
      title = 'Offer';
      break;
  }

  return title;
};

export const FlatListNotification: React.FC<Props> = ({
  data,
  onSeenNotification,
}) => {
  const renderItem = ({ item }: { item: INotification }) => (
    <TouchableWithoutFeedback onPress={() => onSeenNotification(item)}>
      <View>
        <List.Item
          title={extractTitle(item.event)}
          description={item.description}
          left={() => (
            <Avatar.Icon
              icon="tag"
              color={Colors.green700}
              size={45}
              style={{ backgroundColor: Colors.green100 }}
            />
          )}
          right={() => (
            <Text style={item.isSeen ? styles.seen : styles.unseen}>
              {dayjs(item.createdAt).isToday()
                ? dayjs(item.createdAt).format('h:mm')
                : dayjs(item.createdAt).format('MMM D')}
            </Text>
          )}
          titleStyle={item.isSeen ? styles.seen : styles.unseen}
          descriptionStyle={item.isSeen ? styles.seen : styles.unseen}
        />
        <Divider />
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <FlatList<INotification>
      data={data}
      renderItem={renderItem}
      keyExtractor={(notification) => `${notification.id}`}
      style={styles.flatList}
    />
  );
};

const styles = StyleSheet.create({
  flatList: {
    marginBottom: -20,
  },
  item: {
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
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
