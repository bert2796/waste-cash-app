import React from 'react';
import { Portal, Dialog, Text, Button } from 'react-native-paper';

interface Props {
  isVisible: boolean;
  onSignInNavigation: () => void;
}

export const DialogSignIn: React.FC<Props> = ({
  isVisible,
  onSignInNavigation,
}) => {
  const handleSignInNavigation = React.useCallback(
    () => onSignInNavigation(),
    [onSignInNavigation],
  );

  return (
    <Portal>
      <Dialog visible={isVisible} dismissable={false}>
        <Dialog.Title>Successfully Sign Up!</Dialog.Title>
        <Dialog.Content>
          <Text>Thank you, your sign-up request was successful!</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={handleSignInNavigation}>
            Take me to Sign In Screen
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
