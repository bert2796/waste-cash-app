import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { List, Avatar, Button, Divider, Colors } from 'react-native-paper';
import numeral from 'numeral';

import { IProductOffer } from '../../../types';

interface Props {
  data: IProductOffer[];
  onPressAccept: (id: number) => void;
}

export const FlatListOffer: React.FC<Props> = ({ data, onPressAccept }) => {
  const handleOnPressAccept = React.useCallback(
    (id: number) => onPressAccept(id),
    [onPressAccept],
  );

  const renderItem = ({ item }: { item: IProductOffer }) => (
    <View>
      <List.Item
        title={`${item.user.firstName} ${item.user.lastName}`}
        description={`\u20B1 ${numeral(item.price).format('0,0.00')}`}
        left={() => (
          <Avatar.Text
            label={`${item.user.firstName[0]}${item.user.lastName[0]}`}
            size={55}
          />
        )}
        right={() => (
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              labelStyle={styles.acceptLabelStyle}
              onPress={() => handleOnPressAccept(item.id)}
            >
              Accept
            </Button>
          </View>
        )}
      />
      <Divider />
    </View>
  );

  return (
    <FlatList<IProductOffer>
      data={data}
      renderItem={renderItem}
      keyExtractor={(productOffer) => `${productOffer.id}`}
      style={styles.flatList}
    />
  );
};

const styles = StyleSheet.create({
  flatList: {
    marginBottom: -20,
  },
  item: {
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  acceptLabelStyle: {
    color: Colors.white,
  },
});
