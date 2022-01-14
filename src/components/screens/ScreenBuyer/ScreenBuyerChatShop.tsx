import React from 'react';
import { Socket } from 'socket.io-client';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import { MessageType } from '@flyerhq/react-native-chat-ui';
import { v4 as uuidv4 } from 'uuid';

import { BuyerStackParam, IConversation, IUser } from '../../../types';
import { Chat } from '@organisms/Chat';

interface Props {
  conversationData: IConversation;
  me: IUser;
  isLoading: boolean;
  onGetConverdsationData: (shopId: number) => void;
  onSendMessage: (params: {
    socket: Socket;
    conversationId?: number;
    recipientId?: number;
    content: string;
  }) => void;
  navigation: NavigationProp<BuyerStackParam>;
  route: RouteProp<BuyerStackParam, 'BuyerChatShop'>;
  socket: Socket;
}

export const ScreenBuyerChatShop: React.FC<Props> = ({
  conversationData,
  me,
  isLoading,
  onSendMessage,
  onGetConverdsationData,
  navigation,
  route,
  socket,
}) => {
  const { shop } = route.params;
  const [message, setMessage] = React.useState('');
  const [messages, setMessages] = React.useState<MessageType.Any[]>([]);

  const updatedMessages = React.useMemo(() => {
    let formattedMessage = [];

    if (!messages.length) {
      if (conversationData?.messages?.length) {
        console.log(conversationData.messages);

        formattedMessage = conversationData.messages.map(
          (conversationMessage) => ({
            author: {
              id: `${conversationMessage.sender.id}`,
            },
            id: `${conversationMessage.id}`,
            text: conversationMessage.content,
            type: 'text',
          }),
        ) as MessageType.Any[];

        setMessages(formattedMessage);
      }
    } else if (
      messages.length &&
      conversationData?.messages?.length > messages.length
    ) {
      formattedMessage = conversationData.messages.map(
        (conversationMessage) => ({
          author: {
            id: `${conversationMessage.sender.id}`,
          },
          id: `${conversationMessage.id}`,
          text: conversationMessage.content,
          type: 'text',
        }),
      ) as MessageType.Any[];

      setMessages(formattedMessage);
    }

    return messages;
  }, [conversationData, messages]);

  const handleMessageChange = React.useCallback(
    (text: string) => setMessage(text),
    [setMessage],
  );

  const handleSendPress = React.useCallback(() => {
    let messageToAdd: MessageType.Text = {
      author: {
        id: `${me.id}`,
      },
      id: uuidv4(),
      text: message,
      type: 'text',
    };
    let toSend: {
      socket: Socket;
      content: string;
      conversationId?: number;
      recipientId?: number;
    } = {
      socket,
      content: message,
      recipientId: shop.id,
    };
    if (conversationData?.id) {
      toSend.conversationId = conversationData.id;
    }

    // add message to UI
    setMessages([messageToAdd, ...messages]);

    // clear message input
    setMessage('');
    // send message to server
    onSendMessage(toSend);
  }, [
    conversationData,
    me,
    message,
    messages,
    shop,
    socket,
    onSendMessage,
    setMessage,
    setMessages,
  ]);

  React.useLayoutEffect(() => {
    navigation.setOptions({ title: shop.junkShopName });
  }, [navigation, shop]);

  React.useEffect(() => {
    onGetConverdsationData(shop.id);
  }, [shop, onGetConverdsationData]);

  return (
    <View style={styles.container}>
      <Chat
        messages={updatedMessages}
        text={message}
        user={me}
        isLoading={isLoading}
        isSendDisabled={Boolean(!message)}
        onChangeText={handleMessageChange}
        onSendPress={handleSendPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
