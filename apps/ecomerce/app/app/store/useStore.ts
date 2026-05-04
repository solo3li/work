import { create } from 'zustand';
import { gql } from 'graphql-request';
import { client } from '../api/client';

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  category?: Category;
};

export type Category = {
  id: number;
  name: string;
};

export type User = {
  id: number;
  username: string;
  role: string;
};

export type OrderItem = {
  productId: number;
  quantity: number;
  unitPrice: number;
  product?: Product;
};

export type Order = {
  id: number;
  orderDate: string;
  orderItems: OrderItem[];
};

export type CartItem = Product & { quantity: number };

type StoreState = {
  // Auth
  user: User | null;
  login: (username: string) => Promise<boolean>;
  register: (username: string, password: string) => Promise<boolean>;
  logout: () => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  cartTotal: number;

  // Data
  products: Product[];
  categories: Category[];
  orders: Order[];
  fetchProducts: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  fetchOrders: () => Promise<void>;
  createOrder: () => Promise<boolean>;
};

export const useStore = create<StoreState>((set, get) => ({
  user: null,
  login: async (username: string, password: string) => {
    try {
      const query = gql`
        query GetUser($username: String, $password: String) {
          users(where: { 
            username: { eq: $username },
            passwordHash: { eq: $password }
          }) {
            id
            username
            role
          }
        }
      `;
      const data: any = await client.request(query, { username, password });
      if (data.users && data.users.length > 0) {
        set({ user: data.users[0] });
        return true;
      }
      return false;
    } catch (e) {
      console.error(e);
      return false;
    }
  },
  register: async (username: string, password: string) => {
    try {
      const mutation = gql`
        mutation RegisterUser($username: String!, $password: String!) {
          registerUser(username: $username, password: $password) {
            id
            username
            role
          }
        }
      `;
      const data: any = await client.request(mutation, { username, password });
      if (data.registerUser) {
        set({ user: data.registerUser });
        return true;
      }
      return false;
    } catch (e) {
      console.error(e);
      return false;
    }
  },
  logout: () => set({ user: null, orders: [], cart: [], cartTotal: 0 }),

  cart: [],
  cartTotal: 0,
  addToCart: (product: Product) => set((state) => {
    const existing = state.cart.find((item) => item.id === product.id);
    let newCart;
    if (existing) {
      newCart = state.cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      newCart = [...state.cart, { ...product, quantity: 1 }];
    }
    const total = newCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return { cart: newCart, cartTotal: total };
  }),
  removeFromCart: (productId: number) => set((state) => {
    const newCart = state.cart.filter((item) => item.id !== productId);
    const total = newCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return { cart: newCart, cartTotal: total };
  }),
  clearCart: () => set({ cart: [], cartTotal: 0 }),

  products: [],
  categories: [],
  orders: [],

  fetchProducts: async () => {
    try {
      const query = gql`
        query GetProducts {
          products {
            id
            name
            description
            price
            categoryId
          }
        }
      `;
      const data: any = await client.request(query);
      set({ products: data.products });
    } catch (e) {
      console.error(e);
    }
  },

  fetchCategories: async () => {
    try {
      const query = gql`
        query GetCategories {
          categories {
            id
            name
          }
        }
      `;
      const data: any = await client.request(query);
      set({ categories: data.categories });
    } catch (e) {
      console.error(e);
    }
  },

  fetchOrders: async () => {
    try {
      const { user } = get();
      if (!user) return;
      const query = gql`
        query GetOrders($userId: Int) {
          orders(where: { userId: { eq: $userId } }) {
            id
            orderDate
            orderItems {
              productId
              quantity
              unitPrice
              product {
                name
              }
            }
          }
        }
      `;
      const data: any = await client.request(query, { userId: user.id });
      set({ orders: data.orders });
    } catch (e) {
      console.error(e);
    }
  },

  createOrder: async () => {
    try {
      const { user, cart, clearCart } = get();
      if (!user || cart.length === 0) return false;
      
      const items = cart.map(item => ({
        productId: item.id,
        quantity: item.quantity,
        unitPrice: item.price
      }));

      const mutation = gql`
        mutation CreateOrder($userId: Int!, $items: [OrderItemInput!]!) {
          createOrder(userId: $userId, items: $items) {
            id
            orderDate
          }
        }
      `;
      
      await client.request(mutation, { userId: user.id, items });
      clearCart();
      return true;
    } catch(e) {
      console.error(e);
      return false;
    }
  }
}));
