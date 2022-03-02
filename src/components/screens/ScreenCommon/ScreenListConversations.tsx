import { NavigationProp } from '@react-navigation/native';
import React from 'react';

import { Container } from '@/atoms/index';
import { UserRoles } from '@/constants/index';
import { EmptyListPlaceHolder, FlatListConversations } from '@/molecules/index';

interface Props {
  conversationList: Objects.ConversationSummary[];
  userData: Objects.User;
  navigation: NavigationProp<any>;
}

export const ScreenListConversations: React.FC<Props> = ({
  conversationList,
  userData,
  navigation,
}) => {
  const handleOnNavigateToConversation = (params: {
    conversationId: number;
    recipient: Partial<Objects.User>;
  }) => {
    let conversationScreen = '';

    switch (userData.role) {
      case UserRoles.BUYER:
        conversationScreen = 'BuyerInitialScreen';
        break;

      case UserRoles.JUNKSHOP:
        conversationScreen = 'JunkShopInitialScreen';
        break;

      case UserRoles.SELLER:
        conversationScreen = 'SellerInitialScreen';
        break;
    }

    navigation.navigate(conversationScreen);
  };

  return (
    <Container>
      {!conversationList.length && (
        <EmptyListPlaceHolder icon="chatbubbles" message="No Messages" />
      )}

      {Boolean(conversationList.length) && (
        <FlatListConversations
          list={conversationList}
          me={userData}
          onNavigateToConversation={handleOnNavigateToConversation}
        />
      )}
    </Container>
  );
};
