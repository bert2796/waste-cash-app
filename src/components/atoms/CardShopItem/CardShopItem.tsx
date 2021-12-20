import React from 'react';
import { Card, Avatar } from 'react-native-paper';

import { IUser } from '../../../types';

interface Props {
  shop: IUser;
}

export const CardShopItem: React.FC<Props> = ({ shop }) => {
  return (
    <Card>
      <Card.Title
        title={shop.junkShopName}
        subtitle={`@${shop.username}`}
        left={(props) => (
          <Avatar.Text
            {...props}
            label={`${shop.firstName[0]}${shop.lastName[0]}`}
          />
        )}
      />
    </Card>
  );
};
