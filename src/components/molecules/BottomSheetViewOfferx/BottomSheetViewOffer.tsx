import numeral from 'numeral';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Colors, Text, Title } from 'react-native-paper';

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
          labelStyle={styles.closeButtonLabel}
          mode="contained"
          onPress={onClose}
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
  buttonContainer: {
    flex: 1,
  },
  buttons: {
    marginTop: 20,
  },
  closeButtonLabel: {
    color: Colors.white,
  },
  offer: {
    fontSize: 20,
    marginBottom: 15,
    marginTop: 15,
  },
});
