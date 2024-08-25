<template>
  <q-dialog ref="dialogRef" position="bottom" :full-width="$q.screen.lt.sm">
    <q-card class="bg-secondary" style="height: 23em; width: 70%">
      <q-form @submit="handlerOnSubmitCreateNewMovement">
        <q-card-section>
          <q-field
            outlined
            v-model="newMovement.ammount"
            class="q-mb-sm"
            color="primary border-primary rounded-borders"
            label-color="primary"
            label="Valor del movimiento"
            :rules="[
              (val) =>
                movementType !== 'egress' ||
                val <= totalAmmount ||
                'El valor ingresado es mayor al monto total de tu cuenta',
            ]"
            @update:model-value="handlerUpdateModelValueAmmountInput"
          >
            <template
              v-slot:control="{ id, floatingLabel, modelValue, emitValue }"
            >
              <input
                :id="id"
                class="q-field__input text-right text-white"
                :value="modelValue"
                @input="e => emitValue((e?.target as CustomEvent)?.value)"
                v-money="moneyFormatForDirective"
                v-show="floatingLabel"
              />
            </template>
          </q-field>
          <q-input
            label="descripción"
            v-model="newMovement.description"
            type="textarea"
            color="primary border-primary rounded rounded-borders"
            label-color="primary"
            input-class="text-white"
            outlined
            dense
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            label="Registrar movimiento"
            color="primary"
            no-caps
            type="submit"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>
<script lang="ts" setup>
import { useDialogPluginComponent, useQuasar } from 'quasar';
import { Money3Directive, unformat } from 'v-money3';
import { defineProps, PropType, ref } from 'vue';

import { Movement, CreateMovementSchema } from 'src/models/Movement';
import { api } from 'src/boot/axios';

interface CustomEvent extends EventTarget {
  value: unknown;
}

defineEmits([...useDialogPluginComponent.emits]);

const { dialogRef, onDialogOK, onDialogCancel } = useDialogPluginComponent();

const vMoney = Money3Directive;

const moneyFormatForDirective = {
  decimal: '.',
  thousands: ',',
  prefix: '$ ',
  precision: 2,
  'disable-negative': true,
  modelModifiers: {
    number: true,
  },
  masked: true /* doesn't work with directive */,
};

const $q = useQuasar();

const props = defineProps({
  movementType: {
    type: String as PropType<Movement['type']>,
    required: true,
  },
  totalAmmount: {
    type: Number,
    required: true,
  },
});

const newMovement = ref<Partial<Movement>>({
  ammount: 0,
  description: '',
  type: props.movementType,
});

const handlerUpdateModelValueAmmountInput = (value: string) => {
  newMovement.value.ammount = Number(unformat(value, moneyFormatForDirective));
};

const handlerOnSubmitCreateNewMovement = async () => {
  try {
    $q.loading.show();

    const checkMovement = CreateMovementSchema.parse(newMovement.value);

    if (
      checkMovement.ammount > props.totalAmmount &&
      checkMovement.type === 'egress'
    ) {
      return;
    }

    await api.post('movements/create', checkMovement);

    $q.notify({
      message: 'El movimiento se creo correctamente',
      color: 'positive',
    });

    onDialogOK();
  } catch (error) {
    console.error(error);
    $q.notify({
      message: 'Error interno al intentar realizar el movimiento',
      color: 'negative',
    });
    onDialogCancel();
  } finally {
    $q.loading.hide();
  }
};
</script>
