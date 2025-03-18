<script setup lang="ts">
import type { Product } from '@/types/cart';

defineProps<{
  item: Product
}>();

const formatCurrency = (value: number): string => {
  return value.toLocaleString('es-CL', {
    style: 'currency',
    currency: 'CLP'
  });
};
</script>

<template>
  <div class="flex justify-between items-start p-4 border-b border-gray-200">
    <div class="flex-1">
      <h3 class="font-medium text-gray-900">{{ item.title }}</h3>
      <div class="flex gap-3 mt-1 text-sm text-gray-500">
        <span>{{ formatCurrency(item.price) }}</span>
        <span class="px-2 py-0.5 bg-gray-100 rounded-full">x{{ item.quantity }}</span>
      </div>
      <div v-if="item.discountPercentage > 0" class="mt-1 text-sm text-green-600">
        Descuento: {{ item.discountPercentage }}%
      </div>
    </div>
    <div class="text-right">
      <span class="text-xs text-gray-500">Total:</span>
      <div class="font-medium text-gray-900">{{ formatCurrency(item.total) }}</div>
    </div>
  </div>
</template>