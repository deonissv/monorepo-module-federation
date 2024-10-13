<script setup lang="ts">

import { defineAsyncComponent } from 'vue';
import Loading from './Loading.vue';

const App1 = defineAsyncComponent({
    loader: () => import('app1/App'),
    loadingComponent:Loading, 

  }
)


</script>

<template>
  <div class="header">
    <div class="header-item header-item-1"><h3>Item 1</h3></div>
    <div class="header-item header-item-2"><h3>Item 2</h3></div>
    <div class="header-item header-item-3"><h3>Item 3</h3></div>
    <div class="header-item header-item-4"><h3>Item 4</h3></div>
  </div>
  <div>
    <App1 />
  </div>
</template>

<style scoped>
.header {
  display:  flex;
  flex-direction: row;
  width: 100%;
}

.header-item {
  width: 100%;
  text-align: center;
}


.header-item-1 {
  background-color: aqua;
}

.header-item-2 {
  background-color: bisque;
}

.header-item-3 {
  background-color: cadetblue ;
}

.header-item-4 {
  background-color: violet ;
}
</style>