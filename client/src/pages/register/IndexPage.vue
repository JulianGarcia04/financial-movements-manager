<template>
  <q-page class="row justify-center fullscreen bg-secondary" padding>
    <div class="column full-height col-12 col-md-4">
      <div class="column justify-center items-center col-6 full-width">
        <img
          src="/NBank.svg"
          :style="{ height: '100px', width: '100px' }"
        />
        <span class="text-h3 text-white q-mt-sm logo-font">NBank</span>
      </div>
      <div class="col-5 full-width q-px-xl q-my-sm">
        <q-form @submit="handlerOnSubmitCreateUser">
          <register-first-step
            v-if="step === 1"
            v-model:email="newUser.email"
            v-model:username="newUser.username"
          />
          <register-second-step
            v-else-if="step === 2"
            v-model:phone="newUser.phone"
          />
          <register-three-step
            v-else-if="step === 3"
            v-model:date="newUser.birthdate"
          />
          <q-btn
            v-if="step <= 2"
            type="button"
            label="Siguiente"
            color="primary"
            text-color="white"
            class="q-mt-md full-width"
            no-caps
            @click="step += 1"
          />
          <q-btn
            v-else
            type="submit"
            label="Crear"
            color="primary"
            text-color="white"
            class="q-mt-md full-width"
            no-caps
          />
          <q-btn
            v-if="step > 1"
            type="button"
            label="Atras"
            color="white"
            text-color="black"
            class="q-mt-md full-width"
            no-caps
            @click="step -= 1"
          />
        </q-form>
        <div class="row justify-center">
          <q-btn
            label="¿ Ya tienes cuenta ?"
            class="q-my-sm"
            to="/"
            text-color="primary"
            outline
            dense
            flat
            no-caps
            unelevated
          />
        </div>
      </div>
    </div>
  </q-page>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { ref } from 'vue';

import { CreateUser, CreateUserSchema } from 'src/models/User';
import { api } from 'src/boot/axios';

import RegisterFirstStep from 'src/components/register/RegisterFirstStep.vue';
import RegisterSecondStep from 'src/components/register/RegisterSecondStep.vue';
import RegisterThreeStep from 'src/components/register/RegisterThreeStep.vue';

const $q = useQuasar();
const $router = useRouter();

const newUser = ref<CreateUser>({
  username: '',
  phone: '',
  email: '',
  birthdate: Date.now(),
});

const step = ref<number>(1);

const handlerOnSubmitCreateUser = async () => {
  try {
    $q.loading.show();

    const payload = CreateUserSchema.parse(newUser.value);

    await api.post('users/create', payload);

    $q.notify({
      message: 'Usuario creado correctamente',
      color: 'positive',
    });

    $router.push('/');
  } catch (error) {
    console.error(error);
    $q.notify({
      message: 'Error al crear un nuevo usuario. Por favor ponerse en contacto',
      color: 'negative',
    });
  } finally {
    $q.loading.hide();
  }
};

// watch(newUser, (val) => {
//   console.log(val)
// }, {
//   deep: true
// })
</script>
