import React from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { Chip, Colors, Paragraph, Subheading, Title } from 'react-native-paper';

import { formatPrice } from '@/utils/index';

interface Props {
  product: Objects.Product;
}

export const ProductContent: React.FC<Props> = ({ product }) => (
  <ScrollView
    contentContainerStyle={styles.scrollContentContainer}
    keyboardShouldPersistTaps="handled"
    style={styles.scrollContent}
  >
    <Image source={{ uri: product.thumbnail }} style={styles.imageCover} />
    <View style={styles.categoryContent}>
      <Chip
        mode="outlined"
        textStyle={styles.chipLabelStyle}
        onPress={() => {}}
      >
        {product.category.name}
      </Chip>
    </View>

    <View style={styles.productDetails}>
      <Title>{product.name}</Title>
      <Subheading>{formatPrice(product.price)}</Subheading>

      <View style={styles.description}>
        <Paragraph>{product.description}</Paragraph>
      </View>
    </View>

    <View style={styles.randomBlock} />
  </ScrollView>
);

const styles = StyleSheet.create({
  categoryContent: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
  chipLabelStyle: {
    color: Colors.green400,
  },
  description: {
    marginTop: 20,
  },
  imageCover: {
    height: 200,
    width: '100%',
  },
  productDetails: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 15,
  },
  randomBlock: {
    height: 60,
  },
  scrollContent: {
    flex: 1,
    marginBottom: 60,
  },
  scrollContentContainer: {
    flexGrow: 1,
  },
});
