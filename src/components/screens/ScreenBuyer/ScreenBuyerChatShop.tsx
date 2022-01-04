import React from 'react';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { Colors } from 'react-native-paper';
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
        customBottomComponent={() => (
          <View style={styles.chatBoxContainer}>
            <View style={styles.chatBoxPrimary}>
              <TextInput
                style={styles.chatTextInput}
                placeholderTextColor={Colors.grey300}
                underlineColorAndroid="transparent"
                placeholder="Type a message..."
              />

              <TouchableOpacity style={styles.chatButtonContainer}>
                <View>
                  <Text style={styles.chatButtonText}>Send</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
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
  chatBoxContainer: {
    borderTopWidth: 1,
    borderTopColor: Colors.grey300,
    backgroundColor: Colors.white,
    bottom: 0,
    left: 0,
    right: 0,
  },
  chatBoxPrimary: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  chatTextInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    lineHeight: 16,
    height: 41,
  },
  chatButtonContainer: {
    height: 44,
    justifyContent: 'flex-end',
  },
  chatButtonText: {
    color: Colors.blue400,
    fontWeight: '600',
    fontSize: 17,
    backgroundColor: 'transparent',
    marginBottom: 12,
    marginLeft: 10,
    marginRight: 10,
  },
});
