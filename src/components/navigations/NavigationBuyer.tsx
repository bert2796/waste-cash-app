import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Colors } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  BuyerStackParam,
  BuyerMainTabParam,
  BuyerNotificationTabParam,
} from '../../types';
import { ScreenBuyerNotifications } from '@screens/ScreenBuyer/ScreenBuyerNotifications';
import { ScreenBuyerMessages } from '@screens/ScreenBuyer/ScreenBuyerMessages';
import { ScreenBuyerShops } from '@screens/ScreenBuyer/ScreenBuyerShops';
import ContainerBuyerChatProduct from '@containers/ContainerBuyerChatProduct';
import ContainerBuyerProducts from '@containers/ContainerBuyerProducts';
import ContainerBuyerProfile from '@containers/ContainerBuyerProfile';
import ContainerBuyerProfileSettings from '@containers/ContainerBuyerProfileSettings';
import ContainerBuyerViewProduct from '@containers/ContainerBuyerViewProduct';

const BuyerStack = createStackNavigator<BuyerStackParam>();
const BuyerMainTab = createBottomTabNavigator<BuyerMainTabParam>();
const BuyerNotificationTab =
  createMaterialTopTabNavigator<BuyerNotificationTabParam>();

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
      component={ScreenBuyerNotifications}
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
      component={ScreenBuyerShops}
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

export const NavigationBuyer = () => (
  <>
    <BuyerStack.Screen
      name="BuyerHome"
      component={BuyerHome}
      options={{ headerShown: false }}
    />
    <BuyerStack.Screen
      name="BuyerProfileSettings"
      component={ContainerBuyerProfileSettings}
      options={{ headerTitle: 'Profile Settings', headerTitleAlign: 'center' }}
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
  </>
);

const styles = StyleSheet.create({
  notificationTabIndicator: {
    backgroundColor: Colors.green500,
    height: 3,
  },
});
