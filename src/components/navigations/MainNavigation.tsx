import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { UserRoles } from '@/constants/index';
import { ScreenLoading } from '@/screens/ScreenLoading';
import { navigationRef } from '@/state/navigation';

import { BuyerNavigation } from './BuyerNavigation';
import { LoggedOutNavigation } from './LoggedOutNavigation';
import { SellerNavigation } from './SellerNavigation';

interface Props {
  isAuth: boolean;
  isInitialize: boolean;
  role: string;
  initialize: () => void;
}

const Stack = createStackNavigator();

export const MainNavigation: React.FC<Props> = ({
  isAuth,
  isInitialize,
  role,
  initialize,
}) => {
  React.useEffect(() => {
    initialize();
  }, [initialize]);

  // display loading screen if app is not yet initialized
  if (!isInitialize) {
    return <ScreenLoading />;
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        {isAuth && role === UserRoles.BUYER && (
          <Stack.Group>
            {BuyerNavigation({ hasNotificationBadge: false })}
          </Stack.Group>
        )}

        {isAuth && role === UserRoles.SELLER && (
          <Stack.Group>
            {SellerNavigation({ hasNotificationBadge: false })}
          </Stack.Group>
        )}

        <Stack.Group>{LoggedOutNavigation({})}</Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
