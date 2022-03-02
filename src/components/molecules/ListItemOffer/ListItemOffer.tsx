import numeral from 'numeral';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Button, Colors, Divider, List } from 'react-native-paper';

import { formatPrice, summarizeText } from '@/utils/index';

interface Props {
  offer: Objects.ProductOffer;
  onAccept: (id: number) => void;
}

export const ListItemOffer: React.FC<Props> = ({ offer, onAccept }) => (
  <View>
    <List.Item
      description={formatPrice(offer.price)}
      left={() => (
        <View style={styles.avatarContainer}>
          <Avatar.Text
            label={`${offer.user.firstName[0]}${offer.user.lastName[0]}`}
            size={45}
          />
        </View>
      )}
      right={() => (
        <View style={styles.buttonContainer}>
          <Button
            labelStyle={styles.acceptLabelStyle}
            mode="contained"
            onPress={() => onAccept(offer.id)}
          >
            Accept
          </Button>
        </View>
      )}
      testID="list-item-offer"
      title={`${offer.user.firstName} ${offer.user.lastName}`}
    />
    <Divider />
  </View>
);

const styles = StyleSheet.create({
  acceptLabelStyle: {
    color: Colors.white,
  },
  avatarContainer: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    margin: 5,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
