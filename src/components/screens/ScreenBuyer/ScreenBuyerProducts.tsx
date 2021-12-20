import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import { Colors } from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

import { ICategory, IProduct, BuyerStackParam } from '../../../types';
import { FlatListProduct } from '@molecules/FlatListProduct/FlatListProduct';

interface Props {
  isLoading: boolean;
  categoryList: ICategory[];
  productList: IProduct[];
  onGetCategoryList: () => void;
  onGetProductList: () => void;
  navigation: NavigationProp<BuyerStackParam>;
}

export const ScreenBuyerProducts: React.FC<Props> = ({
  isLoading,
  categoryList,
  productList,
  onGetCategoryList,
  onGetProductList,
  navigation,
}) => {
  const [category, setCategory] = React.useState('');
  const [isDropdownVisible, setIsDropdownVisible] = React.useState(false);

  const categories = React.useMemo(() => {
    return [
      {
        label: 'All Products',
        value: 'allProducts',
      },
      ...categoryList.map((categoryItem) => ({
        label: categoryItem.name,
        value: categoryItem.name,
      })),
    ];
  }, [categoryList]);

  const handleCategoryChange = React.useCallback(
    (text: string) => setCategory(text),
    [setCategory],
  );

  const handleGetCategoryList = React.useCallback(
    () => onGetCategoryList(),
    [onGetCategoryList],
  );

  const handleGetProductList = React.useCallback(
    () => onGetProductList(),
    [onGetProductList],
  );

  const handleToggleDropdown = React.useCallback(
    () => setIsDropdownVisible(!isDropdownVisible),
    [setIsDropdownVisible, isDropdownVisible],
  );

  const handleViewProductNavigation = React.useCallback(
    (productId: number) =>
      navigation.navigate('BuyerViewProduct', { productId }),
    [navigation],
  );

  // Get Category List
  // React.useEffect(() => {
  //   handleGetCategoryList();
  // }, [handleGetCategoryList]);

  // Get Product List
  React.useEffect(() => {
    handleGetProductList();
  }, [handleGetProductList]);

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.skeletonContainer}>
          <SkeletonContent
            animationType="pulse"
            animationDirection="horizontalLeft"
            boneColor={Colors.grey500}
            highlightColor={Colors.grey400}
            duration={3000}
            isLoading
            containerStyle={styles.skeleton}
            layout={[
              { key: 1, width: '100%', height: 200, marginBottom: 30 },
              { key: 2, width: '100%', height: 200, marginBottom: 30 },
              { key: 3, width: '100%', height: 200, marginBottom: 30 },
            ]}
          />
        </View>
      )}

      {!isLoading && Boolean(productList.length) && (
        <>
          {/* <View style={styles.dropdownContainer}>
            <DropDown
              mode="outlined"
              label="Category"
              visible={isDropdownVisible}
              showDropDown={handleToggleDropdown}
              onDismiss={handleToggleDropdown}
              setValue={handleCategoryChange}
              value={category}
              list={categories}
              dropDownContainerHeight={40}
              dropDownContainerMaxHeight={40}
            />
          </View> */}

          <FlatListProduct
            data={productList}
            onViewProductNavigation={handleViewProductNavigation}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grey200,
  },
  skeletonContainer: {
    flex: 1,
    margin: 20,
  },
  skeleton: {
    flex: 1,
    width: '100%',
  },
  dropdownContainer: {
    margin: 20,
  },
});
