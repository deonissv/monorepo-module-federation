<script setup lang="ts">
import './app.css'

import { defineAsyncComponent } from 'vue';
import Loading from './Loading.vue';
import { useInitialData } from '../useInitialData';

const App1 = defineAsyncComponent({
  loader: () => import('app1/App'),
  loadingComponent: Loading,
});

const ctx = useInitialData();
const titles = ctx.titles || [];

</script>

<template>
  <div class="header">
    <div v-for="title in titles" class="header-item header-item-1">
      <h3>{{ title }}</h3>
    </div>
  </div>
  <div>
    <App1 />
  </div>
</template>
