import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Subheading, Button, Colors } from 'react-native-paper';

import { UserRoles } from '../../../types';

interface Props {
  error: string;
  role: UserRoles;
  isJunkShop: boolean;
  isLoading: boolean;
  onSignUp: ({
    junkShopName,
    firstName,
    lastName,
    address,
    city,
    zip,
    phone,
    email,
    username,
    password,
    role,
  }: {
    junkShopName: string;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    zip: string;
    phone: string;
    email: string;
    username: string;
    password: string;
    role: UserRoles;
  }) => void;
}

export const FormSignUp: React.FC<Props> = ({
  error,
  role,
  isJunkShop,
  isLoading,
  onSignUp,
}) => {
  const [junkShopName, setJunkShopName] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [city, setCity] = React.useState('');
  const [zip, setZip] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

  const inputFirstName: any = React.useRef();
  const inputLastName: any = React.useRef();
  const inputAddress: any = React.useRef();
  const inputCity: any = React.useRef();
  const inputZip: any = React.useRef();
  const inputPhone: any = React.useRef();
  const inputEmail: any = React.useRef();
  const inputUsername: any = React.useRef();
  const inputPassword: any = React.useRef();

  const isSignUpButtonEnabled = React.useMemo(
    () =>
      (isJunkShop && !junkShopName) ||
      !firstName ||
      !lastName ||
      !address ||
      !city ||
      !zip ||
      !phone ||
      !email ||
      !username ||
      !password ||
      isLoading,
    [
      isJunkShop,
      junkShopName,
      firstName,
      lastName,
      address,
      city,
      zip,
      phone,
      email,
      username,
      password,
      isLoading,
    ],
  );

  const handleJunkShopNameChange = React.useCallback(
    (text: string) => setJunkShopName(text),
    [setJunkShopName],
  );

  const handleFirstNameChange = React.useCallback(
    (text: string) => setFirstName(text),
    [setFirstName],
  );

  const handleLastNameChange = React.useCallback(
    (text: string) => setLastName(text),
    [setLastName],
  );

  const handleAddressChange = React.useCallback(
    (text: string) => setAddress(text),
    [setAddress],
  );

  const handleCityChange = React.useCallback(
    (text: string) => setCity(text),
    [setCity],
  );

  const handleZipChange = React.useCallback(
    (text: string) => setZip(text),
    [setZip],
  );

  const handlePhoneChange = React.useCallback(
    (text: string) => setPhone(text),
    [setPhone],
  );

  const handleEmailChange = React.useCallback(
    (text: string) => setEmail(text),
    [setEmail],
  );

  const handleUsernameChange = React.useCallback(
    (text: string) => setUsername(text),
    [setUsername],
  );

  const handlePasswordChange = React.useCallback(
    (text: string) => setPassword(text),
    [setPassword],
  );

  const handleJunkShopNameSubmitEditing = React.useCallback(
    () => inputFirstName.current.focus(),
    [inputFirstName],
  );

  const handleFirstNameSubmitEditing = React.useCallback(
    () => inputLastName.current.focus(),
    [inputLastName],
  );

  const handleLastNameSubmitEditing = React.useCallback(
    () => inputAddress.current.focus(),
    [inputAddress],
  );

  const handleAddressSubmitEditing = React.useCallback(
    () => inputCity.current.focus(),
    [inputCity],
  );

  const handleCitySubmitEditing = React.useCallback(
    () => inputZip.current.focus(),
    [inputZip],
  );

  const handleZipSubmitEditing = React.useCallback(
    () => inputPhone.current.focus(),
    [inputPhone],
  );

  const handlePhoneSubmitEditing = React.useCallback(
    () => inputEmail.current.focus(),
    [inputEmail],
  );

  const handleEmailSubmitEditing = React.useCallback(
    () => inputUsername.current.focus(),
    [inputUsername],
  );

  const handleUsernameSubmitEditing = React.useCallback(
    () => inputPassword.current.focus(),
    [inputPassword],
  );

  const handlePasswordVisibility = React.useCallback(
    () => setIsPasswordVisible(!isPasswordVisible),
    [setIsPasswordVisible, isPasswordVisible],
  );

  const handleSignUp = React.useCallback(() => {
    const data = {
      junkShopName,
      firstName,
      lastName,
      address,
      city,
      zip,
      phone,
      email,
      username,
      password,
      role,
    };

    onSignUp(data);

    inputPassword.current.blur();
  }, [
    junkShopName,
    firstName,
    lastName,
    address,
    city,
    zip,
    phone,
    email,
    username,
    password,
    role,
    onSignUp,
  ]);

  return (
    <View style={styles.form}>
      <View style={styles.inputTextContainer}>
        {isJunkShop && (
          <TextInput
            mode="outlined"
            returnKeyType="next"
            label="Junk Shop Name"
            placeholder="Your Junk Shop Name"
            blurOnSubmit={false}
            onChangeText={handleJunkShopNameChange}
            onSubmitEditing={handleJunkShopNameSubmitEditing}
            style={styles.inputText}
          />
        )}

        <View style={styles.row}>
          <View style={styles.inputTextWrapper}>
            <TextInput
              mode="outlined"
              returnKeyType="next"
              label="First Name"
              placeholder="Your First Name"
              blurOnSubmit={false}
              onChangeText={handleFirstNameChange}
              onSubmitEditing={handleFirstNameSubmitEditing}
              ref={inputFirstName}
              style={[styles.inputText, styles.firstName]}
            />
          </View>

          <View style={styles.inputTextWrapper}>
            <TextInput
              mode="outlined"
              returnKeyType="next"
              label="Last Name"
              placeholder="Your Last Name"
              blurOnSubmit={false}
              onChangeText={handleLastNameChange}
              onSubmitEditing={handleLastNameSubmitEditing}
              ref={inputLastName}
              style={styles.inputText}
            />
          </View>
        </View>

        <TextInput
          mode="outlined"
          returnKeyType="next"
          label="Address"
          placeholder="Your Address"
          blurOnSubmit={false}
          onChangeText={handleAddressChange}
          onSubmitEditing={handleAddressSubmitEditing}
          ref={inputAddress}
          style={styles.inputText}
        />

        <View style={styles.row}>
          <View style={styles.inputTextWrapper}>
            <TextInput
              mode="outlined"
              returnKeyType="next"
              label="City"
              blurOnSubmit={false}
              onChangeText={handleCityChange}
              onSubmitEditing={handleCitySubmitEditing}
              ref={inputCity}
              style={[styles.inputText, styles.firstName]}
            />
          </View>

          <View style={styles.inputTextWrapper}>
            <TextInput
              mode="outlined"
              returnKeyType="next"
              label="Zip Code"
              keyboardType="number-pad"
              maxLength={5}
              blurOnSubmit={false}
              onChangeText={handleZipChange}
              onSubmitEditing={handleZipSubmitEditing}
              ref={inputZip}
              style={styles.inputText}
            />
          </View>
        </View>

        <TextInput
          mode="outlined"
          returnKeyType="next"
          label="Phone Number"
          placeholder="Your Phone Number"
          keyboardType="number-pad"
          maxLength={10}
          blurOnSubmit={false}
          onChangeText={handlePhoneChange}
          onSubmitEditing={handlePhoneSubmitEditing}
          ref={inputPhone}
          style={styles.inputText}
          left={<TextInput.Affix text="+63" />}
        />

        <TextInput
          mode="outlined"
          returnKeyType="next"
          label="Email"
          placeholder="Your Emai"
          blurOnSubmit={false}
          error={Boolean(error) || error === 'Invalid Email'}
          onChangeText={handleEmailChange}
          onSubmitEditing={handleEmailSubmitEditing}
          ref={inputEmail}
          style={styles.inputText}
        />

        <TextInput
          mode="outlined"
          returnKeyType="next"
          label="Username"
          placeholder="Your Username"
          blurOnSubmit={false}
          error={Boolean(error) && error !== 'Invalid Email'}
          onChangeText={handleUsernameChange}
          onSubmitEditing={handleUsernameSubmitEditing}
          ref={inputUsername}
          style={styles.inputText}
        />

        <TextInput
          mode="outlined"
          returnKeyType="done"
          label="Password"
          placeholder="Your Password"
          blurOnSubmit={false}
          secureTextEntry={!isPasswordVisible}
          onChangeText={handlePasswordChange}
          onSubmitEditing={handleSignUp}
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
        onPress={handleSignUp}
        disabled={isSignUpButtonEnabled}
        loading={isLoading}
        style={styles.button}
        contentStyle={styles.buttonContent}
        labelStyle={styles.buttonLabel}
      >
        {isLoading ? 'Loading' : 'Sign Up'}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  inputTextWrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  firstName: {
    marginRight: 20,
  },
  inputTextContainer: {
    marginBottom: 20,
  },
  inputText: {
    marginBottom: 15,
    height: 50,
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
