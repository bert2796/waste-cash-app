import { createSelector } from '@reduxjs/toolkit';

import { INotificationState, INotification } from '../../types';
import { RootState } from '../store';

const rootSelector = createSelector(
  (state: RootState): INotificationState => state.notification,
  (notification: INotificationState) => notification,
);

export const notificationListSelector = createSelector(
  rootSelector,
  (notification: INotificationState): INotification[] => notification.list,
);

export const notificationSuccessSelector = createSelector(
  rootSelector,
  (notification: INotificationState): string => notification.success,
);

export const notificationErrorSelector = createSelector(
  rootSelector,
  (notification: INotificationState): string => notification.error,
);

export const isLoadingSelector = createSelector(
  rootSelector,
  (notification: INotificationState): boolean => notification.isLoading,
);

export const hasUnseenNotificationSelector = createSelector(
  notificationListSelector,
  (notificationList: INotification[]): boolean =>
    notificationList.some((notification) => !notification.isSeen),
);
