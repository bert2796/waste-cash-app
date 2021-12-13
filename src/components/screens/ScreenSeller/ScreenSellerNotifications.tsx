import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import { Colors, Text } from 'react-native-paper';

import { INotification, SellerStackParam } from '../../../types';
import { FlatListNotification } from '@molecules/FlatListNotification/FlatListNotification';

interface Props {
  notificationList: INotification[];
  onSeenNotification: (notificationId: number) => void;
  navigation: NavigationProp<SellerStackParam>;
}

export const ScreenSellerNotifications: React.FC<Props> = ({
  notificationList,
  onSeenNotification,
  navigation,
}) => {
  const handleSeenNotification = React.useCallback(
    (notification: INotification) => {
      if (!notification.isSeen) {
        onSeenNotification(notification.id);
      }

      navigation.navigate('SellerViewProduct', {
        productId: notification?.product?.id || 0,
        isRedirectToOffers: true,
      });
    },
    [navigation, onSeenNotification],
  );

  return (
    <View style={styles.container}>
      <FlatListNotification
        data={notificationList}
        onSeenNotification={handleSeenNotification}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grey100,
  },
});
