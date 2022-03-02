import React from 'react';
import { Socket } from 'socket.io-client';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { Colors } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  IConversation,
  IMessage,
  IUser,
  UserRoles,
  LoggedoutStackParam,
  BuyerStackParam,
  BuyerMainTabParam,
  BuyerNotificationTabParam,
  ShopStackParam,
  ShopMainTabParam,
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
import ContainerBuyerChat from '@containers/ContainerBuyerChat';
import ContainerBuyerChatProduct from '@containers/ContainerBuyerChatProduct';
import ContainerBuyerChatShop from '@containers/ContainerBuyerChatShop';
import ContainerBuyerMessages from '@containers/ContainerBuyerMessages';
import ContainerBuyerNotifications from '@containers/ContainerBuyerNotifications';
import ContainerBuyerProducts from '@containers/ContainerBuyerProducts';
import ContainerBuyerProfile from '@containers/ContainerBuyerProfile';
import ContainerBuyerProfileSettings from '@containers/ContainerBuyerProfileSettings';
import ContainerBuyerShops from '@containers/ContainerBuyerShops';
import ContainerBuyerViewProduct from '@containers/ContainerBuyerViewProduct';

import { SellerNavigation } from './SellerNavigation';

// Shop
import ContainerShopChat from '@containers/ContainerShopChat';
import ContainerShopMessages from '@containers/ContainerShopMessages';
import ContainerShopProfile from '@containers/ContainerShopProfile';
import ContainerShopProfileSettings from '@containers/ContainerShopProfileSettings';

interface Props {
  error: string;
  isAuth: boolean;
  isConnected: boolean | null;
  isInitialize: boolean;
  hasUnseenConversation: boolean;
  hasUnseenNotification: boolean;
  conversationMessage: IConversation;
  me: IUser;
  role: UserRoles;
  onAddConversationDataMessage: (params: IMessage) => void;
  onAddConversationListMessage: (params: IMessage) => void;
  onAppInitialize: () => void;
  onSetAppError: (error: string | null) => void;
  socket: Socket;
}

const Stack = createStackNavigator();
const LoggedoutStack = createStackNavigator<LoggedoutStackParam>();
const BuyerStack = createStackNavigator<BuyerStackParam>();
const BuyerMainTab = createBottomTabNavigator<BuyerMainTabParam>();
const BuyerNotificationTab =
  createMaterialTopTabNavigator<BuyerNotificationTabParam>();
const ShopStack = createStackNavigator<ShopStackParam>();
const ShopMainTab = createBottomTabNavigator<ShopMainTabParam>();

export const Navigation: React.FC<Props> = ({
  error,
  isAuth,
  isInitialize,
  isConnected,
  hasUnseenConversation,
  hasUnseenNotification,
  me,
  role,
  onAddConversationListMessage,
  onAppInitialize,
  onSetAppError,
  socket,
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

  const hasNotificationBadge = React.useMemo(
    () => hasUnseenConversation || hasUnseenNotification,
    [hasUnseenConversation, hasUnseenNotification],
  );

  // Socket
  React.useEffect(() => {
    const hasCreateMessageListener = socket.hasListeners('createMessage');

    if (!hasCreateMessageListener) {
      console.log('Added createMessage listener');
      socket.on('createMessage', (payload: IMessage) => {
        if (payload.sender.id !== me.id) {
          onAddConversationListMessage(payload);
        }
      });
    }

    return () => {
      // destroy current listener to avoid duplication of listener when this component rerender
      socket.off('createMessage');
    };
  }, [socket, me, onAddConversationListMessage]);

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
        // swipeEnabled: false,
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
        component={ContainerBuyerMessages}
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
          ...(hasNotificationBadge && { tabBarBadge: ' ' }),
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

  // Shop Screen
  const ShopHome = () => (
    <ShopMainTab.Navigator
      screenOptions={{
        tabBarInactiveTintColor: Colors.black,
        tabBarActiveTintColor: Colors.green500,
      }}
    >
      <ShopMainTab.Screen
        name="Messages"
        component={ContainerShopMessages}
        options={{
          tabBarLabel: 'Notifications',
          ...(hasNotificationBadge && { tabBarBadge: ' ' }),
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
                name="BuyerChat"
                component={ContainerBuyerChat}
              />
              <BuyerStack.Screen
                name="BuyerChatProduct"
                component={ContainerBuyerChatProduct}
              />
              <BuyerStack.Screen
                name="BuyerChatShop"
                component={ContainerBuyerChatShop}
              />
            </Stack.Group>
          )}

          {/* Seller Stack Group */}
          {isAuth && role === UserRoles.SELLER && (
            <>
              <Stack.Group>
                {SellerNavigation({ hasNotification: hasNotificationBadge })}
              </Stack.Group>
            </>
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
              <ShopStack.Screen name="ShopChat" component={ContainerShopChat} />
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
