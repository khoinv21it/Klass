import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
}

export interface ICartItem {
  product: IProduct;
  quantity: number;
}

export interface IShoppingCartStore {
  cartItems: ICartItem[];
  addToCart: (product: IProduct, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getCartItemsCount: () => number;
}

export const useShoppingCartStore = create<IShoppingCartStore>()(
  devtools(
    persist(
      (set, get) => ({
        cartItems: [],
        addToCart: (product, quantity) => {
          set((state) => {
            const existingItem = state.cartItems.find(
              (item) => item.product.id === product.id
            );
            if (existingItem) {
              // Tạo mảng mới, không mutate trực tiếp state
              return {
                cartItems: state.cartItems.map((item) =>
                  item.product.id === product.id
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
                ),
              };
            } else {
              return {
                cartItems: [...state.cartItems, { product, quantity }],
              };
            }
          });
        },
    
        removeFromCart: (productId) => {
          set((state) => ({
            cartItems: state.cartItems.filter(
              (item) => item.product.id !== productId
            ),
          }));
        },
        clearCart: () => set({ cartItems: [] }),
        getTotalPrice: () =>
          get().cartItems.reduce(
            (total, item) => total + item.product.price * item.quantity,
            0
          ),
        getCartItemsCount: () =>
          get().cartItems.reduce((count, item) => count + item.quantity, 0),
      }),
      {
        name: "shopping-cart-storage",
      }
    )
  )
);
