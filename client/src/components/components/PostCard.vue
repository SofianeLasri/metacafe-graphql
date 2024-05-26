<script setup lang="ts">

import {gql} from "@apollo/client/core";
import client from './../../apolloClient';
import {onMounted} from "vue";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faMicrophone, faHeart as fasHeart} from "@fortawesome/free-solid-svg-icons";
import {faComment, faHeart as farHeart} from '@fortawesome/free-regular-svg-icons'

library.add(faMicrophone, fasHeart, farHeart, faComment);

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
const idHeartNotLiked = elementId + "heartNotLiked";
const idHeartLiked = elementId + "heartLiked";

const date = props.timestamp ? formatTimestamp(parseInt(props.timestamp)) : "";

onMounted(() => {
  const ButtonLike: HTMLElement = document.getElementById(idButtonLike)! as HTMLElement;

  const HeartNotLiked: HTMLElement = document.getElementById(idHeartNotLiked)! as HTMLElement;
  const HeartLiked: HTMLElement = document.getElementById(idHeartLiked)! as HTMLElement;
  HeartLiked.classList.add("d-none");

  ButtonLike.addEventListener("click", () => {
    likePost();

    if(HeartNotLiked.classList.contains("d-none")) {
      HeartNotLiked.classList.toggle("d-none");
      HeartLiked.classList.toggle("d-none");
    } else {
      HeartNotLiked.classList.toggle("d-none");
      HeartLiked.classList.toggle("d-none");
    }

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
        {{ date }}
      </div>
      <div class="d-flex">
        <button type="button" class="btn btn-link text-muted" id="commentBtn">
          <font-awesome-icon :icon="['far', 'comment']" class="action-icon"/>
          {{ props.comments }}
        </button>
        <button type="button" class="btn btn-link text-primary" :id="idButtonLike">
          <font-awesome-icon :id="idHeartNotLiked" :icon="['far', 'heart']" class="action-icon"/>
          <font-awesome-icon :id="idHeartLiked" :icon="['fas', 'heart']" class="action-icon"/>
          {{ props.likes }}
        </button>
      </div>
    </div>
  </div>
</template>