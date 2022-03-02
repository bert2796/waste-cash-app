import React from 'react';

import { Container } from '@/atoms/index';
import {
  DialogAcceptOffer,
  EmptyListPlaceHolder,
  FlatListOffers,
} from '@/molecules/index';

interface Props {
  productOfferList: Objects.ProductOffer[];
}

export const ScreenSellerListOffers: React.FC<Props> = ({
  productOfferList,
}) => {
  const [isDialogVisible, setIsDialogVisible] = React.useState(false);

  const handleDialogVisibility = () => {
    setIsDialogVisible(!isDialogVisible);
  };

  return (
    <Container>
      <DialogAcceptOffer
        isVisible={isDialogVisible}
        onDismiss={handleDialogVisibility}
      />

      {Boolean(productOfferList.length) && (
        <FlatListOffers
          list={productOfferList}
          onAccept={handleDialogVisibility}
        />
      )}

      {!productOfferList.length && (
        <EmptyListPlaceHolder icon="pricetags-outline" message="No Offers" />
      )}
    </Container>
  );
};
