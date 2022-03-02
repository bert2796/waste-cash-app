import { NavigationProp } from '@react-navigation/native';
import React from 'react';

import { Container, FAB } from '@/atoms/index';
import {
  EmptyListPlaceHolder,
  FlatListProducts,
  SkeletonListProducts,
} from '@/molecules/index';

interface Props {
  isLoading: boolean;
  productList: Objects.Product[];
  getProducts: () => void;
  navigation: NavigationProp<Screens.SellerStackParams>;
}

export const ScreenSellerListProducts: React.FC<Props> = ({
  isLoading,
  productList,
  getProducts,
  navigation,
}) => {
  const handleNavigateToViewProduct = (id: number) => {
    navigation.navigate('SellerViewProductScreen', { id });
  };

  const handleNavigateToCreateProduct = () => {
    navigation.navigate('SellerCreateProductScreen');
  };

  React.useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <Container>
      {isLoading && <SkeletonListProducts />}
      {!isLoading && Boolean(productList.length) && (
        <FlatListProducts
          list={productList}
          onNavigateToViewProduct={handleNavigateToViewProduct}
        />
      )}
      {!isLoading && !productList.length && (
        <EmptyListPlaceHolder icon="cube" message="No products" />
      )}

      <FAB icon="plus" onPress={handleNavigateToCreateProduct} />
    </Container>
  );
};
