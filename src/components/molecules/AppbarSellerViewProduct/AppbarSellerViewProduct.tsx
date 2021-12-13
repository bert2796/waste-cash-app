import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors, Appbar, Button } from 'react-native-paper';

interface Props {
  onPressChat?: () => void;
  onPressOffer: () => void;
}

export const AppbarSellerViewProduct: React.FC<Props> = ({
  onPressChat,
  onPressOffer,
}) => (
  <Appbar style={styles.appBar}>
    <View style={styles.appBarContent}>
      <Button
        mode="outlined"
        icon="chat-processing-outline"
        style={styles.buttonChat}
      >
        Chat
      </Button>
      <Button
        mode="contained"
        icon="cash-multiple"
        onPress={onPressOffer}
        labelStyle={styles.buttonOfferLabel}
      >
        Offers
      </Button>
    </View>
  </Appbar>
);

const styles = StyleSheet.create({
  appBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.white,
  },
  appBarContent: {
    marginLeft: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  buttonChat: {
    marginRight: 10,
  },
  buttonOfferLabel: {
    color: Colors.white,
  },
});
