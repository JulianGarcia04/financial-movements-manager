<template>
  <q-form class="column items-center" @submit="handlerOnSubmit">
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
    <q-btn
      type="submit"
      label="Entrar"
      color="primary"
      text-color="white"
      class="q-mt-md full-width"
      no-caps
    />
  </q-form>
</template>
<script lang="ts" setup>
import { useQuasar } from 'quasar';
import { ref } from 'vue';

import { api } from 'src/boot/axios';
import {
  LoginFirstStepByEmailResponseSchema,
  LoginFirstStepDecodeTokenResponseSchema,
} from './models';

const $q = useQuasar();

const $emit = defineEmits(['onSignInByEmail']);

const email = ref('');

const handlerOnSubmit = async () => {
  try {
    $q.loading.show({
      message: 'Por favor espera un momento',
    });

    const request = await api.post('auth/login', { email: email.value });

    const { token, authStatus } = LoginFirstStepByEmailResponseSchema.parse(
      request.data
    );

    const decodeToken = await api.get(`token/decode/${token}`);

    const { phone, _id } = LoginFirstStepDecodeTokenResponseSchema.parse(
      decodeToken.data
    );

    const opt = {
      token,
      authStatus,
      userData: {
        phone,
        _id,
      },
    };

    $emit('onSignInByEmail', opt);
  } catch (error) {
    console.error(error);
    $q.notify({
      message: 'Error al intentar iniciar sesión. Por favor intentar más tarde',
      color: 'negative',
    });
  } finally {
    $q.loading.hide();
  }
};
</script>
