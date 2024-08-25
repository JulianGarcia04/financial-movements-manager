<template>
  <div>
    <q-toolbar class="bg-transparent text-white q-my-md shadow-2">
      <q-btn
        outline
        dense
        icon="o_person"
        color="primary"
        class="q-mr-sm"
        @click.stop="isOpenMenu = !isOpenMenu"
      />
      <div>
        <span>Bienvenido</span>
        <br />
        <span>{{ fullname }}</span>
      </div>
    </q-toolbar>
    <q-menu v-model="isOpenMenu" class="full-width bg-primary">
      <q-list class="text-white">
        <q-item clickable @click="handlerSignOut">
          <q-item-section avatar>
            <q-icon name="o_logout"></q-icon>
          </q-item-section>
          <q-item-section>
            <q-item-label> Cerrar sesión </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue';

import { useAuthStore } from 'src/stores/AuthStore';
import { Cookies } from 'quasar';

const authStore = useAuthStore();

const isOpenMenu = ref(false);

const fullname = computed(() => {
  if (!authStore.currentUser?.firstname && !authStore.currentUser?.lastname) {
    return authStore.currentUser?.username;
  }
  return `${authStore.currentUser?.firstname} ${authStore.currentUser?.lastname}`;
});

const handlerSignOut = () => {
  authStore.setToken(undefined);
  authStore.setUserId(undefined);
  Cookies.remove('auth');
  window.location.reload();
};
</script>
