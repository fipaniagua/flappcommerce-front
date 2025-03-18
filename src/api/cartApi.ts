import axios from 'axios';
import type { Cart, ShippingInfo } from '@/types/cart';

const API_URL = 'https://dummyjson.com';

export const cartApi = {
  async getRandomCart(): Promise<Cart> {
    const { data } = await axios.get(`${API_URL}/carts`);
    
    if (!data?.carts?.length) {
      throw new Error('No se encontraron carritos disponibles');
    }
    
    const randomIndex = Math.floor(Math.random() * data.carts.length);
    const cartId = data.carts[randomIndex].id;
    
    const { data: cartData } = await axios.get<Cart>(`${API_URL}/carts/${cartId}`);
    return cartData;
  },
  async getShippingQuote(cart: Cart): Promise<ShippingInfo> {
    // Simulación de cálculo de envío - en producción, esto llamaría a una API real
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const baseShipping = 10;
    const itemFactor = 0.5 * cart.totalProducts;
    const valueFactor = cart.total * 0.02;
    
    const shippingCost = Math.round((baseShipping + itemFactor + valueFactor) * 100) / 100;
    
    return {
      estimatedDelivery: '3-5 días hábiles',
      shippingCost,
      options: [
        { id: 1, name: 'Estándar', price: shippingCost },
        { id: 2, name: 'Express', price: Math.round(shippingCost * 1.5 * 100) / 100 }
      ]
    };
  }
}