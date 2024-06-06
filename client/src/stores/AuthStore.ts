import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { User, UserSchema } from 'src/models/User';
import { ref, watchEffect } from 'vue';

export const useAuthStore = defineStore('authStore', () => {
  const token = ref<string | undefined>();
  const userId = ref<string | undefined>();
  const currentUser = ref<User | undefined>();

  const setToken = (payload: string | undefined) => {
    token.value = payload;
  };

  const setUserId = (payload: string | undefined) => {
    userId.value = payload;
  };

  watchEffect(async () => {
    if (userId.value == null || token.value == null) {
      return;
    }
    try {
      const getCurrentUser = await api.get(`users/${userId.value}`);

      currentUser.value = UserSchema.parse(getCurrentUser.data);
    } catch (error) {
      console.error(error);
    }
  });

  return {
    setToken,
    setUserId,
    token,
    userId,
    currentUser,
  };
});
