<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue';

const props = defineProps<{
  show: boolean;
  title?: string;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

// Lógica para manejar el cierre con Escape
const handleEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.show) {
    emit('close');
  }
};

// Lógica para bloquear el scroll del body cuando el modal está abierto
watch(() => props.show, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

onMounted(() => {
  document.addEventListener('keydown', handleEscape);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape);
  document.body.style.overflow = '';
});
</script>

<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <!-- Overlay de fondo -->
    <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity" @click="emit('close')"></div>

    <!-- Contenedor del modal -->
    <div class="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl transition-all sm:max-w-lg">
      <!-- Encabezado -->
      <div v-if="title" class="flex items-center justify-between pb-4 border-b">
        <h3 class="text-lg font-semibold leading-6 text-gray-900">{{ title }}</h3>
        <button 
          type="button" 
          class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none" 
          @click="emit('close')"
        >
          <span class="sr-only">Cerrar</span>
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Contenido -->
      <div class="mt-4">
        <slot></slot>
      </div>

      <!-- Acciones -->
      <div class="mt-6 flex justify-end gap-3">
        <slot name="actions"></slot>
      </div>
    </div>
  </div>
</template>