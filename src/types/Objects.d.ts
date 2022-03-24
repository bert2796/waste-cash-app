declare module Objects {
  interface Credential {
    accessToken: string;
  }

  interface Category {
    id: number;
    name: string;
    slug: string;
  }

  interface Conversation {
    id: number;
    messages: Message[];
    createdAt: string;
    updatedAt: string;
  }

  interface ConversationSummary {
    id: number;
    message: Partial<Message>;
    sender: Partial<User>;
    recipient: Partial<User>;
  }

  interface Message {
    id: number;
    content: string;
    conversation?: Conversation;
    isSeen: boolean;
    sender: User;
    recipient: User;
    createdAt: string;
  }

  interface Notification {
    id: number;
    description: string;
    event: string;
    isSeen: boolean;
    from: User;
    to: User;
    product?: Product;
    createdAt: string;
  }

  interface Product {
    id: number;
    name: string;
    slug: string;
    category: Category;
    description: string;
    price: number;
    status: string;
    offers: ProductOffer[];
    owner: User;
    thumbnail: string;
  }

  interface ProductOffer {
    id: number;
    price: number;
    user: User;
    status?: string;
    product?: Product;
  }

  interface User {
    id: number;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    zip: string;
    phone: string;
    email: string;
    username: string;
    junkShopName?: string;
    role: string;
    password?: string;
  }

  // axios response objects
  interface ServiceError {
    data: {
      statusCode: number;
      message: string;
      error: string;
    };
    status: number;
  }

  interface GetProduct extends Product {}

  interface GetProducts extends Product {}

  interface Login extends Credential {}

  interface Me extends User {}

  interface Register extends Credential {}
}
