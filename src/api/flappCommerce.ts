import axios from 'axios';
import type { Cart, ShippingInfo, CustomerData } from '@/types/cart';

const API_URL = 'http://localhost:3000';

interface ShippingQuoteRequest {
  products: {
    productId: string;
    price: number;
    quantity: number;
    discount: number;
  }[];
  customer_data: CustomerData;
}

interface ShippingQuoteResponse {
  courier: string;
  price: number;
}

export const flappCommerceBackend = {
  async getShippingQuote(cart: Cart, customerData: CustomerData): Promise<ShippingInfo> {
    try {
      const requestData: ShippingQuoteRequest = {
        products: cart.products.map(product => ({
          productId: product.id.toString(),
          price: product.price,
          quantity: product.quantity,
          discount: calculateDiscountAmount(product.price, product.discountPercentage)
        })),
        customer_data: customerData
      };

      const response = await axios.post<ShippingQuoteResponse>(
        `${API_URL}/api/cart`, 
        requestData
      );

      return {
        courier: response.data.courier,
        price: response.data.price,
        isAvailable: true
      };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        return {
          courier: null,
          price: null,
          isAvailable: false,
          message: error.response.data.message || 'No hay servicio de envío disponible.'
        };
      }
      
      throw error;
    }
  },

};

function calculateDiscountAmount(price: number, discountPercentage: number): number {
  return price * (discountPercentage / 100);
}