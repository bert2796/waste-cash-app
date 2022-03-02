import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, Colors } from 'react-native-paper';

import { Button } from '@/atoms/index';
interface Props {
  isBuyer?: boolean;
  isOfferExist?: boolean;
  onOffer: () => void;
}

export const AppbarViewProduct: React.FC<Props> = ({
  isBuyer,
  isOfferExist,
  onOffer,
}) => (
  <Appbar style={styles.appBar}>
    <View style={styles.appBarContent}>
      <Button
        color={Colors.white}
        icon="chat-processing-outline"
        style={styles.buttonChat}
      >
        Chat
      </Button>
      <Button icon="cash-multiple" onPress={onOffer}>
        {isBuyer ? (isOfferExist ? 'View Offer' : 'Make Offer') : 'Offers'}
      </Button>
    </View>
  </Appbar>
);

const styles = StyleSheet.create({
  appBar: {
    backgroundColor: Colors.white,
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
  },
  appBarContent: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 10,
  },
  buttonChat: {
    marginRight: 10,
  },
  buttonOfferLabel: {
    color: Colors.white,
  },
});