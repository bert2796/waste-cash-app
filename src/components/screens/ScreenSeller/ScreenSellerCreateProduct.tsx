import { NavigationProp } from '@react-navigation/native';
import React from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';

import { Container } from '@/atoms/index';
import { DialogSuccess, FormCreateProduct } from '@/molecules/index';
import { ScreenLoading } from '@/screens/ScreenLoading';

interface Props {
  categoryList: Objects.Category[];
  isCategoryLoading: boolean;
  isProductLoading: boolean;
  success: string;
  createProduct: (
    params: Partial<Omit<Objects.Product, 'category'>> & {
      category: string;
      photo: any;
    },
  ) => void;
  getCategories: () => void;
  setProductSuccess: (success: string) => void;
  navigation: NavigationProp<Screens.SellerStackParams>;
}

export const ScreenSellerCreateProduct: React.FC<Props> = ({
  categoryList,
  isCategoryLoading,
  isProductLoading,
  success,
  createProduct,
  getCategories,
  setProductSuccess,
  navigation,
}) => {
  const [isDialogVisible, setIsDialogVisible] = React.useState(false);

  const handleDialogVisibility = React.useCallback(() => {
    if (isDialogVisible) {
      setProductSuccess('');
    }

    setIsDialogVisible(!isDialogVisible);
  }, [isDialogVisible, setProductSuccess, setIsDialogVisible]);

  const handleDismiss = () => {
    handleDialogVisibility();

    navigation.goBack();
  };

  React.useEffect(() => {
    getCategories();
  }, [getCategories]);

  // open dialog for successfull product creation
  React.useEffect(() => {
    if (success) {
      setIsDialogVisible(true);
    }
  }, [success]);

  const handleNavigateBack = () => {
    if (success) {
      handleDialogVisibility();
    }

    navigation.goBack();
  };

  return (
    <Container>
      <DialogSuccess
        isVisible={isDialogVisible}
        message={success}
        onDismissDialog={handleDismiss}
      />

      {isCategoryLoading && <ScreenLoading />}
      {!isCategoryLoading && Boolean(categoryList.length) && (
        <>
          <FlatList
            data={[{}]}
            renderItem={() => (
              <SafeAreaView style={styles.content}>
                <FormCreateProduct
                  categories={categoryList}
                  isLoading={isProductLoading}
                  onCancel={handleNavigateBack}
                  onSubmit={createProduct}
                />
              </SafeAreaView>
            )}
            style={styles.scrollContent}
          />
        </>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    margin: 20,
  },
  form: {
    flex: 1,
  },
  image: {
    marginTop: 80,
  },
  scrollContent: {
    flex: 1,
  },
  scrollContentContainer: {
    flexGrow: 1,
  },
});
