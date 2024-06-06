<template>
  <q-page class="column fullscreen bg-secondary">
    <user-header />
    <section class="row justify-center full-width col-6">
      <div class="col-12 col-md-4 full-height relative-position">
        <q-img
          src="src/assets/Ellipse 1.svg"
          width="270px"
          class="absolute-top-left"
        />
        <q-img
          src="src/assets/Ellipse 3.svg"
          width="270px"
          class="absolute-top-right"
        />
        <q-img
          src="src/assets/Ellipse 2.svg"
          width="270px"
          style="position: absolute; bottom: 10%; left: 15%"
        >
          <div
            class="row items-center justify-center full-width full-height bg-transparent"
          >
            <div class="column items-center">
              <p class="text-black text-subtitle1">Saldo disponible</p>
              <span class="text-primary text-h6">${{ totalAmmount }}</span>
            </div>
          </div>
        </q-img>
      </div>
    </section>
    <section class="row justify-center full-width col-4 q-px-sm">
      <div class="column col-12 col-md-6 full-height">
        <span class="text-h6 text-white col-1">Movimientos</span>
        <q-scroll-area class="col-11">
          <q-list class="full-height">
            <q-item
              v-for="movement in movements"
              :key="movement._id"
              class="q-my-xs"
            >
              <q-item-section avatar>
                <q-avatar rounded class="border-primary rounded-borders">
                  <img src="src/assets/NBank.svg" width="10px" height="10px" />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-white text-body2 ellipsis">
                  {{ movement.description ?? 'Sin especificar' }}
                </q-item-label>
                <q-item-label class="text-grey-4" caption>
                  {{ formatDate(movement.createdAt) }}
                </q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-item-label class="text-primary text-subtitle1">
                  {{ movement.type === 'entry' ? '+' : '-' }}${{
                    movement.ammount
                  }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </div>
    </section>
    <q-page-sticky :offset="[16, 16]">
      <q-fab
        icon="o_attach_money"
        color="primary"
        text-color="white"
        direction="up"
        push
      >
        <q-fab-action
          external-label
          icon="currency_exchange"
          label-position="left"
          label="Sacar plata"
          color="primary"
          text-color="white"
          round
          @click="handlerOnClickOpenMovementHandlerDialog('egress')"
        />
        <q-fab-action
          external-label
          icon="o_savings"
          label-position="left"
          label="Recargar cuenta"
          label-class="bg-terciary"
          color="primary"
          text-color="white"
          round
          @click="handlerOnClickOpenMovementHandlerDialog('entry')"
        />
      </q-fab>
    </q-page-sticky>
  </q-page>
</template>
<script lang="ts" setup>
import { watchEffect, ref, computed } from 'vue';
import { useQuasar, date } from 'quasar';
import { z } from 'zod';

import { MovementSchema, Movement } from 'src/models/Movement';
import { useAuthStore } from 'src/stores/AuthStore';
import { api } from 'src/boot/axios';

import CreateMovementDialog from 'src/components/home/CreateMovementDialog.vue';
import UserHeader from 'src/components/home/UserHeader.vue';

const $q = useQuasar();

const authStore = useAuthStore();

const movements = ref<Movement[]>([]);

const totalAmmount = computed(() => {
  return movements.value.reduce((acc, el) => {
    if (el.type === 'egress') {
      return acc - el.ammount;
    }
    return acc + el.ammount;
  }, 0);
});

const formatDate = (d: Date) => {
  return date
    .formatDate(d, 'D - MMMM - YYYY', {
      months: [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
      ],
    })
    .replaceAll('-', 'de');
};

const getMovements = async () => {
  try {
    $q.loading.show();

    const getMovements = await api.get('movements/find', {
      params: {
        user_id: authStore.userId,
      },
    });

    const movementslist = z.array(MovementSchema).parse(getMovements.data);

    movements.value = movementslist;
  } catch (error) {
    console.error(error);
    $q.notify({
      message: 'Error al intentar obtener tus movimientos',
      color: 'negative',
    });
  } finally {
    $q.loading.hide();
  }
};

const handlerOnClickOpenMovementHandlerDialog = (type: Movement['type']) => {
  $q.dialog({
    component: CreateMovementDialog,
    componentProps: {
      movementType: type,
      totalAmmount: totalAmmount.value
    },
  })
  .onOk(async () => {
    await getMovements()
  })
};

watchEffect(async () => {
  await getMovements();
});
</script>
