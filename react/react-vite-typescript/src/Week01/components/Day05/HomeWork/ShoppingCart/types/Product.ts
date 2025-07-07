export interface Product {
  id: number;
  name: string;
  price: number;
}

export type CartItem = Product & {
  quantity: number;
};
