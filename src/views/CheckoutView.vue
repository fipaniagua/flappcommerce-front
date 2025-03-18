<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Button } from '@/components/ui/button';
import CartItem from '@/components/cart/cartItem.vue';
import CartSummary from '@/components/cart/cartSummary.vue';
import { useCartStore } from '../stores/cartStore';
import type { CustomerData } from '@/types/cart';
import CustomerDataForm from '@/components/cart/customerDataForm.vue';
import Modal from '@/components/ui/Modal.vue';

const cartStore = useCartStore();
const router = useRouter();
const showCustomerDataModal = ref(false);

const goBack = () => {
  router.push({ name: 'home' });
};

const openCustomerDataModal = () => {
  showCustomerDataModal.value = true;
};

const closeCustomerDataModal = () => {
  showCustomerDataModal.value = false;
};

const handleCustomerDataSubmit = (data: CustomerData) => {
  cartStore.setCustomerData(data);
  closeCustomerDataModal();
  getShippingQuote();
};

const getShippingQuote = async () => {
  if (!cartStore.hasCustomerData) {
    openCustomerDataModal();
    return;
  }

  try {
    await cartStore.getShippingQuote();
  } catch (error) {
    console.error('Error al obtener cotización de envío:', error);
  }
};

const clearCart = () => {
  cartStore.clearCart();
  router.push({ name: 'home' });
};
</script>

<template>
  <div class="max-w-4xl mx-auto p-6">
    <header class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Finalizar compra</h1>
      <Button variant="outline" @click="goBack">
        Volver
      </Button>
    </header>
    
    <div v-if="cartStore.cart" class="grid md:grid-cols-3 gap-6">
      <!-- Lista de productos -->
      <div class="md:col-span-2 bg-white rounded-lg shadow overflow-hidden">
        <div class="p-4 bg-gray-50 border-b">
          <h2 class="font-semibold text-gray-900">Productos en tu carrito</h2>
        </div>
        
        <div v-if="cartStore.isLoadingCart" class="flex justify-center items-center py-12">
          <div class="inline-block h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
          <span class="ml-2 text-gray-600">Cargando productos...</span>
        </div>
        
        <div v-else>
          <CartItem 
            v-for="product in cartStore.cartItems" 
            :key="product.id" 
            :item="product"
          />
        </div>
        
        <!-- Datos del cliente (si existen) -->
        <div v-if="cartStore.customerData" class="p-4 bg-gray-50 border-t">
          <h3 class="font-semibold text-gray-900 mb-2">Datos de envío</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div>
              <span class="text-gray-600">Nombre:</span>
              <span class="ml-2 font-medium">{{ cartStore.customerData.name }}</span>
            </div>
            <div>
              <span class="text-gray-600">Teléfono:</span>
              <span class="ml-2">{{ cartStore.customerData.phone }}</span>
            </div>
            <div>
              <span class="text-gray-600">Dirección:</span>
              <span class="ml-2">{{ cartStore.customerData.shipping_street }}</span>
            </div>
            <div>
              <span class="text-gray-600">Comuna:</span>
              <span class="ml-2">{{ cartStore.customerData.commune }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Resumen del carrito -->
      <div class="md:col-span-1">
        <CartSummary 
          :cart="cartStore.cart" 
          :shipping-info="cartStore.shippingInfo"
        >
          <template #actions>
            <Button 
              class="w-full" 
              :loading="cartStore.isLoadingShipping" 
              @click="getShippingQuote"
            >
              {{ cartStore.hasCustomerData ? 'Recotizar despacho' : 'Cotizar despacho' }}
            </Button>
            
            <Button 
              class="w-full" 
              variant="outline" 
              @click="clearCart"
            >
              Limpiar carrito
            </Button>
          </template>
        </CartSummary>
        
        <div v-if="cartStore.error" class="mt-4 bg-red-50 p-4 rounded-md border border-red-100">
          <p class="text-red-800 text-sm">{{ cartStore.error }}</p>
        </div>
      </div>
    </div>
    
    <!-- Modal para datos del cliente -->
    <Modal :show="showCustomerDataModal" title="Ingresa tus datos de envío" @close="closeCustomerDataModal">
      <CustomerDataForm 
        :initial-data="cartStore.customerData || undefined" 
        @submit="handleCustomerDataSubmit" 
        @cancel="closeCustomerDataModal"
      />
    </Modal>
  </div>
</template>