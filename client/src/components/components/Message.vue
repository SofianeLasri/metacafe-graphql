<script setup lang="ts">
import {computed} from "vue";
import {Attachment, Sender} from "~@/types.ts";

const props = defineProps<{
  timestamp: number;
  text: string | null;
  attachments: Array<Attachment> | null;
  sender: Sender;
}>();

const formattedTimestamp = computed(() => {
  const date = new Date(Number(props.timestamp));
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${hours}:${minutes}`;
});
</script>

<template>
  <div class="message" :class="sender">
    <div class="meta">
      <div class="datetime">
        {{ formattedTimestamp }}
      </div>
    </div>
    <div class="text" v-if="props.text">
      <p>{{ text }}</p>
    </div>
    <div class="attachments" v-if="props.attachments">
      <div class="attachment" v-for="attachment in props.attachments" :key="attachment.id">
        <img :src="attachment.url" :alt="attachment.name">
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>