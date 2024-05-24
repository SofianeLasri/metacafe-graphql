<script setup lang="ts">

import { gql } from "@apollo/client/core";
import client from './../../apolloClient';
import { onMounted } from "vue";

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

const CREATE_LIKE_MUTATION = gql`
mutation LikePost($likePostId: Int!) {
  likePost(postId: $likePostId) {
    code
  }
}
`;

function likePost(): void {
  let data = {
    likePostId: props.id
  };

  client.mutate({
    mutation: CREATE_LIKE_MUTATION,
    variables: data,
    context: {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    }
  });
}

const elementId: string = props.elementId ? props.elementId + props.id : `postCard${props.id}`;
const idButtonLike = elementId + "likeBtn";

onMounted(() => {
  const ButtonLike: HTMLElement = document.getElementById(idButtonLike)! as HTMLElement;

  ButtonLike.addEventListener("click", () => {
    likePost();
  });
})

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
        <button type="button" class="btn btn-link text-primary" :id="idButtonLike">
          <font-awesome-icon :icon="['fas', 'heart']" class="action-icon"/> 4
        </button>
      </div>
    </div>
  </div>
</template>