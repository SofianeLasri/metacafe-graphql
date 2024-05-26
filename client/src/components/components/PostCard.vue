<script setup lang="ts">

import {gql} from "@apollo/client/core";
import client from './../../apolloClient';
import {onMounted} from "vue";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faHeart as fasHeart, faMicrophone, faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {faComment, faHeart as farHeart} from '@fortawesome/free-regular-svg-icons';

library.add(faMicrophone, fasHeart, farHeart, faComment, faPaperPlane);

const props = defineProps<{
  elementId?: string;
  id: number;
  avatar: string;
  username: string;
  title: string;
  text: string;
  actionText?: string;
  actionLink?: string;
  timestamp?: number;
  likes?: number;
  comments?: number;
  footerType: 'like' | 'comment' | 'none';
}>();

const emit = defineEmits<{
  (e: 'hasSubmittedComment', postId: number): void
  (e: 'showComments', postId: number): void
}>();

const CREATE_LIKE_MUTATION = gql`
mutation LikePost($likePostId: Int!) {
  likePost(postId: $likePostId) {
    code
  }
}
`;

const CREATE_COMMENT_MUTATION = gql`
mutation CommentPost($postId: Int!, $body: String!) {
  commentPost(postId: $postId, body: $body) {
    id
    user {
      id
    }
    post {
      id
    }
    body
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

async function commentPost(body: string): Promise<number> {
  let data = {
    postId: props.id,
    body: body
  };

  let result = await client.mutate({
    mutation: CREATE_COMMENT_MUTATION,
    variables: data,
    context: {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    }
  });

  return result.data.commentPost.id;
}

function formatTimestamp(timestamp: number): string {
  const daysOfWeek = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

  const now = new Date();
  const date = new Date(timestamp * 1000);

  const diffSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);

  const hoursSinceMidnight = (now.getHours());

  const diffDays = Math.floor(diffHours / hoursSinceMidnight);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}H${minutes}`;
  };

  if (diffDays === 0) {
    return `Aujd à ${formatTime(date)}`;
  } else if (diffDays === 1) {
    return `Hier à ${formatTime(date)}`;
  } else if (diffDays < 7 && date.getDay() >= now.getDay() - (now.getDay() + 1)) {
    return `${daysOfWeek[date.getDay()]} à ${formatTime(date)}`;
  } else if (diffDays < 7) {
    return `Il y a ${diffDays} jours`;
  } else if (diffWeeks < 4) {
    return `Il y a ${diffWeeks} semaines`;
  } else if (diffMonths < 12) {
    return `Il y a ${diffMonths} mois`;
  } else {
    return `Il y a ${diffYears} ans`;
  }
}

const elementId: string = props.elementId ? props.elementId + props.id : `postCard${props.id}`;
const idButtonLike = elementId + "likeBtn";
const idButtonComment = elementId + "commentBtn";
const pickEmojiBtnId = elementId + "PickEmojiBtn";
const commentInputId = elementId + "CommentInput";
const sendCommentBtnId = elementId + "SendCommentBtn";

const date = props.timestamp ? formatTimestamp(props.timestamp) : "";

onMounted(() => {
  if (props.footerType === 'comment') {
    const sendCommentButton: HTMLElement = document.getElementById(sendCommentBtnId)! as HTMLElement;
    const commentInput: HTMLInputElement = document.getElementById(commentInputId)! as HTMLInputElement;

    sendCommentButton.addEventListener("click", async () => {
      await commentPost(commentInput.value);
      emit('hasSubmittedComment', props.id);
    });
  }

  if (props.footerType === 'like') {
    const buttonLike: HTMLElement = document.getElementById(idButtonLike)! as HTMLElement;
    const buttonComment: HTMLElement = document.getElementById(idButtonComment)! as HTMLElement;

    buttonLike.addEventListener("click", () => {
      likePost();
    });

    buttonComment.addEventListener("click", () => {
      emit('showComments', props.id);
    });
  }



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
    <div class="lower-part" v-if="props.footerType === 'like'">
      <div class="small text-muted">
        {{ date }}
      </div>
      <div class="d-flex">
        <button type="button" class="btn btn-link text-muted" :id="idButtonComment">
          <font-awesome-icon :icon="['far', 'comment']" class="action-icon"/>
          {{ props.comments }}
        </button>
        <button type="button" class="btn btn-link text-primary" :id="idButtonLike">
          <font-awesome-icon :icon="['far', 'heart']" class="action-icon"/>
          {{ props.likes }}
        </button>
      </div>
    </div>
    <div class="lower-part d-flex gap-2" v-else-if="props.footerType === 'comment'">
      <button :id="pickEmojiBtnId" type="button" class="btn btn-link text-muted">
        <font-awesome-icon :icon="['fas', 'face-smile']"/>
      </button>
      <input :id="commentInputId" type="text" class="form-control" placeholder="Commenter..."/>
      <button :id="sendCommentBtnId" class="btn btn-primary">
        <font-awesome-icon :icon="['fas', 'paper-plane']" />
      </button>
    </div>
  </div>
</template>