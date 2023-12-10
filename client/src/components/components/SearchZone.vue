<script setup lang="ts">
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

defineProps<{
  placeholder: string;
}>();

library.add(faMagnifyingGlass);
</script>

<template>
  <div class="search-zone">
    <div class="search-bar">
      <div class="icon-prepend">
        <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
      </div>
      <input type="text" :placeholder="placeholder">
    </div>
  </div>
</template>

<style scoped>

</style>