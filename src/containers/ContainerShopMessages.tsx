import React from 'react';
import { connect } from 'react-redux';

import { RootState } from '@state/store';
import { conversationListSelector } from '@state/conversation/selectors';
import { userDataSelector } from '@state/user/selectors';
import { ScreenShopMessages } from '@screens/ScreenShop/ScreenShopMessages';

const mapStateToProps = (state: RootState) => {
  return {
    conversationList: conversationListSelector(state),
    user: userDataSelector(state),
  };
};

export default connect(mapStateToProps)(ScreenShopMessages);
