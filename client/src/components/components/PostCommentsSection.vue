<script setup lang="ts">
import defaultProfilePic from "~@/assets/images/square-logo-with-background.avif?url";
import PostCard from "~@/components/components/PostCard.vue";
import {FeedType, Post, User} from "~@/types.ts";
import client from "~@/apolloClient.ts";
import {onMounted, ref, watch} from "vue";
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
const selectedPostComments = ref<Post[]>([]);

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

async function refreshComments(postId: number): Promise<void> {
  await getCommentsForPostAndShow(postId);
}

async function getCommentsForPostAndShow(postId: number): Promise<void> {
  console.log("getCommentsForPostAndShow");
  await client.query({
    query: GET_POSTS_COMMENT_QUERY,
    variables: {
      postId: postId
    },
    context: {
      queryDeduplication: false,
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
    },
    fetchPolicy: 'network-only'
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

      selectedPostComments.value = invertArray(comments);
    }
  });
}

function invertArray(array: any[]): any[] {
  let invertedArray: any[] = [];

  for (let i = array.length - 1; i >= 0; i--) {
    invertedArray.push(array[i]);
  }

  return invertedArray;
}

onMounted(() => {

});

watch(() => props.post, (newPost, oldPost) => {
  if (newPost) {
    getCommentsForPostAndShow(newPost.id);
  }
}, {immediate: true});
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

    <PostCard v-if="props.post" :id="props.post.id" @hasSubmittedComment="refreshComments"
              avatar="/src/assets/images/square-logo-with-background.avif"
              :username="props.post.author.username" :title="props.post.title"
              :text="props.post.content" footer-type="comment"/>
  </div>

  <div class="feed-cards">
    <PostCard v-for="post in selectedPostComments" :key="post.id" footer-type="none"
              :id="post.id" :avatar="post.author.profilePicture"
              :username="post.author.username" :title="post.title" :text="post.content"/>
  </div>
</template>

<style scoped>

</style>