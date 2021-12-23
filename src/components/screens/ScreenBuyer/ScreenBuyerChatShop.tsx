import React from 'react';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import { Colors, Text } from 'react-native-paper';
import { Chat, MessageType } from '@flyerhq/react-native-chat-ui';

import { BuyerStackParam } from '../../../types';

interface Props {
  navigation: NavigationProp<BuyerStackParam>;
  route: RouteProp<BuyerStackParam, 'BuyerChatShop'>;
}

export const ScreenBuyerChatShop: React.FC<Props> = ({ navigation, route }) => {
  const { shop } = route.params;

  const [messages, setMessages] = React.useState<MessageType.Any[]>([]);

  const addMessage = React.useCallback(
    (message: MessageType.Any) => {
      setMessages([message, ...messages]);
    },
    [setMessages, messages],
  );

  const handleSendMessage = React.useCallback(
    (message: MessageType.PartialText) => {
      const textMessage: MessageType.Text = {
        author: { id: '123' },
        id: '1',
        text: message.text,
        type: 'text',
      };

      addMessage(textMessage);
    },
    [addMessage],
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({ title: shop.junkShopName });
  }, [navigation, shop]);

  return (
    <View style={styles.container}>
      <Chat
        messages={messages}
        onSendPress={handleSendMessage}
        user={{ id: '123' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grey200,
  },
  productInfoSection: {
    height: 80,
  },
  productInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  productContent: {
    marginLeft: 10,
  },
  productImage: {
    height: 80,
    width: 90,
  },
});
