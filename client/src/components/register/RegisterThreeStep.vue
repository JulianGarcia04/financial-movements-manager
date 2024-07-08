<template>
  <div>
    <p class="text-caption text-grey-4">Agrega tu fecha de nacimiento para validar que eres mayor de edad</p>
    <div class="row full-width">
      <div class="q-pa-md" style="max-width: 300px">
        <q-input filled v-model="date" mask="date" :rules="['date']">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="date">
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

const date =  defineModel('date', {
  type: Date,
  required: true,
  set(val: string){
    return new Date(val)
  },
  get(v) {
      return v
  },
})

</script>
