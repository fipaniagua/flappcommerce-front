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
    estimatedDelivery: string;
    shippingCost: number;
    options: ShippingOption[];
  }
  
  export interface ShippingOption {
    id: number;
    name: string;
    price: number;
  }
  