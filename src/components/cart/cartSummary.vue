<script setup lang="ts">
import type { Cart, ShippingInfo } from '@/types/cart';
import { useCartStore } from '@/stores/cartStore';

defineProps<{
  cart: Cart;
  shippingInfo: ShippingInfo | null;
}>();

const cartStore = useCartStore();

const formatCurrency = (value: number): string => {
  return value.toLocaleString('es-CL', {
    style: 'currency',
    currency: 'CLP'
  });
};

// Calcula el total con envío (si existe y está disponible)
const totalWithShipping = (cart: Cart, shippingInfo: ShippingInfo | null): number => {
  return cart.total + ((shippingInfo?.isAvailable && shippingInfo?.price) || 0);
};
</script>

<template>
  <div class="bg-gray-50 p-5 rounded-lg">
    <h2 class="text-lg font-semibold mb-4 text-gray-900">Resumen de compra</h2>
    
    <div class="space-y-3">
      <div class="flex justify-between">
        <span class="text-gray-600">Subtotal:</span>
        <span>{{ formatCurrency(cart.total) }}</span>
      </div>
      
      <template v-if="cartStore.isLoadingShipping">
        <div class="py-4 flex justify-center items-center">
          <div class="inline-block h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
          <span class="ml-2 text-sm text-gray-600">Calculando envío...</span>
        </div>
      </template>
      
      <template v-else-if="shippingInfo">
        <div v-if="shippingInfo.isAvailable" class="space-y-2">
          <div class="flex justify-between">
            <span class="text-gray-600">Courier:</span>
            <span class="font-medium">{{ shippingInfo.courier }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Costo de envío:</span>
            <span>{{ formatCurrency(shippingInfo.price || 0) }}</span>
          </div>
        </div>
        <div v-else class="py-2 px-3 bg-red-50 text-red-700 rounded-md text-sm">
          <p>{{ shippingInfo.message || 'No hay servicio de envío disponible.' }}</p>
        </div>
      </template>
      
      <div class="border-t border-gray-200 pt-3 mt-3">
        <div class="flex justify-between font-semibold text-gray-900">
          <span>Total:</span>
          <span>{{ formatCurrency(totalWithShipping(cart, shippingInfo)) }}</span>
        </div>
      </div>
    </div>
    
    <div class="mt-5 space-y-3">
      <slot name="actions"></slot>
    </div>
  </div>
</template>