import { NavigationProp } from '@react-navigation/native';
import React from 'react';
import { Text } from 'react-native-paper';

import { Container } from '@/atoms/index';
import { UserRoles } from '@/constants/index';
import { EmptyListPlaceHolder, FlatListNotifications } from '@/molecules/index';

interface Props {
  notificationList: Objects.Notification[];
  userData: Objects.User;
  navigation: NavigationProp<any>;
}

export const ScreenListNotifications: React.FC<Props> = ({
  notificationList,
  userData,
  navigation,
}) => {
  const handleOnSeenNotification = (notification: Objects.Notification) => {};

  return (
    <Container>
      {!notificationList.length && (
        <EmptyListPlaceHolder icon="notifications" message="No Notifications" />
      )}

      {Boolean(notificationList.length) && (
        <FlatListNotifications
          list={notificationList}
          onSeenNotification={handleOnSeenNotification}
        />
      )}
    </Container>
  );
};
