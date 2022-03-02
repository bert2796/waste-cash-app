import React from 'react';
import { ButtonProps, StyleSheet } from 'react-native';
import { Button as PaperButton, Colors } from 'react-native-paper';

type Props = React.ComponentProps<typeof PaperButton>;

export const Button: React.FC<Props> = ({ children, ...props }) => (
  <PaperButton
    contentStyle={styles.buttonContent}
    labelStyle={
      props?.color === Colors.white
        ? styles.primaryButtonLabel
        : styles.buttonLabel
    }
    mode={props?.mode || 'contained'}
    {...props}
  >
    {children}
  </PaperButton>
);

const styles = StyleSheet.create({
  buttonContent: {
    height: 50,
  },
  buttonLabel: {
    color: Colors.white,
  },
  primaryButtonLabel: {
    color: Colors.green500,
  },
});
