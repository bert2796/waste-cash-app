import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { Colors } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  UserRoles,
  LoggedoutStackParam,
  SellerStackParam,
  SellerMainTabParam,
  SellerNotificationTabParam,
} from '../../types';
import { navigationRef } from '@state/navigation';
import { ScreenInitialLoading } from '@screens/ScreenInitialLoading/ScreenInitialLoading';
import { NavigationBuyer } from './NavigationBuyer';
import { DialogAppError } from '@molecules/DialogAppError/DialogAppError';
import { SnackbarAppDC } from '@molecules/SnackbarAppDC/SnackbarAppDC';

// Logged out
import ContainerSelectRole from '@containers/ContainerSelectRole';
import ContainerSignIn from '@containers/ContainerSignIn';
import ContainerSignUp from '@containers/ContainerSignUp';

// Seller
import { ScreenSellerNotifications } from '@screens/ScreenSeller/ScreenSellerNotifications';
import { ScreenSellerMessages } from '@screens/ScreenSeller/ScreenSellerMessages';
import ContainerSellerCreateProduct from '@containers/ContainerSellerCreateProduct';
import ContainerSellerNotification from '@containers/ContainerSellerNotification';
import ContainerSellerProducts from '@containers/ContainerSellerProducts';
import ContainerSellerProfile from '@containers/ContainerSellerProfile';
import ContainerSellerProfileSettings from '@containers/ContainerSellerProfileSettings';
import ContainerSellerViewOffers from '@containers/ContainerSellerViewOffers';
import ContainerSellerViewProduct from '@containers/ContainerSellerViewProduct';

interface Props {
  error: string;
  isAuth: boolean;
  isConnected: boolean | null;
  isInitialize: boolean;
  hasUnseenNotification: boolean;
  role: UserRoles;
  onAppInitialize: () => void;
  onSetAppError: (error: string | null) => void;
}

const Stack = createStackNavigator();
const LoggedoutStack = createStackNavigator<LoggedoutStackParam>();
const SellerStack = createStackNavigator<SellerStackParam>();
const SellerMainTab = createBottomTabNavigator<SellerMainTabParam>();
const SellerNotificationTab =
  createMaterialTopTabNavigator<SellerNotificationTabParam>();

export const Navigation: React.FC<Props> = ({
  error,
  isAuth,
  isInitialize,
  isConnected,
  hasUnseenNotification,
  role,
  onAppInitialize,
  onSetAppError,
}) => {
  const [isAppErrorDialogVisible, setIsAppErrorDialogVisible] =
    React.useState(false);
  const [isNetworkDCSnacbarVisible, setIsNetworkDCSNackbarVisible] =
    React.useState(false);

  const handleAppInitialize = React.useCallback(() => {
    onAppInitialize();
  }, [onAppInitialize]);

  const handleClearAppError = React.useCallback(() => {
    onSetAppError(null);
  }, [onSetAppError]);

  const handleDismissAppErrorDialog = React.useCallback(() => {
    // clear app error
    handleClearAppError();

    setIsAppErrorDialogVisible(false);
  }, [handleClearAppError, setIsAppErrorDialogVisible]);

  const handleDismissNetworkDCSnackbar = React.useCallback(
    () => setIsNetworkDCSNackbarVisible(false),
    [setIsNetworkDCSNackbarVisible],
  );

  // initialize
  React.useEffect(() => {
    handleAppInitialize();
  }, [handleAppInitialize]);

  // network is offline/ disconnected
  React.useEffect(() => {
    if (!isConnected) {
      setIsNetworkDCSNackbarVisible(true);
    }
  }, [isConnected]);

  // system error
  React.useEffect(() => {
    if (error) {
      setIsAppErrorDialogVisible(true);
    }
  }, [error]);

  // Seller screens
  const SellerNotification = () => (
    <SellerNotificationTab.Navigator
      screenOptions={{
        swipeEnabled: false,
        tabBarActiveTintColor: Colors.green500,
        tabBarInactiveTintColor: Colors.black,
        tabBarIndicatorStyle: styles.notificationTabIndicator,
      }}
    >
      <SellerNotificationTab.Screen
        name="NotificationTab"
        component={ContainerSellerNotification}
        options={{ title: 'Notifications' }}
      />
      <SellerNotificationTab.Screen
        name="MessageTab"
        component={ScreenSellerMessages}
        options={{ title: 'Messages' }}
      />
    </SellerNotificationTab.Navigator>
  );

  const SellerHome = () => (
    <SellerMainTab.Navigator
      screenOptions={{
        tabBarInactiveTintColor: Colors.black,
        tabBarActiveTintColor: Colors.green500,
      }}
    >
      <SellerMainTab.Screen
        name="Product"
        component={ContainerSellerProducts}
        options={{
          title: 'Browse Products',
          tabBarLabel: 'Browse',
          tabBarIcon: ({ color, size, focused }) => (
            <Icon
              name={focused ? 'home' : 'home-outline'}
              color={color}
              size={size}
            />
          ),
          headerTitleAlign: 'center',
        }}
      />
      <SellerMainTab.Screen
        name="Notification"
        component={SellerNotification}
        options={{
          headerTitleAlign: 'center',
          title: 'Notifications',
          tabBarLabel: 'Notifications',
          ...(hasUnseenNotification && { tabBarBadge: ' ' }),
          tabBarIcon: ({ color, size, focused }) => (
            <Icon
              name={focused ? 'notifications' : 'notifications-outline'}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <SellerMainTab.Screen
        name="Profile"
        component={ContainerSellerProfile}
        options={{
          headerShown: false,
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size, focused }) => (
            <Icon
              name={focused ? 'person' : 'person-outline'}
              color={color}
              size={size}
            />
          ),
        }}
      />
    </SellerMainTab.Navigator>
  );

  // display loading screen if app is not yet initialized
  if (!isInitialize) {
    return <ScreenInitialLoading />;
  }

  return (
    <>
      <DialogAppError
        error={error}
        isVisible={isAppErrorDialogVisible}
        onDismissDialog={handleDismissAppErrorDialog}
      />
      <SnackbarAppDC
        isVisible={isNetworkDCSnacbarVisible}
        onDismissSnackbar={handleDismissNetworkDCSnackbar}
      />
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
          {/* Seller Stack Group */}
          {isAuth && role === UserRoles.SELLER && (
            <Stack.Group>
              <SellerStack.Screen
                name="SellerHome"
                component={SellerHome}
                options={{ headerShown: false }}
              />
              <SellerStack.Screen
                name="SellerCreateProduct"
                component={ContainerSellerCreateProduct}
                options={{
                  headerTitle: 'Create Product',
                  headerTitleAlign: 'center',
                  headerLeft: () => <View />,
                }}
              />
              <SellerStack.Screen
                name="SellerProfileSettings"
                component={ContainerSellerProfileSettings}
                options={{
                  headerTitle: 'Profile Settings',
                  headerTitleAlign: 'center',
                }}
              />
              <SellerStack.Screen
                name="SellerViewOffers"
                component={ContainerSellerViewOffers}
                options={{ headerTitle: 'Offers' }}
              />
              <SellerStack.Screen
                name="SellerViewProduct"
                component={ContainerSellerViewProduct}
                options={{ headerTitle: '' }}
              />
            </Stack.Group>
          )}

          {/* Logged Out Stack Group */}
          <Stack.Group>
            <LoggedoutStack.Screen
              name="SelectRole"
              component={ContainerSelectRole}
              options={{ headerShown: false }}
            />
            <LoggedoutStack.Screen
              name="SignIn"
              component={ContainerSignIn}
              options={{ title: 'Sign In' }}
            />
            <LoggedoutStack.Screen
              name="SignUp"
              component={ContainerSignUp}
              options={{ title: 'Sign Up' }}
            />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({
  notificationTabIndicator: {
    backgroundColor: Colors.green500,
    height: 3,
  },
});
