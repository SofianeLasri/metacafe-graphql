<script setup lang="ts">
import {userPublicProfile} from "~@/types.ts";
import {onMounted} from "vue";

const props = defineProps<{
  elementId?: string;
  id: number;
  username: string;
  avatar: string;
  status: string;
  actionText?: string;
  actionLink?: string;
}>();

const elementId: string = props.elementId ? props.elementId+props.id : `profileCard${props.id}`;

const emit = defineEmits<{
  (e: 'profileClicked', user: userPublicProfile): void
}>()

onMounted(() => {
  const profileCard: HTMLElement = document.getElementById(elementId)! as HTMLElement;

  profileCard.addEventListener("click", () => {
    emit("profileClicked", {
      id: props.id,
      name: props.username,
      status: props.status
    });
  });
});

</script>

<template>
  <div :id="elementId" class="profile-card">
    <div class="profile-picture" :style="{'background-image': `url(${props.avatar})`}"></div>
    <div class="profile-meta">
      <div class="profile-name">
        {{ props.username }}
      </div>
      <div class="profile-action">
        <div v-if="props.actionLink">
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
