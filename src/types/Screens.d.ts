declare module Screens {
  type LoggedOutStackParams = {
    SelectRoleScreen: undefined;
    SignInScreen: undefined;
    SignUpScreen: undefined;
  };

  // Buyer
  type BuyerStackParams = {
    BuyerInitialScreen: undefined;
    BuyerViewProductScreen: { id: number };
  };

  type BuyerInitialScreenTabs = {
    ProductsTabView: undefined;
    ShopsTabView: undefined;
    NotificationsScreen: undefined;
    ProfileTabView: undefined;
  };

  type BuyerNotificationScreenTabs = {
    NotificationsTabView: undefined;
    MessagesTabView: undefined;
  };

  // Seller
  type SellerStackParams = {
    SellerInitialScreen: undefined;
    SellerCreateProductScreen: undefined;
    SellerViewProductScreen: { id: number };
    SellerListOffersScreen: undefined;
  };

  type SellerInitialScreenTabs = {
    ProductsTabView: undefined;
    NotificationsScreen: undefined;
    ProfileTabView: undefined;
  };

  type SellerNotificationScreenTabs = {
    NotificationsTabView: undefined;
    MessagesTabView: undefined;
  };
}
