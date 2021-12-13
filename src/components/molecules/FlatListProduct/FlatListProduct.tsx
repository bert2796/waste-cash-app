import React from 'react';
import {
  TouchableWithoutFeedback,
  View,
  FlatList,
  StyleSheet,
} from 'react-native';

import { IProduct } from '../../../types';
import { CardProductItem } from '@atoms/CardProductItem/CardProductItem';

interface Props {
  data: IProduct[];
  onViewProductNavigation: (productId: number) => void;
}

export const FlatListProduct: React.FC<Props> = ({
  data,
  onViewProductNavigation,
}) => {
  const handleViewProductNavigation = React.useCallback(
    (productId: number) => onViewProductNavigation(productId),
    [onViewProductNavigation],
  );

  const renderItem = ({ item }: { item: IProduct }) => (
    <TouchableWithoutFeedback
      onPress={() => handleViewProductNavigation(item.id)}
    >
      <View style={styles.item}>
        <CardProductItem product={item} />
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <FlatList<IProduct>
      data={data}
      renderItem={renderItem}
      keyExtractor={(product) => `${product.id}`}
      contentContainerStyle={styles.content}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  content: {
    paddingTop: 20,
    paddingBottom: 20,
  },
});
