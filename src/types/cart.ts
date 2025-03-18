export interface Product {
    id: number;
    title: string;
    price: number;
    quantity: number;
    total: number;
    discountPercentage: number;
    discountedPrice: number;
  }
  
  export interface Cart {
    id: number;
    products: Product[];
    total: number;
    discountedTotal: number;
    userId: number;
    totalProducts: number;
    totalQuantity: number;
  }
  
  export interface ShippingInfo {
    price: number | null;
    courier: string | null;
    isAvailable: boolean;
    message?: string;
  }

  export interface CustomerData {
    name: string;
    shipping_street: string;
    commune: string;
    phone: string;
  }