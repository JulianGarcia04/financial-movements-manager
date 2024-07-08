<template>
  <div>
    <p class="text-caption text-grey-4">Selecciona tu país y agrega un número de telefono valido</p>
    <div class="row full-width">
      <phone-input v-model="phone"/>
    </div>
  </div>
</template>
<script lang="ts" setup>
import PhoneInput from '../PhoneInput.vue';

const phone = defineModel('phone', {
  type: String,
  required: true
})

</script>
