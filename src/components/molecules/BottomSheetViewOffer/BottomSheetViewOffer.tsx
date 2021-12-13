import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors, Button, Title, Text } from 'react-native-paper';
import numeral from 'numeral';

interface Props {
  offer: number;
  onClose: () => void;
}

export const BottomSheetViewOffer: React.FC<Props> = ({ offer, onClose }) => {
  return (
    <View style={styles.bottomSheetContent}>
      <Title>Your Offer</Title>

      <Text style={styles.offer}>{`\u20B1 ${numeral(offer).format(
        '0,0.00',
      )}`}</Text>

      <View style={styles.buttons}>
        <Button
          mode="contained"
          onPress={onClose}
          labelStyle={styles.closeButtonLabel}
        >
          Close
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomSheetContent: {
    margin: 20,
  },
  buttons: {
    marginTop: 20,
  },
  buttonContainer: {
    flex: 1,
  },
  closeButtonLabel: {
    color: Colors.white,
  },
  offer: {
    marginTop: 15,
    marginBottom: 15,
    fontSize: 20,
  },
});
