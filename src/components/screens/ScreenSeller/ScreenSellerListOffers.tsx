import React from 'react';

import { Container } from '@/atoms/index';
import {
  DialogAcceptOrRejectOffer,
  EmptyListPlaceHolder,
  FlatListOffers,
} from '@/molecules/index';

interface Props {
  productOfferList: Objects.ProductOffer[];
  rejectProductOffer: (offerId: number) => void;
}

export const ScreenSellerListOffers: React.FC<Props> = ({
  productOfferList,
  rejectProductOffer,
}) => {
  const [id, setId] = React.useState(0);
  const [isDialogVisible, setIsDialogVisible] = React.useState(false);
  const [title, setTitle] = React.useState('');

  const handleDialogVisibility = () => {
    setIsDialogVisible(!isDialogVisible);
  };

  const handleShowAcceptDialog = (offerId: number) => {
    setId(offerId);
    setTitle('Accept Offer');

    handleDialogVisibility();
  };

  const handleShowRejectDialog = (offerId: number) => {
    setId(offerId);
    setTitle('Reject Offer');

    handleDialogVisibility();
  };

  const handleReject = () => {
    rejectProductOffer(id);

    handleDialogVisibility();
  };

  return (
    <Container>
      <DialogAcceptOrRejectOffer
        isVisible={isDialogVisible}
        title={title}
        onDismiss={handleDialogVisibility}
        onReject={handleReject}
      />

      {Boolean(productOfferList.length) && (
        <FlatListOffers
          list={productOfferList}
          onAccept={handleShowAcceptDialog}
          onReject={handleShowRejectDialog}
        />
      )}

      {!productOfferList.length && (
        <EmptyListPlaceHolder icon="pricetags-outline" message="No Offers" />
      )}
    </Container>
  );
};
