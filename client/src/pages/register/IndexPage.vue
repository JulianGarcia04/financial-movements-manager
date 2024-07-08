<template>
  <q-page class="row justify-center fullscreen bg-secondary" padding>
    <div class="column full-height col-12 col-md-4">
      <div class="column justify-center items-center col-6 full-width">
        <img
          src="src/assets/NBank.svg"
          :style="{ height: '100px', width: '100px' }"
        />
        <span class="text-h3 text-white q-mt-sm logo-font">NBank</span>
      </div>
      <div class="col-5 full-width q-px-xl q-my-sm">
        <q-form>
          <register-first-step
            v-if="step === 1"
            v-model:email="newUser.email"
            v-model:username="newUser.username"
          />
          <register-second-step v-else-if="step === 2" v-model:phone="newUser.phone"/>
          <register-three-step v-else-if="step === 3" v-model:date="newUser.birthdate"/>
          <q-btn
            type="button"
            label="Siguiente"
            color="primary"
            text-color="white"
            class="q-mt-md full-width"
            no-caps
            @click="step += 1"
          />
        </q-form>
      </div>
    </div>
  </q-page>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

import { CreateUser } from 'src/models/User'

import RegisterFirstStep from 'src/components/register/RegisterFirstStep.vue';
import RegisterSecondStep from 'src/components/register/RegisterSecondStep.vue';
import RegisterThreeStep from 'src/components/register/RegisterThreeStep.vue';

const newUser = ref<CreateUser>({
  username: '',
  phone: '',
  email: '',
  birthdate: new Date()
})

const step = ref<number>(1)

</script>
