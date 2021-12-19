import React from 'react';
import { connect } from 'react-redux';

import { RootState } from '@state/store';
import { userDataSelector } from '@state/user/selectors';
import { ScreenShopProfile } from '@screens/ScreenShop/ScreenShopProfile';

const mapStateToProps = (state: RootState) => {
  return {
    userData: userDataSelector(state),
  };
};

export default connect(mapStateToProps)(ScreenShopProfile);
