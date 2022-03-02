import { NavigationProp, RouteProp } from '@react-navigation/native';
import React from 'react';

import { Container } from '@/atoms/index';
import { AppbarViewProduct } from '@/molecules/index';
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

  React.useEffect(() => {
    getProduct(id);
  }, [id, getProduct]);

  return (
    <Container>
      {isLoading && <ScreenLoading />}
      {!isLoading && Boolean(productData) && (
        <>
          <ProductContent product={productData} />
          <AppbarViewProduct onOffer={handleNavigateToOffersScreen} />
        </>
      )}
    </Container>
  );
};
