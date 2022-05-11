import { NavigationProp, RouteProp } from '@react-navigation/native';
import React from 'react';

import { Container } from '@/atoms/index';
import { AppBarBidderSetup, AppbarViewProduct } from '@/molecules/index';
import { ProductContent } from '@/organisms/index';
import { ScreenLoading } from '@/screens/ScreenLoading';

interface Props {
  isLoading: boolean;
  productData: Objects.Product;
  getProduct: (id: number) => void;
  navigation: NavigationProp<Screens.SellerStackParams>;
  route: RouteProp<Screens.SellerStackParams, 'SellerViewProductScreen'>;
}

export const ScreenSellerViewProduct: React.FC<Props> = ({
  isLoading,
  productData,
  getProduct,
  navigation,
  route,
}) => {
  const { id } = route.params;

  const handleNavigateToOffersScreen = () => {
    navigation.navigate('SellerListOffersScreen');
  };

  const handleOffer = () => {
    if (productData.bidder) {
      // show sheet
    } else {
      handleNavigateToOffersScreen();
    }
  };

  const handleNavigateToSetupBidder = () => {
    navigation.navigate('SellerBidderSetup');
  };

  React.useEffect(() => {
    getProduct(id);
  }, [id, getProduct]);

  return (
    <Container>
      {isLoading && <ScreenLoading />}
      {!isLoading && Boolean(productData) && (
        <>
          <ProductContent product={productData} />
          <AppbarViewProduct
            hasWinner={Boolean(productData.bidder)}
            isOfferButtonDisabled={
              !productData.offers.filter((offer) => offer.status !== 'rejected')
                .length
            }
            onOffer={handleOffer}
            onSetup={handleNavigateToSetupBidder}
          />
        </>
      )}
    </Container>
  );
};
