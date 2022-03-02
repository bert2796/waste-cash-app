import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

import ContainerSellerChat from '@/containers/ContainerSellerChat';
import ContainerSellerCreateProduct from '@/containers/ContainerSellerCreateProduct';
import ContainerSellerMessages from '@/containers/ContainerSellerMessages';
import ContainerSellerNotifications from '@/containers/ContainerSellerNotifications';
import ContainerSellerProducts from '@/containers/ContainerSellerProducts';
import ContainerSellerProfile from '@/containers/ContainerSellerProfile';
import ContainerSellerProfileSettings from '@/containers/ContainerSellerProfileSettings';
import ContainerSellerViewOffers from '@/containers/ContainerSellerViewOffers';
import ContainerSellerViewProduct from '@/containers/ContainerSellerViewProduct';

interface Props {
  hasNotification?: boolean;
}

const Stack = createStackNavigator();
const SellerStack = createStackNavigator<SellerStackParam>();
const SellerMainTab = createBottomTabNavigator<SellerMainTabParam>();
const SellerNotificationTab =
  createMaterialTopTabNavigator<SellerNotificationTabParam>();

export const SellerNavigation: React.FC<Props> = ({ hasNotification }) => {
  // Seller screens
  const SellerNotification = () => (
    <SellerNotificationTab.Navigator
      screenOptions={{
        // swipeEnabled: false,
        tabBarActiveTintColor: Colors.green500,
        tabBarInactiveTintColor: Colors.black,
        tabBarIndicatorStyle: styles.notificationTabIndicator,
      }}
    >
      <SellerNotificationTab.Screen
        component={ContainerSellerNotifications}
        name="NotificationTab"
        options={{ title: 'Notifications' }}
      />
      <SellerNotificationTab.Screen
        component={ContainerSellerMessages}
        name="MessageTab"
        options={{ title: 'Messages' }}
      />
    </SellerNotificationTab.Navigator>
  );

  const SellerHome = () => (
    <SellerMainTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.green500,
        tabBarInactiveTintColor: Colors.black,
      }}
    >
      <SellerMainTab.Screen
        component={ContainerSellerProducts}
        name="Product"
        options={{
          headerTitleAlign: 'center',
          tabBarIcon: ({ color, size, focused }) => (
            <Icon
              color={color}
              name={focused ? 'home' : 'home-outline'}
              size={size}
            />
          ),
          tabBarLabel: 'Browse',
          title: 'Browse Products',
        }}
      />
      <SellerMainTab.Screen
        component={SellerNotification}
        name="Notification"
        options={{
          headerTitleAlign: 'center',
          tabBarLabel: 'Notifications',
          title: 'Notifications',
          ...(hasNotification && { tabBarBadge: ' ' }),
          tabBarIcon: ({ color, size, focused }) => (
            <Icon
              color={color}
              name={focused ? 'notifications' : 'notifications-outline'}
              size={size}
            />
          ),
        }}
      />
      <SellerMainTab.Screen
        component={ContainerSellerProfile}
        name="Profile"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <Icon
              color={color}
              name={focused ? 'person' : 'person-outline'}
              size={size}
            />
          ),
          tabBarLabel: 'Profile',
        }}
      />
    </SellerMainTab.Navigator>
  );

  return (
    <Stack.Group>
      <SellerStack.Screen
        component={SellerHome}
        name="SellerHome"
        options={{ headerShown: false }}
      />
      <SellerStack.Screen
        component={ContainerSellerCreateProduct}
        name="SellerCreateProduct"
        options={{
          headerLeft: () => <View />,
          headerTitle: 'Create Product',
          headerTitleAlign: 'center',
        }}
      />
      <SellerStack.Screen
        component={ContainerSellerProfileSettings}
        name="SellerProfileSettings"
        options={{
          headerTitle: 'Profile Settings',
          headerTitleAlign: 'center',
        }}
      />
      <SellerStack.Screen component={ContainerSellerChat} name="SellerChat" />
      <SellerStack.Screen
        component={ContainerSellerViewOffers}
        name="SellerViewOffers"
        options={{ headerTitle: 'Offers' }}
      />
      <SellerStack.Screen
        component={ContainerSellerViewProduct}
        name="SellerViewProduct"
        options={{ headerTitle: '' }}
      />
    </Stack.Group>
  );
};

const styles = StyleSheet.create({
  notificationTabIndicator: {
    backgroundColor: Colors.green500,
    height: 3,
  },
});
