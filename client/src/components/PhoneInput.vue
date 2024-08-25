<template>
  <div class="row justify-between full-width">
    <q-select
      v-model="country"
      :options="flagsOptions"
      color="primary"
      label-color="primary"
      class="col-2 text-white"
      popup-content-style="width: 250px;"
      hide-dropdown-icon
      map-options
      outlined
      dense
    >
      <template #option="{ opt, itemProps }">
        <q-item v-bind="itemProps" clickable>
          <q-item-section avatar>
            <q-avatar rounded>
              <q-img :src="opt.icon"></q-img>
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label class="ellipsis">
              {{ opt.label }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </template>
      <template
        #selected-item="{ opt }: { opt: (typeof flagsOptions)['value'][0] }"
      >
        <q-avatar rounded size="xs">
          <q-img :src="opt.icon"></q-img>
        </q-avatar>
      </template>
    </q-select>
    <q-input
      v-model="rawPhone"
      type="tel"
      color="primary"
      label-color="primary"
      class="q-ml-sm col-9"
      :prefix="country?.value"
      input-class="text-white"
      :disable="!country"
      :rules="[
        (value) =>
          !Number.isNaN(Number(value)) || 'Solo puedes ingresar números',
        (value) =>
          parsePhoneNumber(value, country?.code)?.isValid() ||
          'Número invalido',
      ]"
      outlined
      hide-bottom-space
      dense
    >
    </q-input>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import parsePhoneNumber, { CountryCode } from 'libphonenumber-js';

import contries from 'src/assets/countries.json';

const $emit = defineEmits(['update:modelValue']);

defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});

const country = ref<(typeof flagsOptions)['value'][0] | undefined>();

const rawPhone = ref('');

const flagsOptions = computed(() => {
  return contries.map((country) => {
    return {
      label: country.name,
      icon: `/country-flags/${country.code.toLocaleLowerCase()}.png`,
      value: country.prefix,
      code: country.code as CountryCode,
    };
  });
});

const procesedPhone = computed({
  get(): string {
    if (!country.value) {
      return '';
    }
    return String(
      parsePhoneNumber(rawPhone.value, country.value?.code)?.number
    );
  },
  set(newVal: string) {
    rawPhone.value = newVal;
  },
});

watch(procesedPhone, (newVal) => {
  $emit('update:modelValue', newVal);
});
</script>
<style lang="scss">
.q-field > .q-field__inner > .q-field__control {
  border: 1px solid $primary;
}

.q-field
  > .q-field__inner
  > .q-field__control
  > .q-field__control-container
  > .q-field__prefix {
  color: white;
}
</style>
