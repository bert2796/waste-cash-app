import React from 'react';
import {
  TouchableWithoutFeedback,
  View,
  FlatList,
  StyleSheet,
} from 'react-native';

import { IUser } from '../../../types';
import { CardShopItem } from '@atoms/CardShopItem/CardShopItem';

interface Props {
  data: IUser[];
}

export const FlatListShop: React.FC<Props> = ({ data }) => {
  const renderItem = ({ item }: { item: IUser }) => (
    <TouchableWithoutFeedback onPress={() => console.log(item.id)}>
      <View style={styles.item}>
        <CardShopItem shop={item} />
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <FlatList<IUser>
      data={data}
      renderItem={renderItem}
      keyExtractor={(shop) => `${shop.id}`}
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
