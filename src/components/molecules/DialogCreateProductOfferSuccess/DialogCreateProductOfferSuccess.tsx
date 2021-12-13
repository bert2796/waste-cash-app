import React from 'react';
import { Portal, Dialog, Text, Button } from 'react-native-paper';

interface Props {
  success: string;
  isVisible: boolean;
  onDismissDialog: () => void;
}

export const DialogCreateProductOfferSuccess: React.FC<Props> = ({
  success,
  isVisible,
  onDismissDialog,
}) => {
  return (
    <Portal>
      <Dialog visible={isVisible} onDismiss={onDismissDialog}>
        <Dialog.Content>
          <Text>{success}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismissDialog}>OK</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
