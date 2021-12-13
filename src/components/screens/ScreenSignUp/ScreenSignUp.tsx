import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import { View, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { Colors } from 'react-native-paper';
import axios from 'axios';

import { Auth } from '@services/index';
import { IServiceError, LoggedoutStackParam, UserRoles } from '../../../types';
import { DialogSignIn } from '@molecules/DialogSignIn/DialogSignIn';
import { FormSignUp } from '@molecules/FormSignUp/FormSignUp';

interface Props {
  role: UserRoles;
  onSetAppError: (error: string) => void;
  navigation: NavigationProp<LoggedoutStackParam>;
}

export const ScreenSignUp: React.FC<Props> = ({
  role: currentRole,
  onSetAppError,
  navigation,
}) => {
  const [error, setError] = React.useState('');
  const [isDialogSignInVisible, setIsDialogSignInVisible] =
    React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const isJunkShop = React.useMemo(
    () => currentRole === UserRoles.JUNKSHOP,
    [currentRole],
  );

  const handleSignInNavigation = React.useCallback(() => {
    setIsDialogSignInVisible(false);

    navigation.navigate('SignIn');
  }, [setIsDialogSignInVisible, navigation]);

  const handleSignUp = ({
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
  }) => {
    setIsLoading(true);
    setError('');

    // validate email
    const isEmailValid = validateEmail(email);
    if (!isEmailValid) {
      setIsLoading(false);
      setError('Invalid Email');
    } else {
      // register
      Auth.register({
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
      })
        .then(() => {
          // show modal
          setIsDialogSignInVisible(true);
        })
        .catch((apiError) => {
          if (axios.isAxiosError(apiError)) {
            if (apiError?.response) {
              const axiosError = apiError?.response as IServiceError;
              console.log(axiosError);
              if (axiosError?.status && axiosError.status === 400) {
                setError(axiosError.data.message);
              }
            }
          } else {
            onSetAppError('Server is busy. Please try again later.');
          }

          setIsLoading(false);
        });
    }
  };

  const validateEmail = (email: string) => {
    const regexp = new RegExp(
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );

    return regexp.test(email);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollContent}
        contentContainerStyle={styles.scrollContentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <SafeAreaView style={styles.content}>
          <DialogSignIn
            isVisible={isDialogSignInVisible}
            onSignInNavigation={handleSignInNavigation}
          />
          <FormSignUp
            error={error}
            role={currentRole}
            isJunkShop={isJunkShop}
            isLoading={isLoading}
            onSignUp={handleSignUp}
          />
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContent: {
    flex: 1,
  },
  scrollContentContainer: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    margin: 20,
  },
});
