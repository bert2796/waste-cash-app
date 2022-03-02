declare module State {
  interface App {
    error: string;
    isInitialize: boolean;
    role?: string;
  }

  interface Category {
    error: string;
    isLoading: boolean;
    list: Objects.Category[];
  }

  interface Conversation {
    error: string;
    isLoading: boolean;
    data?: Objects.Conversation;
    list: Objects.ConversationSummary[];
  }

  interface Notification {
    error: string;
    isLoading: boolean;
    data?: Objects.Notification;
    list: Objects.Notification[];
  }

  interface Product {
    error: string;
    success: string;
    isLoading: boolean;
    data?: Objects.Product;
    list: Objects.Product[];
  }

  interface ProductOffer {
    error: string;
    success: string;
    isLoading: boolean;
  }

  interface Shop {
    error: string;
    isLoading: boolean;
    data?: Objects.User;
    list: Objects.User[];
  }

  interface User {
    error: string;
    isLoading: boolean;
    token: string;
    data?: Objects.User;
  }
}
