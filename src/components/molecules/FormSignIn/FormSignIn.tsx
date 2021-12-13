import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  TextInput,
  Subheading,
  Button,
  Colors,
  Divider,
} from 'react-native-paper';

interface Props {
  error: string;
  isLoading: boolean;
  onClearUserError: () => void;
  onSignIn: (username: string, password: string) => void;
  onSignUpNavigation: () => void;
}

export const FormSignIn: React.FC<Props> = ({
  error,
  isLoading,
  onClearUserError,
  onSignIn,
  onSignUpNavigation,
}) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const inputPassword: any = React.useRef();

  const isSignInButtonDisabled = React.useMemo(
    () => !username || !password || isLoading,
    [username, password, isLoading],
  );

  const isSignUpButtonDisabled = React.useMemo(() => isLoading, [isLoading]);

  const handleUsernameChange = React.useCallback(
    (text: string) => setUsername(text),
    [setUsername],
  );

  const handlePasswordChange = React.useCallback(
    (text: string) => setPassword(text),
    [setPassword],
  );

  const handleUsernameSubmitEditing = React.useCallback(
    () => inputPassword.current.focus(),
    [inputPassword],
  );

  const handlePasswordVisibility = React.useCallback(
    () => setIsPasswordVisible(!isPasswordVisible),
    [setIsPasswordVisible, isPasswordVisible],
  );

  const handleSignIn = React.useCallback(() => {
    onSignIn(username, password);

    inputPassword.current.blur();
  }, [onSignIn, username, password]);

  const handleClearForm = React.useCallback(() => {
    handleUsernameChange('');
    handlePasswordChange('');
  }, [handleUsernameChange, handlePasswordChange]);

  const handleSignUpNavigation = React.useCallback(() => {
    if (error) {
      // clear error
      onClearUserError();

      // clear form
      handleClearForm();
    }
    onSignUpNavigation();
  }, [error, onClearUserError, handleClearForm, onSignUpNavigation]);

  return (
    <View style={styles.form}>
      <View style={styles.inputTextContainer}>
        <TextInput
          mode="outlined"
          returnKeyType="next"
          label="Email or Username"
          placeholder="Your Email or Username"
          value={username}
          blurOnSubmit={false}
          error={Boolean(error)}
          onChangeText={handleUsernameChange}
          onSubmitEditing={handleUsernameSubmitEditing}
          style={styles.inputText}
        />

        <TextInput
          mode="outlined"
          returnKeyType="done"
          label="Password"
          placeholder="Your Password"
          blurOnSubmit={false}
          value={password}
          error={Boolean(error)}
          secureTextEntry={!isPasswordVisible}
          onChangeText={handlePasswordChange}
          onSubmitEditing={handleSignIn}
          ref={inputPassword}
          right={
            isPasswordVisible ? (
              <TextInput.Icon
                name="eye-outline"
                onPress={handlePasswordVisibility}
              />
            ) : (
              <TextInput.Icon
                name="eye-off-outline"
                onPress={handlePasswordVisibility}
              />
            )
          }
          style={styles.inputText}
        />

        {Boolean(error) && (
          <Subheading style={styles.textError}>{error}</Subheading>
        )}
      </View>

      <Button
        mode="contained"
        onPress={handleSignIn}
        disabled={isSignInButtonDisabled}
        loading={isLoading}
        style={styles.button}
        contentStyle={styles.buttonContent}
        labelStyle={styles.buttonLabel}
      >
        {isLoading ? 'Loading' : 'Sign In'}
      </Button>

      <Divider style={styles.divider} />

      <Button
        color={Colors.white}
        mode="contained"
        onPress={handleSignUpNavigation}
        disabled={isSignUpButtonDisabled}
        contentStyle={styles.buttonContent}
        labelStyle={styles.signUpLabel}
      >
        Sign Up
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
  },
  inputTextContainer: {
    marginBottom: 20,
  },
  inputText: {
    marginBottom: 15,
    height: 40,
  },
  textError: {
    color: Colors.red900,
  },
  button: {
    marginBottom: 10,
  },
  buttonContent: {
    height: 50,
  },
  buttonLabel: {
    color: Colors.white,
  },
  signUpLabel: {
    color: Colors.green500,
  },
  divider: {
    marginBottom: 10,
  },
});
