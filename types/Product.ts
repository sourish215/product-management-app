export interface Product {
  id?: string;
  name: string;
  price: number;
  quantity: number;
  total_amount: number;
  created_at?: string;
  updated_at?: string;
}

export interface ProductInput {
  name: string;
  price: number;
  quantity: number;
}
