<script setup lang="ts">
import { library } from '@fortawesome/fontawesome-svg-core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

library.add(faXmark);

defineProps<{
  id: string;
  text: string;
}>();
</script>

<template>
  <div :id="id" class="interactive-badge badge rounded-pill bg-primary d-inline-flex align-items-center gap-2">
    <div class="text">
      {{ text }}
    </div>
    <button type="button" class="btn-close" aria-label="Close">
      <font-awesome-icon :icon="['fas', 'xmark']" />
    </button>
  </div>
</template>

<style scoped>

</style>