<script setup lang="ts">
import type { Cart, ShippingInfo } from '@/types/cart';

defineProps<{
  cart: Cart;
  shippingInfo: ShippingInfo | null;
}>();

const formatCurrency = (value: number): string => {
  return value.toLocaleString('es-CL', {
    style: 'currency',
    currency: 'CLP'
  });
};

// Calcula el total con envío (si existe)
const totalWithShipping = (cart: Cart, shippingInfo: ShippingInfo | null): number => {
  return cart.total + (shippingInfo?.shippingCost || 0);
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
      
      <div v-if="shippingInfo" class="flex justify-between">
        <span class="text-gray-600">Envío ({{ shippingInfo.estimatedDelivery }}):</span>
        <span>{{ formatCurrency(shippingInfo.shippingCost) }}</span>
      </div>
      
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