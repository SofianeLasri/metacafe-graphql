<script setup lang="ts">
const props = defineProps<{
  id: number;
  username: string;
  avatar: string;
  status: string;
  actionText?: string;
  actionLink?: string;
}>();

</script>

<template>
  <div :id="`profile-card-${props.id}`" class="profile-card">
    <div class="profile-picture" :style="{'background-image': `url(${props.avatar})`}"></div>
    <div class="profile-meta">
      <div class="profile-name">
        {{ props.username }}
      </div>
      <div class="profile-action">
        <div v-if="props.actionText">
          <router-link :to="props.actionLink">{{ props.actionText }}</router-link>
        </div>
        <div v-else>
          {{ props.status }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
