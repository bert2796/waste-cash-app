import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import {
  View,
  ScrollView,
  SafeAreaView,
  Image,
  StyleSheet,
} from 'react-native';
import { Colors } from 'react-native-paper';

import { LoggedoutStackParam } from '../../../types';
import { FormSignIn } from '@molecules/FormSignIn/FormSignIn';

interface Props {
  error: string;
  isLoading: boolean;
  onSetUserError: (error: string | null) => void;
  onSignIn: (username: string, password: string) => void;
  navigation: NavigationProp<LoggedoutStackParam>;
}

export const ScreenSignIn: React.FC<Props> = ({
  error,
  isLoading,
  onSetUserError,
  onSignIn,
  navigation,
}) => {
  const handleClearUserError = React.useCallback(
    () => onSetUserError(null),
    [onSetUserError],
  );

  // always clear user error whenver rerender happens
  React.useEffect(() => handleClearUserError(), [handleClearUserError]);

  const handleSignUpNavigation = React.useCallback(
    () => navigation.navigate('SignUp'),
    [navigation],
  );

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollContent}
        contentContainerStyle={styles.scrollContentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <SafeAreaView style={styles.content}>
          <View style={styles.image}>
            <Image
              source={require('../../../assets/images/placeholder-logo-1.png')}
            />
          </View>

          <View style={styles.form}>
            <FormSignIn
              error={error}
              isLoading={isLoading}
              onClearUserError={handleClearUserError}
              onSignIn={onSignIn}
              onSignUpNavigation={handleSignUpNavigation}
            />
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grey200,
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
  image: {
    marginTop: 100,
  },
  form: {
    flex: 1,
  },
});
