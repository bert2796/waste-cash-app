import React from 'react';
import { connect } from 'react-redux';

import { AppDispatch, RootState } from '@state/store';
import {
  isLoadingSelector,
  notificationListSelector,
} from '@state/notification/selectors';
import { seenNotification } from '@state/notification/actions';
import { ScreenBuyerNotifications } from '@screens/ScreenBuyer/ScreenBuyerNotifications';

const mapActionCreators = (dispatch: AppDispatch) => ({
  onSeenNotification(notificationId: number): void {
    dispatch(seenNotification({ notificationId }));
  },
});

const mapStateToProps = (state: RootState) => {
  return {
    isLoading: isLoadingSelector(state),
    notificationList: notificationListSelector(state),
  };
};

export default connect(
  mapStateToProps,
  mapActionCreators,
)(ScreenBuyerNotifications);
