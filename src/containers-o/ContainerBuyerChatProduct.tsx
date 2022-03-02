import React from 'react';
import { connect } from 'react-redux';

import { RootState } from '@state/store';
import { productDataSelector } from '@state/product/selectors';
import { ScreenBuyerChatProduct } from '@screens/ScreenBuyer/ScreenBuyerChatProduct';

const mapStateToProps = (state: RootState) => {
  return {
    productData: productDataSelector(state),
  };
};

export default connect(mapStateToProps)(ScreenBuyerChatProduct);
