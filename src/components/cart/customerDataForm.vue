<script setup lang="ts">
import { ref } from 'vue';
import type { CustomerData } from '@/types/cart';
import { Button } from '../ui/button';

const props = defineProps<{
  initialData?: CustomerData;
}>();

const emit = defineEmits<{
  (e: 'submit', data: CustomerData): void;
  (e: 'cancel'): void;
}>();

// Valores iniciales
const name = ref(props.initialData?.name || '');
const shipping_street = ref(props.initialData?.shipping_street || '');
const commune = ref(props.initialData?.commune || '');
const phone = ref(props.initialData?.phone || '');

// Lista de comunas (ejemplo)
const communes = [
  "Santiago",
  "Providencia",
  "Las Condes",
  "Vitacura",
  "Ñuñoa",
  "La Reina",
  "Maipú",
  "Sin Despacho" // Para probar el caso sin despacho
];

// Validación
const errors = ref<Record<string, string>>({});

const validateForm = (): boolean => {
  errors.value = {};
  
  if (!name.value.trim()) {
    errors.value.name = 'El nombre es obligatorio';
  }
  
  if (!shipping_street.value.trim()) {
    errors.value.shipping_street = 'La dirección es obligatoria';
  }
  
  if (!commune.value) {
    errors.value.commune = 'La comuna es obligatoria';
  }
  
  if (!phone.value.trim()) {
    errors.value.phone = 'El teléfono es obligatorio';
  } else if (!/^\+?[0-9]{8,12}$/.test(phone.value.trim())) {
    errors.value.phone = 'El formato del teléfono no es válido';
  }
  
  return Object.keys(errors.value).length === 0;
};

const handleSubmit = () => {
  if (validateForm()) {
    emit('submit', {
      name: name.value.trim(),
      shipping_street: shipping_street.value.trim(),
      commune: commune.value,
      phone: phone.value.trim()
    });
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <!-- Nombre -->
    <div>
      <label for="name" class="block text-sm font-medium text-gray-700">Nombre completo</label>
      <input
        type="text"
        id="name"
        v-model="name"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        :class="{'border-red-500': errors.name}"
      />
      <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
    </div>

    <!-- Dirección -->
    <div>
      <label for="shipping_street" class="block text-sm font-medium text-gray-700">Dirección</label>
      <input
        type="text"
        id="shipping_street"
        v-model="shipping_street"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        :class="{'border-red-500': errors.shipping_street}"
      />
      <p v-if="errors.shipping_street" class="mt-1 text-sm text-red-600">{{ errors.shipping_street }}</p>
    </div>

    <!-- Comuna -->
    <div>
      <label for="commune" class="block text-sm font-medium text-gray-700">Comuna</label>
      <select
        id="commune"
        v-model="commune"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        :class="{'border-red-500': errors.commune}"
      >
        <option value="" disabled>Seleccione una comuna</option>
        <option v-for="option in communes" :key="option" :value="option">{{ option }}</option>
      </select>
      <p v-if="errors.commune" class="mt-1 text-sm text-red-600">{{ errors.commune }}</p>
    </div>

    <!-- Teléfono -->
    <div>
      <label for="phone" class="block text-sm font-medium text-gray-700">Teléfono</label>
      <input
        type="tel"
        id="phone"
        v-model="phone"
        placeholder="+56912345678"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        :class="{'border-red-500': errors.phone}"
      />
      <p v-if="errors.phone" class="mt-1 text-sm text-red-600">{{ errors.phone }}</p>
    </div>

    <!-- Botones -->
    <div class="flex justify-end space-x-3 pt-4">
      <Button variant="outline" type="button" @click="emit('cancel')">
        Cancelar
      </Button>
      <Button type="submit">
        Guardar y continuar
      </Button>
    </div>
  </form>
</template>