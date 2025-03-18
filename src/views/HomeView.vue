<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '@/stores/cartStore';
import { Button } from '@/components/ui/button';

const cartStore = useCartStore();
const router = useRouter();

const generateRandomCart = async () => {
  try {
    await cartStore.fetchRandomCart();
  } catch (error) {
    console.error('Error al generar carrito:', error);
  }
};

const goToCheckout = () => {
  router.push({ name: 'checkout' });
};

// Limpia cualquier error al montar el componente
onMounted(() => {
  cartStore.resetError();
});
</script>

<template>
  <div class="max-w-xl mx-auto p-6">
    <header class="text-center mb-8">
      <h1 class="text-2xl font-bold text-gray-900 mb-2">Tienda E-Commerce</h1>
      <p class="text-gray-600">Bienvenido a nuestra tienda virtual</p>
    </header>
    
    <main class="bg-white rounded-lg shadow p-6">
      <div v-if="cartStore.error" class="mb-6 bg-red-50 p-4 rounded-md border border-red-100">
        <p class="text-red-800">{{ cartStore.error }}</p>
        <Button 
          class="mt-2" 
          size="sm" 
          variant="outline" 
          @click="cartStore.resetError()"
        >
          Cerrar
        </Button>
      </div>
      
      <div v-if="cartStore.hasCart" class="text-center">
        <h2 class="text-lg font-semibold mb-2">¡Carrito generado exitosamente!</h2>
        <p class="mb-6 text-gray-600">
          Tu carrito contiene {{ cartStore.cart?.totalProducts }} productos por un total de 
          {{ cartStore.cartTotal.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' }) }}
        </p>
        
        <Button @click="goToCheckout">
          Finalizar compra
        </Button>
      </div>
      
      <div v-else class="text-center">
        <h2 class="text-lg font-semibold mb-2">No tienes un carrito activo</h2>
        <p class="mb-6 text-gray-600">¡Genera un carrito aleatorio para comenzar a comprar!</p>
        
        <Button 
          :loading="cartStore.loadingCart" 
          @click="generateRandomCart"
        >
          Generar carrito
        </Button>
      </div>
    </main>
  </div>
</template>