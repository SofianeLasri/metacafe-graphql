<script setup lang="ts">
const props = defineProps<{
  text: string;
  value: string;
}>();

</script>

<template>
  <div class="simple-result" :data-value="value" :data-text="text">
    {{ text }}
  </div>
</template>

<style scoped>

</style>