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
};