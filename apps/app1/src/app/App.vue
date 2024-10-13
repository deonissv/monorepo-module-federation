<script setup lang="ts">
import { isOdd } from '@libs/is-odd';

import { bar } from '@mono/bar';
import { foo } from '@mono/foo';

import { computed, ref } from 'vue';

const v = ref(1);

const subheader = computed(() => {
  return isOdd(v.value) ? foo() : bar();
});

</script>

<template>
  <div>
    <h1>App 1</h1>
    <h2>{{ subheader }}</h2>
    <input type="text" v-model="v" />
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse fermentum metus magna, id vehicula nisl ultrices et. Sed vitae metus 
      a nunc ultricies suscipit. Sed tempor sollicitudin orci sed scelerisque. Nam tempus bibendum ullamcorper. Morbi volutpat diam quis aliquam 
      malesuada. Suspendisse cursus faucibus varius. Morbi facilisis mi a gravida aliquet. Sed eget aliquam magna. Nunc a purus sit amet arcu 
      ornare posuere. Aenean ac accumsan mauris. Vivamus risus eros, hendrerit sed massa et, rutrum tristique neque. Nulla ut nulla ut quam 
      vehicula faucibus. Suspendisse dictum volutpat ipsum eu tristique. Suspendisse eu laoreet augue, eget maximus justo. Ut non dolor sit amet
      libero facilisis eleifend vel in elit. Nam malesuada tristique cursus.
   </p>
  </div>
</template>
