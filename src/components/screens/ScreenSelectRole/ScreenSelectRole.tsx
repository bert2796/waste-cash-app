import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import { View, Image, StyleSheet } from 'react-native';
import { Button, Colors } from 'react-native-paper';

import { LoggedoutStackParam, UserRoles } from '../../../types';

interface Props {
  role: UserRoles | string;
  onSetRole: (role: UserRoles) => void;
  navigation: NavigationProp<LoggedoutStackParam>;
}

export const ScreenSelectRole: React.FC<Props> = ({
  role,
  onSetRole,
  navigation,
}) => {
  const handleSelectSeller = React.useCallback(() => {
    onSetRole(UserRoles.SELLER);

    navigation.navigate('SignIn');
  }, [onSetRole, navigation]);

  const handleSelectBuyer = React.useCallback(() => {
    onSetRole(UserRoles.BUYER);

    navigation.navigate('SignIn');
  }, [onSetRole, navigation]);

  const handleSelectJunkShop = React.useCallback(() => {
    onSetRole(UserRoles.JUNKSHOP);

    navigation.navigate('SignIn');
  }, [onSetRole, navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <Image
          source={require('../../../assets/images/placeholder-logo-1.png')}
        />
      </View>
      <View style={styles.buttons}>
        <Button
          mode="contained"
          onPress={handleSelectSeller}
          style={styles.button}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}
        >
          Seller
        </Button>

        <Button
          mode="contained"
          onPress={handleSelectBuyer}
          style={styles.button}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}
        >
          Buyer
        </Button>

        <Button
          mode="contained"
          onPress={handleSelectJunkShop}
          style={styles.button}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}
        >
          Junk Shop
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grey200,
  },
  image: {
    marginTop: 150,
  },
  buttons: {
    flex: 1,
    margin: 20,
  },
  button: {
    marginBottom: 30,
  },
  buttonContent: {
    height: 50,
  },
  buttonLabel: {
    color: Colors.white,
  },
});
