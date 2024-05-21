<script setup lang="ts">

const props = defineProps<{
    elementId?: string;
    id: number;
    avatar: string;
    username: string;
    title: string;
    text: string;
    actionText?: string;
    actionLink?: string;
    timestamp?: string;
}>();

const elementId: string = props.elementId ? props.elementId + props.id : `postCard${props.id}`;

</script>

<template>
  <div :id="elementId" class="post-card">
    <div class="upper-part">
      <div class="author">
        <div class="profile-picture"
             :style="{ 'background-image': `url(${props.avatar})` }"></div>
        <div class="user-name">
          {{ props.username }}
        </div>
      </div>
      <p class="mt-2">
        {{ props.text }}
      </p>
    </div>
    <div class="lower-part">
      <div class="small text-muted">
        aujd à 11H31
      </div>
      <div class="d-flex">
        <button type="button" class="btn btn-link text-muted" id="commentBtn">
          <font-awesome-icon :icon="['far', 'comment']" class="action-icon"/> 6
        </button>
        <button type="button" class="btn btn-link text-primary" id="likeBtn">
          <font-awesome-icon :icon="['fas', 'heart']" class="action-icon"/> 4
        </button>
      </div>
    </div>
  </div>
</template>