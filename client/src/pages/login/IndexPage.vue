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
        <login-second-step
          v-if="currentId && currentPhone && currentToken"
          :phone="currentPhone"
          :token="currentToken"
        />
        <login-first-step v-else @on-sign-in-by-email="handlerOnSignIn" />
      </div>
    </div>
  </q-page>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

import { OnSignInByEmailEventHandler } from 'src/components/login/models';

import LoginSecondStep from 'src/components/login/LoginSecondStep.vue';
import LoginFirstStep from 'src/components/login/LoginFirstStep.vue';

const currentPhone = ref<string | undefined>();
const currentId = ref<string | undefined>();
const currentToken = ref<string | undefined>();

const handlerOnSignIn = (opt: OnSignInByEmailEventHandler) => {
  currentPhone.value = opt.userData.phone;
  currentId.value = opt.userData._id;
  currentToken.value = opt.token;
};
</script>
