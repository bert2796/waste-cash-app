import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import { Colors } from 'react-native-paper';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

import { IUser, BuyerStackParam } from '../../../types';
import { FlatListShop } from '@molecules/FlatListShop/FlatListShop';

interface Props {
  isLoading: boolean;
  shopList: IUser[];
  onGetShopList: () => void;
  navigation: NavigationProp<BuyerStackParam>;
}

export const ScreenBuyerShops: React.FC<Props> = ({
  isLoading,
  shopList,
  onGetShopList,
  navigation,
}) => {
  const handleGetShopList = React.useCallback(
    () => onGetShopList(),
    [onGetShopList],
  );

  // Get Shop List
  React.useEffect(() => {
    handleGetShopList();
  }, [handleGetShopList]);

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
              { key: 1, width: '100%', height: 85, marginBottom: 30 },
              { key: 2, width: '100%', height: 85, marginBottom: 30 },
              { key: 3, width: '100%', height: 85, marginBottom: 30 },
              { key: 4, width: '100%', height: 85, marginBottom: 30 },
              { key: 5, width: '100%', height: 85, marginBottom: 30 },
              { key: 6, width: '100%', height: 85, marginBottom: 30 },
              { key: 7, width: '100%', height: 85, marginBottom: 30 },
            ]}
          />
        </View>
      )}

      {!isLoading && Boolean(shopList.length) && (
        <>
          <FlatListShop data={shopList} />
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
});
