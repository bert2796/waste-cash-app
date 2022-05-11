import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import ContainerBuyerViewMap from 'containers/ContainerBuyerViewMap';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

import ContainerBuyerListProducts from '@/containers/ContainerBuyerListProducts';
import ContainerBuyerListShops from '@/containers/ContainerBuyerListShops';
import ContainerBuyerViewProduct from '@/containers/ContainerBuyerViewProduct';
import ContainerListConversations from '@/containers/ContainerCommonListConversations';
import ContainerListNotifications from '@/containers/ContainerCommonListNotifications';
import ContainerProfile from '@/containers/ContainerCommonProfile';
import ContainerViewConversation from '@/containers/ContainerCommonViewConversation';
import ContainerViewNotification from '@/containers/ContainerCommonViewNotification';

interface Props {
  hasNotificationBadge: boolean;
}

const BuyerStack = createStackNavigator<Screens.BuyerStackParams>();
const BuyerInitialScreenTabs =
  createBottomTabNavigator<Screens.BuyerInitialScreenTabs>();
const BuyerNotificationScreenTabs =
  createMaterialTopTabNavigator<Screens.BuyerNotificationScreenTabs>();

export const BuyerNavigation: React.FC<Props> = ({ hasNotificationBadge }) => {
  const NotificationsScreen = () => (
    <BuyerNotificationScreenTabs.Navigator
      screenOptions={{
        // swipeEnabled: false,
        tabBarActiveTintColor: Colors.green500,
        tabBarInactiveTintColor: Colors.black,
        tabBarIndicatorStyle: styles.notificationTabIndicator,
      }}
    >
      <BuyerNotificationScreenTabs.Screen
        component={ContainerListNotifications}
        name="NotificationsTabView"
        options={{ title: 'Notifications' }}
      />

      <BuyerNotificationScreenTabs.Screen
        component={ContainerListConversations}
        name="MessagesTabView"
        options={{ title: 'Messages' }}
      />
    </BuyerNotificationScreenTabs.Navigator>
  );

  const InitialScreen = () => (
    <BuyerInitialScreenTabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.green500,
        tabBarInactiveTintColor: Colors.black,
      }}
    >
      <BuyerInitialScreenTabs.Screen
        component={ContainerBuyerListProducts}
        name="ProductsTabView"
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

      <BuyerInitialScreenTabs.Screen
        component={ContainerBuyerListShops}
        name="ShopsTabView"
        options={{
          headerTitleAlign: 'center',
          tabBarIcon: ({ color, size, focused }) => (
            <Icon
              color={color}
              name={focused ? 'construct' : 'construct-outline'}
              size={size}
            />
          ),
          tabBarLabel: 'Junk Shop',
          title: 'Junk Shop',
        }}
      />

      <BuyerInitialScreenTabs.Screen
        component={NotificationsScreen}
        name="NotificationsScreen"
        options={{
          tabBarLabel: 'Notifications',
          ...(hasNotificationBadge && { tabBarBadge: ' ' }),
          headerTitleAlign: 'center',
          tabBarIcon: ({ color, size, focused }) => (
            <Icon
              color={color}
              name={focused ? 'notifications' : 'notifications-outline'}
              size={size}
            />
          ),
        }}
      />

      <BuyerInitialScreenTabs.Screen
        component={ContainerProfile}
        name="ProfileTabView"
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
    </BuyerInitialScreenTabs.Navigator>
  );

  return (
    <BuyerStack.Group>
      <BuyerStack.Screen
        component={InitialScreen}
        name="BuyerInitialScreen"
        options={{ headerShown: false }}
      />

      {/* View Screens */}
      <BuyerStack.Screen
        component={ContainerBuyerViewProduct}
        name="BuyerViewProductScreen"
        options={{ headerShadowVisible: true, headerTitle: '' }}
      />

      <BuyerStack.Screen
        component={ContainerViewConversation}
        name="BuyerViewConversationScreen"
        options={{ headerShadowVisible: true }}
      />

      <BuyerStack.Screen
        component={ContainerViewNotification}
        name="BuyerViewNotificationScreen"
        options={{
          headerShadowVisible: true,
          headerTitle: '',
        }}
      />

      <BuyerStack.Screen
        component={ContainerBuyerViewMap}
        name="BuyerViewMap"
        options={{
          headerShadowVisible: true,
          headerTitle: '',
        }}
      />
    </BuyerStack.Group>
  );
};

const styles = StyleSheet.create({
  notificationTabIndicator: {
    backgroundColor: Colors.green500,
    height: 3,
  },
});
