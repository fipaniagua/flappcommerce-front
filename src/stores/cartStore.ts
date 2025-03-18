import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Cart, ShippingInfo, CustomerData } from '@/types/cart';
import { cartApi } from '@/api/cartApi';
import { flappCommerceBackend } from '@/api/flappCommerce';

export const useCartStore = defineStore('cart', () => {
  // Estado
  const cart = ref<Cart | null>(null);
  const loadingCart = ref(false);
  const loadingShipping = ref(false);
  const error = ref<string | null>(null);
  const shippingInfo = ref<ShippingInfo | null>(null);
  const customerData = ref<CustomerData | null>(null);

  // Getters
  const hasCart = computed(() => cart.value !== null);
  const cartItems = computed(() => cart.value?.products || []);
  const cartTotal = computed(() => cart.value?.total || 0);
  const cartTotalWithShipping = computed(() => {
    if (!shippingInfo.value || !shippingInfo.value.isAvailable || shippingInfo.value.price === null) {
      return cartTotal.value;
    }
    return cartTotal.value + shippingInfo.value.price;
  });
  const hasCustomerData = computed(() => customerData.value !== null);
  const isLoadingCart = computed(() => loadingCart.value);
  const isLoadingShipping = computed(() => loadingShipping.value);

  // Acciones
  async function fetchRandomCart() {
    loadingCart.value = true;
    error.value = null;
    try {
      cart.value = await cartApi.getRandomCart();
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Error al obtener el carrito';
      throw err;
    } finally {
      loadingCart.value = false;
    }
  }

  async function getShippingQuote() {
    if (!cart.value) {
      error.value = 'No hay carrito para cotizar despacho';
      return;
    }

    if (!customerData.value) {
      error.value = 'Se requieren datos de envío para cotizar';
      return;
    }

    loadingShipping.value = true;
    try {
      shippingInfo.value = await flappCommerceBackend.getShippingQuote(cart.value, customerData.value);
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Error al obtener cotización de despacho';
      throw err;
    } finally {
      loadingShipping.value = false;
    }
  }

  function setCustomerData(data: CustomerData) {
    customerData.value = data;
  }

  function clearCart() {
    cart.value = null;
    shippingInfo.value = null;
    customerData.value = null;
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
    loadingCart,
    loadingShipping,
    error,
    shippingInfo,
    customerData,
    
    // Getters
    hasCart,
    cartItems,
    cartTotal,
    cartTotalWithShipping,
    hasCustomerData,
    isLoadingCart,
    isLoadingShipping,
    
    // Acciones
    fetchRandomCart,
    getShippingQuote,
    setCustomerData,
    clearCart,
    resetShippingInfo,
    resetError
  };
});