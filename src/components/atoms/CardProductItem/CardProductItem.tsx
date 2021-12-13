import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Card,
  Chip,
  Title,
  Subheading,
  Paragraph,
  Colors,
} from 'react-native-paper';
import numeral from 'numeral';

import { IProduct } from '../../../types';

interface Props {
  product: IProduct;
}

export const CardProductItem: React.FC<Props> = ({ product }) => {
  return (
    <Card>
      <Card.Cover source={{ uri: product.thumbnail }} />
      <Card.Title
        title={product.name}
        subtitle={product.category.name}
        right={(props) => (
          <Subheading {...props}>
            {`\u20B1 ${numeral(product.price).format('0,0.00')}`}
          </Subheading>
        )}
        rightStyle={styles.price}
      />
      <Card.Content>
        {/*
        <View style={styles.heading}>
          <Title>{product.name}</Title>
          <Subheading>
            {`\u20B1 ${numeral(product.price).format('0,0.00')}`}
          </Subheading>
        </View> */}

        <Paragraph>{`${product.description.substring(0, 50)}${
          product.description.length >= 50 ? '...' : ''
        }`}</Paragraph>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  price: {
    marginRight: 15,
  },
});
