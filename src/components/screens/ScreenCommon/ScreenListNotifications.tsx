import { NavigationProp } from '@react-navigation/native';
import React from 'react';
import { Text } from 'react-native-paper';

import { Container } from '@/atoms/index';
import { UserRoles } from '@/constants/index';
import { EmptyListPlaceHolder, FlatListNotifications } from '@/molecules/index';

interface Props {
  me: Objects.User;
  notificationList: Objects.Notification[];
  navigation: NavigationProp<any>;
}

export const ScreenListNotifications: React.FC<Props> = ({
  me,
  notificationList,
  navigation,
}) => {
  const handleOnNavigateToNotification = (
    notification: Objects.Notification,
  ) => {
    let notificationScreen = '';

    switch (me.role) {
      case UserRoles.BUYER:
        notificationScreen = 'BuyerViewNotificationScreen';
        break;

      case UserRoles.SELLER:
        notificationScreen = 'SellerViewNotificationScreen';
        break;
    }

    navigation.navigate(notificationScreen, notification);
  };

  return (
    <Container>
      {!notificationList.length && (
        <EmptyListPlaceHolder icon="notifications" message="No Notifications" />
      )}

      {Boolean(notificationList.length) && (
        <FlatListNotifications
          list={notificationList}
          onNavigateToNotification={handleOnNavigateToNotification}
        />
      )}
    </Container>
  );
};
