<script setup lang="ts">
import defaultProfilePic from "~@/assets/images/square-logo-with-background.avif?url";
import {FeedType, Post, User} from "~@/types.ts";
import {gql} from "@apollo/client/core";
import client from "~@/apolloClient.ts";
import {onMounted, ref} from "vue";
import PostCard from "~@/components/components/PostCard.vue";

const props = defineProps<{
  type: FeedType;
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
  let posts: Post[] = [];
  const result = await client.query({
    query: GET_POSTS_QUERY,
    context: {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    }
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

  return posts;
}

onMounted(async () => {
  posts.value = await getPosts();
});

</script>

<template>
  <div class="feed-cards" :id="id">
    <PostCard v-for="post in posts" :key="post.id"
              :id="post.id" :avatar="post.author.profilePicture"
              :username="post.author.username" :title="post.title" :text="post.content"/>
  </div>
</template>

<style scoped>

</style>