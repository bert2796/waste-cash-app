import React from 'react';
import { connect } from 'react-redux';

import { RootState } from '@state/store';
import { userDataSelector } from '@state/user/selectors';
import { ScreenSellerProfile } from '@screens/ScreenSeller/ScreenSellerProfile';

const mapStateToProps = (state: RootState) => {
  return {
    userData: userDataSelector(state),
  };
};

export default connect(mapStateToProps)(ScreenSellerProfile);
