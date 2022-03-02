import React from 'react';
import { Button, Dialog, Portal, Text } from 'react-native-paper';

interface Props {
  isVisible: boolean;
  onDismiss: () => void;
}

export const DialogAcceptOffer: React.FC<Props> = ({
  isVisible,
  onDismiss,
}) => {
  return (
    <Portal>
      <Dialog visible={isVisible} onDismiss={onDismiss}>
        <Dialog.Content>
          <Text>Are you sure with your choice</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Yes</Button>
          <Button onPress={onDismiss}>No</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
