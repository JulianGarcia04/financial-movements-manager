<template>
  <q-form
    class="column items-center full-width"
    @submit="handlerOnSubmitVerificationCode"
  >
    <p class="text-h5 text-white">Two Factor Authentication</p>
    <p class="text-caption text-grey-4">
      A tu número de teléfono {{ hidePhone }}, te enviamos un código de
      verificación de 6 dígitos. Por favor ingresar para verificar que eres tú
    </p>
    <div class="row justify-between full-width q-my-md">
      <q-input
        ref="inputs"
        v-for="currInput in 6"
        :key="currInput"
        :model-value="numbersArr[currInput - 1]"
        class="col-1 q-pa-none border-primary rounded-borders"
        color="primary"
        input-class="text-white"
        type="number"
        :rules="[(val) => typeof val === 'number' || 'Valor incorrecto']"
        outlined
        dense
        @update:model-value="
          (val) => handlerOnChangeInput(String(val), currInput - 1)
        "
      />
    </div>
    <q-btn
      type="submit"
      label="Verificar"
      color="primary"
      text-color="white"
      class="full-width q-mt-md"
      no-caps
    />
  </q-form>
</template>
<script lang="ts" setup>
import { QInput, useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { computed, ref } from 'vue';

import { LoginSecondStepVerifyCodeResponseSchema } from './models';
import { api } from 'src/boot/axios';

const $q = useQuasar();

const $router = useRouter();

const inputs = ref<QInput[]>([]);

const props = defineProps({
  phone: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

const numbersArr = ref<number[]>([]);

const hidePhone = computed(() => {
  const phoneStart = props.phone.substring(0, props.phone.length - 4);
  return props.phone.replace(phoneStart, '*'.repeat(phoneStart.length));
});

const handlerOnChangeInput = (value: string, currInputIdx: number) => {
  if (value.length >= 2) {
    numbersArr.value.splice(currInputIdx, 1, Number(String(value).at(-1)));
    inputs.value[currInputIdx].blur();
    return;
  }

  if (numbersArr.value.length === 6) {
    return;
  }

  numbersArr.value.push(Number(value));

  if (currInputIdx === inputs.value?.length - 1 || String(value).length > 1) {
    inputs.value[currInputIdx].blur();
    return;
  }

  inputs.value?.[currInputIdx + 1].focus();
};

const handlerOnSubmitVerificationCode = async () => {
  try {
    $q.loading.show();

    const code = numbersArr.value.join('');

    const verifyCode = await api.post('auth/login/verify', {
      code,
      token: props.token,
    });

    const { authToken } = LoginSecondStepVerifyCodeResponseSchema.parse(
      verifyCode.data
    );

    $q.cookies.set('auth', authToken);

    await $router.push('/home');
  } catch (error) {
    console.error(error);
    $q.notify({
      message: 'Error al verificar tu identidad. Por favor intentar más tarde',
      color: 'negative',
    });
  } finally {
    $q.loading.hide();
  }
};
</script>
<style lang="scss">
.q-field > div > .q-field__control {
  padding: 0 8px;
}
</style>
