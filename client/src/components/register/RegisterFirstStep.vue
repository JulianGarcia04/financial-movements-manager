<template>
  <div>
    <q-input
      v-model.trim="email"
      label="Email"
      type="email"
      color="primary"
      label-color="primary"
      class="full-width q-mb-md border-primary rounded-borders"
      input-class="text-white"
      outlined
      dense
    />
    <q-input
      v-model.trim="username"
      label="Nombre de usuario"
      color="primary"
      label-color="primary"
      class="full-width q-mb-md border-primary rounded-borders"
      input-class="text-white"
      outlined
      dense
    />
  </div>
</template>
<script lang="ts" setup>
import { defineModel } from 'vue';

const email = defineModel('email', {required: true, type: String})
const username = defineModel('username', {required: true, type: String})

</script>
