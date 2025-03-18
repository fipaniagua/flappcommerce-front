import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Cart, ShippingInfo } from '@/types/cart';
import { cartApi } from '@/api/cartApi';

export const useCartStore = defineStore('cart', () => {
  // Estado
  const cart = ref<Cart | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const shippingInfo = ref<ShippingInfo | null>(null);

  // Getters
  const hasCart = computed(() => cart.value !== null);
  const cartItems = computed(() => cart.value?.products || []);
  const cartTotal = computed(() => cart.value?.total || 0);
  const cartTotalWithShipping = computed(() => {
    return cartTotal.value + (shippingInfo.value?.shippingCost || 0);
  });

  // Acciones
  async function fetchRandomCart() {
    loading.value = true;
    error.value = null;
    try {
      cart.value = await cartApi.getRandomCart();
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Error al obtener el carrito';
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function getShippingQuote() {
    if (!cart.value) {
      error.value = 'No hay carrito para cotizar despacho';
      return;
    }

    loading.value = true;
    try {
      shippingInfo.value = await cartApi.getShippingQuote(cart.value);
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Error al obtener cotización de despacho';
      throw err;
    } finally {
      loading.value = false;
    }
  }

  function clearCart() {
    cart.value = null;
    shippingInfo.value = null;
  }

  function resetShippingInfo() {
    shippingInfo.value = null;
  }

  function resetError() {
    error.value = null;
  }

  return {
    // Estado
    cart,
    loading,
    error,
    shippingInfo,
    
    // Getters
    hasCart,
    cartItems,
    cartTotal,
    cartTotalWithShipping,
    
    // Acciones
    fetchRandomCart,
    getShippingQuote,
    clearCart,
    resetShippingInfo,
    resetError
  };
});