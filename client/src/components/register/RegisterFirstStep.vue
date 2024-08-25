<template>
  <div>
    <p class="text-caption text-grey-4">
      Agrega un correo electronico y nombre de usuario valido
    </p>
    <div class="q-mt-md">
      <q-input
        v-model.trim="email"
        label="Email"
        type="email"
        color="primary"
        label-color="primary"
        class="full-width q-mb-md border-primary rounded-borders"
        input-class="text-white"
        :rules="['email']"
        hide-bottom-space
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
  </div>
</template>
<script lang="ts" setup>
import { defineModel } from 'vue';

const email = defineModel('email', { required: true, type: String });
const username = defineModel('username', { required: true, type: String });
</script>
