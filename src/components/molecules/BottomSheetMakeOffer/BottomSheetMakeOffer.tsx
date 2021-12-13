import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors, Button, Title, TextInput } from 'react-native-paper';

interface Props {
  isLoading: boolean;
  isSuccess: boolean;
  onSubmit: (price: number) => void;
  onCancel: () => void;
}

export const BottomSheetMakeOffer: React.FC<Props> = ({
  isLoading,
  isSuccess,
  onSubmit,
  onCancel,
}) => {
  const [price, setPrice] = React.useState('');
  const inputPrice: any = React.useRef();

  const isCancelButtonDisabled = React.useMemo(
    () => isLoading || isSuccess,
    [isLoading, isSuccess],
  );

  const isSubmitButtonDisabled = React.useMemo(
    () => !price || isLoading || isSuccess,
    [price, isLoading, isSuccess],
  );

  const handlePriceChange = React.useCallback(
    (text: string) => setPrice(text),
    [setPrice],
  );

  const handlePriceSubmitEditting = React.useCallback(
    () => inputPrice.current.blur(),
    [inputPrice],
  );

  const handleCloseBottomSheet = React.useCallback(
    () => onCancel(),
    [onCancel],
  );

  const handleCreateOffer = React.useCallback(() => {
    inputPrice.current.blur();

    onSubmit(+price);
  }, [inputPrice, onSubmit, price]);

  return (
    <View style={styles.bottomSheetContent}>
      <Title>Make Offer</Title>

      <TextInput
        mode="outlined"
        keyboardType="numeric"
        returnKeyType="done"
        label="Price"
        blurOnSubmit={false}
        ref={inputPrice}
        value={`${price}`}
        onChangeText={handlePriceChange}
        onSubmitEditing={handlePriceSubmitEditting}
        left={<TextInput.Affix text={'\u20B1'} />}
      />

      <View style={styles.buttons}>
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            color={Colors.white}
            onPress={handleCloseBottomSheet}
            disabled={isCancelButtonDisabled}
            style={styles.cancelButton}
            labelStyle={styles.cancelButtonLabel}
          >
            Cancel
          </Button>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={handleCreateOffer}
            disabled={isSubmitButtonDisabled}
            labelStyle={styles.offerButtonLabel}
          >
            Submit
          </Button>
        </View>
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
    flexDirection: 'row',
    flexGrow: 1,
  },
  buttonContainer: {
    flex: 1,
  },
  cancelButton: {
    marginRight: 20,
  },
  cancelButtonLabel: {
    color: Colors.green500,
  },
  offerButtonLabel: {
    color: Colors.white,
  },
});
