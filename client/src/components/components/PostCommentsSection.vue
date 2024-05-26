<script setup lang="ts">
import defaultProfilePic from "~@/assets/images/square-logo-with-background.avif?url";
import PostCard from "~@/components/components/PostCard.vue";
import {FeedType, Post, User} from "~@/types.ts";
import eventBus from "~@/eventBus.ts";
import client from "~@/apolloClient.ts";
import {ref} from "vue";
import {gql} from "@apollo/client/core";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {library} from "@fortawesome/fontawesome-svg-core";

library.add(faArrowLeft);

const props = defineProps<{
  type: FeedType;
  post: Post | null;
}>();

const emit = defineEmits<{
  (e: 'backButtonClicked'): void
}>();

// On est d'accord que normalement le type de cette variable est Comment, mais pour des raisons de temps on va faire comme si c'était un Post
const selectedPublicFeedPostComments = ref<Post[]>([]);

const GET_POSTS_COMMENT_QUERY = gql`
query GetPostQuery($postId: Int!) {
  postComments(postId: $postId) {
    body
    id
    post {
      id
      content
      title
      author {
        email
        id
        username
      }
    }
    user {
      id
      username
      email
    }
  }
}
`;

function refreshPrivateComments() {
  const friendsCommentCol = document.getElementById('friendsCommentCol')!;
  const commentsContainer = friendsCommentCol.querySelector('.feed-cards')!;
  getCommentsForPostAndShow(selectedPublicFeedPostComments.value[0], commentsContainer);

  eventBus.emit('hasSubmittedComment', 'friends');
}

function refreshPublicComments() {
  const globalCommentCol = document.getElementById('globalCommentCol')!;
  const commentsContainer = globalCommentCol.querySelector('.feed-cards')!;
  getCommentsForPostAndShow(selectedPublicFeedPostComments.value[0], commentsContainer);

  eventBus.emit('hasSubmittedComment', 'global');
}

function getCommentsForPostAndShow(post: Post): void {
  client.query({
    query: GET_POSTS_COMMENT_QUERY,
    variables: {
      postId: post.id
    }
  }).then(result => {
    if (result.data.postComments) {
      let comments: Post[] = [];
      for (let comment of result.data.postComments) {
        let commentAuthor: User = {
          id: comment.user.id,
          username: comment.user.username,
          email: comment.user.email,
          profilePicture: defaultProfilePic,
        };

        let commentObject: Post = {
          id: comment.id,
          content: comment.body,
          author: commentAuthor,
          title: "Commentaire",
        }

        comments.push(commentObject);
      }

      selectedPublicFeedPostComments.value = comments;
    }
  });

}
</script>

<template>
  <div class="col-header">
    <div class="d-flex gap-2 text-white">
      <div>
        <button @click="emit('backButtonClicked')" class="btn btn-primary rounded-pill">
          <font-awesome-icon :icon="['fas', 'arrow-left']"/>
        </button>
      </div>
      <div>
        <h3>Commenter</h3>
        <p>Bien sûr, l'espace commentaire est un endroit calme et apaisé. 😉</p>
      </div>
    </div>

    <PostCard v-if="props.post" :id="props.post.id" :with-comments="true" @hasSubmittedComment="refreshPublicComments"
              avatar="/src/assets/images/square-logo-with-background.avif"
              :username="props.post.author.username" :title="props.post.title"
              :text="props.post.content"/>
  </div>

  <div class="feed-cards">
    <PostCard v-for="post in selectedPublicFeedPostComments" :key="post.id"
              :id="post.id" :avatar="post.author.profilePicture"
              :username="post.author.username" :title="post.title" :text="post.content"/>
  </div>
</template>

<style scoped>

</style>