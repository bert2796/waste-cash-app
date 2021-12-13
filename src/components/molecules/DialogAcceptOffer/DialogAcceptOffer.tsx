import React from 'react';
import { Portal, Dialog, Text, Button } from 'react-native-paper';

interface Props {
  isVisible: boolean;
  onDismissDialog: () => void;
}

export const DialogAcceptOffer: React.FC<Props> = ({
  isVisible,
  onDismissDialog,
}) => {
  return (
    <Portal>
      <Dialog visible={isVisible} onDismiss={onDismissDialog}>
        <Dialog.Content>
          <Text>Are you sure with your choice</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismissDialog}>Yes</Button>
          <Button onPress={onDismissDialog}>No</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
