<script setup lang="ts">
import defaultProfilePic from "~@/assets/images/square-logo-with-background.avif?url";
import {FeedType, Post, User} from "~@/types.ts";
import {gql} from "@apollo/client/core";
import client from "~@/apolloClient.ts";
import {onMounted, ref} from "vue";
import PostCard from "~@/components/components/PostCard.vue";
import eventBus from "~@/eventBus.ts";

const props = defineProps<{
  type: FeedType;
}>();

const emit = defineEmits<{
  (e: 'showComments', post: Post): void
}>();

const GET_POSTS_QUERY = gql`
query Posts {
  posts {
    author {
      id
      username
      email
    }
    content
    id
    title
  }
}
`;

const id = props.type + "Feed";
const posts = ref<Post[]>([]);

async function getPosts(): Promise<Post[]> {
  console.log("Ici ça trigger getPosts()");
  let posts: Post[] = [];
  const result = await client.query({
    query: GET_POSTS_QUERY,
    context: {
      queryDeduplication: false,
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
    },
    fetchPolicy: 'network-only'
  });

  if (result.data.posts) {
    for (let post of result.data.posts) {
      let postAuthor: User = {
        id: post.author.id,
        username: post.author.username,
        email: post.author.email,
        profilePicture: defaultProfilePic,
      };

      let postObject: Post = {
        id: post.id,
        content: post.content,
        title: post.title,
        author: postAuthor,
      }

      posts.push(postObject);
    }
  } else {
    console.error("No posts found. It is possible that no post is available in the database, but since this haven't been tested yet, it is actually considered as an error.");
  }

  console.log("On a trouvé " + posts.length + " posts !")

  return invertArray(posts);
}

function invertArray(array: any[]): any[] {
  let invertedArray: any[] = [];

  for (let i = array.length - 1; i >= 0; i--) {
    invertedArray.push(array[i]);
  }

  return invertedArray;
}

function emitShowComments(postId: number): void {
  const post = posts.value.find(post => post.id === postId)!;
  emit("showComments", post);
}

onMounted(async () => {
  posts.value = await getPosts();
});

eventBus.on('hasSubmittedPost', async (feedType: FeedType) => {
  console.log("On a reçu un post ! feedType: " + feedType + " props.type: " + props.type);
  if (feedType === props.type) {
    console.log("On va rafraîchir le feed !");
    posts.value = await getPosts();
  }
});
</script>

<template>
  <div class="feed-cards" :id="id">
    <PostCard v-for="post in posts" :key="post.id" @showComments="emitShowComments"
              :id="post.id" :avatar="post.author.profilePicture"
              :username="post.author.username" :title="post.title" :text="post.content"/>
  </div>
</template>

<style scoped>

</style>