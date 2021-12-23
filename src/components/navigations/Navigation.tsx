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
  BuyerStackParam,
  BuyerMainTabParam,
  BuyerNotificationTabParam,
  SellerStackParam,
  SellerMainTabParam,
  SellerNotificationTabParam,
  ShopStackParam,
  ShopMainTabParam,
  ShopNotificationTabParam,
} from '../../types';
import { navigationRef } from '@state/navigation';
import { ScreenInitialLoading } from '@screens/ScreenInitialLoading/ScreenInitialLoading';
import { DialogAppError } from '@molecules/DialogAppError/DialogAppError';
import { SnackbarAppDC } from '@molecules/SnackbarAppDC/SnackbarAppDC';

// Logged out
import ContainerSelectRole from '@containers/ContainerSelectRole';
import ContainerSignIn from '@containers/ContainerSignIn';
import ContainerSignUp from '@containers/ContainerSignUp';

// Buyer
import { ScreenBuyerChatShop } from '@screens/ScreenBuyer/ScreenBuyerChatShop';
import { ScreenBuyerMessages } from '@screens/ScreenBuyer/ScreenBuyerMessages';
import ContainerBuyerChatProduct from '@containers/ContainerBuyerChatProduct';
import ContainerBuyerNotifications from '@containers/ContainerBuyerNotifications';
import ContainerBuyerProducts from '@containers/ContainerBuyerProducts';
import ContainerBuyerProfile from '@containers/ContainerBuyerProfile';
import ContainerBuyerProfileSettings from '@containers/ContainerBuyerProfileSettings';
import ContainerBuyerShops from '@containers/ContainerBuyerShops';
import ContainerBuyerViewProduct from '@containers/ContainerBuyerViewProduct';

// Seller
import { ScreenSellerMessages } from '@screens/ScreenSeller/ScreenSellerMessages';
import ContainerSellerCreateProduct from '@containers/ContainerSellerCreateProduct';
import ContainerSellerNotifications from 'containers/ContainerSellerNotifications';
import ContainerSellerProducts from '@containers/ContainerSellerProducts';
import ContainerSellerProfile from '@containers/ContainerSellerProfile';
import ContainerSellerProfileSettings from '@containers/ContainerSellerProfileSettings';
import ContainerSellerViewOffers from '@containers/ContainerSellerViewOffers';
import ContainerSellerViewProduct from '@containers/ContainerSellerViewProduct';

// Shop
import { ScreenShopMessages } from '@screens/ScreenShop/ScreenShopMessages';
import ContainerShopNotifications from '@containers/ContainerShopNotifications';
import ContainerShopProfile from '@containers/ContainerShopProfile';
import ContainerShopProfileSettings from '@containers/ContainerShopProfileSettings';

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
const BuyerStack = createStackNavigator<BuyerStackParam>();
const BuyerMainTab = createBottomTabNavigator<BuyerMainTabParam>();
const BuyerNotificationTab =
  createMaterialTopTabNavigator<BuyerNotificationTabParam>();
const SellerStack = createStackNavigator<SellerStackParam>();
const SellerMainTab = createBottomTabNavigator<SellerMainTabParam>();
const SellerNotificationTab =
  createMaterialTopTabNavigator<SellerNotificationTabParam>();
const ShopStack = createStackNavigator<ShopStackParam>();
const ShopMainTab = createBottomTabNavigator<ShopMainTabParam>();
const ShopNotificationTab =
  createMaterialTopTabNavigator<ShopNotificationTabParam>();

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

  // Buyer Screens
  const BuyerNotification = () => (
    <BuyerNotificationTab.Navigator
      screenOptions={{
        swipeEnabled: false,
        tabBarActiveTintColor: Colors.green500,
        tabBarInactiveTintColor: Colors.black,
        tabBarIndicatorStyle: styles.notificationTabIndicator,
      }}
    >
      <BuyerNotificationTab.Screen
        name="NotificationTab"
        component={ContainerBuyerNotifications}
        options={{ title: 'Notifications' }}
      />
      <BuyerNotificationTab.Screen
        name="MessageTab"
        component={ScreenBuyerMessages}
        options={{ title: 'Messages' }}
      />
    </BuyerNotificationTab.Navigator>
  );

  const BuyerHome = () => (
    <BuyerMainTab.Navigator
      screenOptions={{
        tabBarInactiveTintColor: Colors.black,
        tabBarActiveTintColor: Colors.green500,
      }}
    >
      <BuyerMainTab.Screen
        name="Product"
        component={ContainerBuyerProducts}
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
      <BuyerMainTab.Screen
        name="Shop"
        component={ContainerBuyerShops}
        options={{
          title: 'Junk Shop',
          tabBarLabel: 'Junk Shop',
          tabBarIcon: ({ color, size, focused }) => (
            <Icon
              name={focused ? 'construct' : 'construct-outline'}
              color={color}
              size={size}
            />
          ),
          headerTitleAlign: 'center',
        }}
      />
      <BuyerMainTab.Screen
        name="Notification"
        component={BuyerNotification}
        options={{
          tabBarLabel: 'Notifications',
          tabBarIcon: ({ color, size, focused }) => (
            <Icon
              name={focused ? 'notifications' : 'notifications-outline'}
              color={color}
              size={size}
            />
          ),
          headerTitleAlign: 'center',
        }}
      />
      <BuyerMainTab.Screen
        name="Profile"
        component={ContainerBuyerProfile}
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
    </BuyerMainTab.Navigator>
  );

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
        component={ContainerSellerNotifications}
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

  // Shop Screen
  const ShopNotification = () => (
    <ShopNotificationTab.Navigator
      screenOptions={{
        swipeEnabled: false,
        tabBarActiveTintColor: Colors.green500,
        tabBarInactiveTintColor: Colors.black,
        tabBarIndicatorStyle: styles.notificationTabIndicator,
      }}
    >
      <ShopNotificationTab.Screen
        name="NotificationTab"
        component={ContainerShopNotifications}
        options={{ title: 'Notifications' }}
      />
      <ShopNotificationTab.Screen
        name="MessageTab"
        component={ScreenShopMessages}
        options={{ title: 'Messages' }}
      />
    </ShopNotificationTab.Navigator>
  );

  const ShopHome = () => (
    <ShopMainTab.Navigator
      screenOptions={{
        tabBarInactiveTintColor: Colors.black,
        tabBarActiveTintColor: Colors.green500,
      }}
    >
      <ShopMainTab.Screen
        name="Notification"
        component={ShopNotification}
        options={{
          tabBarLabel: 'Notifications',
          tabBarIcon: ({ color, size, focused }) => (
            <Icon
              name={focused ? 'notifications' : 'notifications-outline'}
              color={color}
              size={size}
            />
          ),
          headerTitleAlign: 'center',
        }}
      />
      <ShopMainTab.Screen
        name="Profile"
        component={ContainerShopProfile}
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
    </ShopMainTab.Navigator>
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
          {isAuth && role === UserRoles.BUYER && (
            <Stack.Group>
              <BuyerStack.Screen
                name="BuyerHome"
                component={BuyerHome}
                options={{ headerShown: false }}
              />
              <BuyerStack.Screen
                name="BuyerProfileSettings"
                component={ContainerBuyerProfileSettings}
                options={{
                  headerTitle: 'Profile Settings',
                  headerTitleAlign: 'center',
                }}
              />
              <BuyerStack.Screen
                name="BuyerViewProduct"
                component={ContainerBuyerViewProduct}
                options={{ headerTitle: '' }}
              />
              <BuyerStack.Screen
                name="BuyerChatProduct"
                component={ContainerBuyerChatProduct}
              />
              <BuyerStack.Screen
                name="BuyerChatShop"
                component={ScreenBuyerChatShop}
              />
            </Stack.Group>
          )}

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

          {isAuth && role === UserRoles.JUNKSHOP && (
            <Stack.Group>
              <ShopStack.Screen
                name="ShopHome"
                component={ShopHome}
                options={{ headerShown: false }}
              />
              <ShopStack.Screen
                name="ShopProfileSettings"
                component={ContainerShopProfileSettings}
                options={{
                  headerTitle: 'Profile Settings',
                  headerTitleAlign: 'center',
                }}
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
