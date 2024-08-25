<template>
  <div>
    <p class="text-caption text-grey-4">
      Agrega tu fecha de nacimiento para validar que eres mayor de edad
    </p>
    <div class="row full-width">
      <div class="full-width">
        <q-input
          filled
          v-model="birthdate"
          mask="date"
          :rules="['date']"
          input-class="text-white"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer" color="white">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="birthdate" :options="dateOpts">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { date } from 'quasar';

const birthdate = defineModel('date', {
  required: true,
  set(val: string) {
    return new Date(val).getTime();
  },
  get(v) {
    return date.formatDate(v, 'YYYY/MM/DD');
  },
});

const dateOpts = (d: string) => {
  return new Date(d) <= new Date();
};
</script>
